import { describe, it, expect, beforeEach } from 'vitest';
import { StorageManager } from '../js/storage.js';

class MockStorage {
  constructor(shouldThrow = false) {
    this.store = {};
    this.shouldThrow = shouldThrow;
  }

  getItem(key) {
    if (this.shouldThrow) throw new Error('QuotaExceededError');
    return this.store[key] !== undefined ? this.store[key] : null;
  }

  setItem(key, value) {
    if (this.shouldThrow) throw new Error('QuotaExceededError');
    this.store[key] = String(value);
  }

  removeItem(key) {
    if (this.shouldThrow) throw new Error('QuotaExceededError');
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}

describe('StorageManager', () => {
  let mockStorage;
  let manager;

  beforeEach(() => {
    mockStorage = new MockStorage();
    manager = new StorageManager(mockStorage);
  });

  it('saves and retrieves preferences merged with defaults', () => {
    manager.savePreferences({ durationMinutes: 60, difficulty: 'Advanced' });
    const prefs = manager.getPreferences();

    expect(prefs.durationMinutes).toBe(60);
    expect(prefs.difficulty).toBe('Advanced');
    expect(prefs.unit).toBe('lbs'); // Preserved default
  });

  it('handles corrupted JSON entries gracefully without crashing', () => {
    // Inject corrupt JSON into storage
    mockStorage.setItem('jdfit.preferences.v1', '{invalid-json,,,');

    const prefs = manager.getPreferences();
    expect(prefs).toBeDefined();
    expect(prefs.durationMinutes).toBe(45); // Safely defaulted
  });

  it('operates via in-memory fallback when localStorage throws exceptions (privacy mode / quota)', () => {
    const brokenStorage = new MockStorage(true); // Throws on setItem
    const fallbackManager = new StorageManager(brokenStorage);

    // Initial check should flag storage as unavailable
    expect(fallbackManager.storageAvailable).toBe(false);

    // In-memory operations should still succeed
    fallbackManager.savePreferences({ durationMinutes: 30 });
    const prefs = fallbackManager.getPreferences();
    expect(prefs.durationMinutes).toBe(30);
  });

  it('clears all data and active routine upon request', () => {
    manager.savePreferences({ durationMinutes: 30 });
    manager.saveActiveRoutine({ id: 'test-123' });

    expect(manager.getActiveRoutine()).toEqual({ id: 'test-123' });

    manager.clearAllData();

    expect(manager.getActiveRoutine()).toBeNull();
    expect(manager.getPreferences().durationMinutes).toBe(45); // Restored default
  });
});
