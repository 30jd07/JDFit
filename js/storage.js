/**
 * JDFit Storage Module
 * Fault-tolerant, versioned and namespaced persistence with memory fallback.
 */

const STORAGE_KEYS = {
  PREFERENCES_V1: 'jdfit.preferences.v1',
  ACTIVE_ROUTINE_V1: 'jdfit.activeRoutine.v1'
};

const DEFAULT_PREFERENCES = {
  durationMinutes: 45,
  trainingMode: 'strength',
  difficulty: 'Intermediate',
  selectedMuscles: [],
  selectedEquipment: ['Bodyweight', 'Dumbbell', 'Barbell', 'Cable', 'Machine'],
  unit: 'lbs'
};

export class StorageManager {
  constructor(storageBackend = typeof window !== 'undefined' ? window.localStorage : null) {
    this.storage = storageBackend;
    this.memoryCache = new Map();
    this.storageAvailable = this._testStorage();
  }

  /**
   * Tests whether the storage backend is truly writeable (guards against Safari Private Browsing & QuotaExceeded)
   * @private
   */
  _testStorage() {
    if (!this.storage) return false;
    try {
      const testKey = '__jdfit_storage_probe__';
      this.storage.setItem(testKey, '1');
      this.storage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Safe getter with JSON deserialization and corruption recovery.
   * @param {string} key
   * @param {*} defaultValue
   * @returns {*}
   */
  getItem(key, defaultValue = null) {
    if (!this.storageAvailable) {
      return this.memoryCache.has(key) ? this.memoryCache.get(key) : defaultValue;
    }

    try {
      const raw = this.storage.getItem(key);
      if (raw === null || raw === undefined) {
        return defaultValue;
      }
      return JSON.parse(raw);
    } catch (err) {
      console.warn(`[JDFit Storage] Corrupted entry for "${key}", reverting to default.`, err);
      // Auto-heal corrupted key
      this.removeItem(key);
      return defaultValue;
    }
  }

  /**
   * Safe setter with quota protection and memory fallback.
   * @param {string} key
   * @param {*} value
   * @returns {boolean} Success status
   */
  setItem(key, value) {
    // Keep memory cache warm as fallback
    this.memoryCache.set(key, value);

    if (!this.storageAvailable) {
      return true;
    }

    try {
      const serialized = JSON.stringify(value);
      this.storage.setItem(key, serialized);
      return true;
    } catch (err) {
      console.warn(`[JDFit Storage] Failed to write "${key}" to localStorage (quota or privacy mode). Using memory fallback.`, err);
      return false;
    }
  }

  /**
   * Safe removal of a specific key.
   * @param {string} key
   */
  removeItem(key) {
    this.memoryCache.delete(key);
    if (this.storageAvailable) {
      try {
        this.storage.removeItem(key);
      } catch (err) {
        console.warn(`[JDFit Storage] Failed to remove "${key}".`, err);
      }
    }
  }

  /**
   * Retrieves stored user preferences merged with safe defaults.
   * @returns {typeof DEFAULT_PREFERENCES}
   */
  getPreferences() {
    const stored = this.getItem(STORAGE_KEYS.PREFERENCES_V1, {});
    return { ...DEFAULT_PREFERENCES, ...stored };
  }

  /**
   * Persists non-sensitive user preferences.
   * @param {Partial<typeof DEFAULT_PREFERENCES>} prefs
   * @returns {boolean}
   */
  savePreferences(prefs) {
    const current = this.getPreferences();
    const updated = { ...current, ...prefs };
    return this.setItem(STORAGE_KEYS.PREFERENCES_V1, updated);
  }

  /**
   * Retrieves the currently active workout routine, if any.
   * @returns {object|null}
   */
  getActiveRoutine() {
    return this.getItem(STORAGE_KEYS.ACTIVE_ROUTINE_V1, null);
  }

  /**
   * Saves the active routine state for mid-session recovery.
   * @param {object} routine
   * @returns {boolean}
   */
  saveActiveRoutine(routine) {
    return this.setItem(STORAGE_KEYS.ACTIVE_ROUTINE_V1, routine);
  }

  /**
   * Clears the active workout routine.
   */
  clearActiveRoutine() {
    this.removeItem(STORAGE_KEYS.ACTIVE_ROUTINE_V1);
  }

  /**
   * Resets all app data and restores factory defaults.
   * @returns {boolean}
   */
  clearAllData() {
    this.memoryCache.clear();
    Object.values(STORAGE_KEYS).forEach(key => this.removeItem(key));
    return true;
  }
}

// Global default singleton instance
export const storageManager = new StorageManager();
