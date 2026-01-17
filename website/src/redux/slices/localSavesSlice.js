import { createSlice } from '@reduxjs/toolkit';

/**
 * Local Saves Slice
 * Manages property saves for unauthenticated users via localStorage
 * Syncs with server when user logs in
 */

const STORAGE_KEYS = {
  SAVED_PROPERTIES: 'hsp_saved_properties',
  RECENTLY_VIEWED: 'hsp_recently_viewed',
};

// Load initial state from localStorage
const loadFromStorage = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Save to localStorage
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const localSavesSlice = createSlice({
  name: 'localSaves',
  initialState: {
    savedProperties: loadFromStorage(STORAGE_KEYS.SAVED_PROPERTIES),
    recentlyViewed: loadFromStorage(STORAGE_KEYS.RECENTLY_VIEWED),
  },
  reducers: {
    /**
     * Save a property to local storage
     */
    saveProperty: (state, action) => {
      const property = action.payload;

      // Check if already saved
      const existingIndex = state.savedProperties.findIndex(p => p.id === property.id);
      if (existingIndex !== -1) {
        return; // Already saved
      }

      // Add minimal property data
      const savedProperty = {
        id: property.id,
        title: property.title,
        price: property.price,
        location: property.location,
        beds: property.beds,
        baths: property.baths,
        sqft: property.sqft,
        status: property.status,
        property_type: property.property_type,
        primaryImage: property.images?.[0]?.image || null,
        savedAt: new Date().toISOString(),
      };

      state.savedProperties.unshift(savedProperty);

      // Limit to 50 saved properties
      if (state.savedProperties.length > 50) {
        state.savedProperties = state.savedProperties.slice(0, 50);
      }

      saveToStorage(STORAGE_KEYS.SAVED_PROPERTIES, state.savedProperties);
    },

    /**
     * Remove a property from local saves
     */
    unsaveProperty: (state, action) => {
      const propertyId = action.payload;
      state.savedProperties = state.savedProperties.filter(p => p.id !== propertyId);
      saveToStorage(STORAGE_KEYS.SAVED_PROPERTIES, state.savedProperties);
    },

    /**
     * Toggle save status
     */
    toggleSaveProperty: (state, action) => {
      const property = action.payload;
      const existingIndex = state.savedProperties.findIndex(p => p.id === property.id);

      if (existingIndex !== -1) {
        // Remove if already saved
        state.savedProperties = state.savedProperties.filter(p => p.id !== property.id);
      } else {
        // Add if not saved
        const savedProperty = {
          id: property.id,
          title: property.title,
          price: property.price,
          location: property.location,
          beds: property.beds,
          baths: property.baths,
          sqft: property.sqft,
          status: property.status,
          property_type: property.property_type,
          primaryImage: property.images?.[0]?.image || null,
          savedAt: new Date().toISOString(),
        };
        state.savedProperties.unshift(savedProperty);
      }

      saveToStorage(STORAGE_KEYS.SAVED_PROPERTIES, state.savedProperties);
    },

    /**
     * Add property to recently viewed
     */
    addRecentlyViewed: (state, action) => {
      const property = action.payload;

      // Remove if already exists (to move to front)
      state.recentlyViewed = state.recentlyViewed.filter(p => p.id !== property.id);

      // Add minimal property data
      const viewedProperty = {
        id: property.id,
        title: property.title,
        price: property.price,
        location: property.location,
        beds: property.beds,
        baths: property.baths,
        primaryImage: property.images?.[0]?.image || null,
        viewedAt: new Date().toISOString(),
      };

      state.recentlyViewed.unshift(viewedProperty);

      // Limit to 20 recently viewed
      if (state.recentlyViewed.length > 20) {
        state.recentlyViewed = state.recentlyViewed.slice(0, 20);
      }

      saveToStorage(STORAGE_KEYS.RECENTLY_VIEWED, state.recentlyViewed);
    },

    /**
     * Clear recently viewed
     */
    clearRecentlyViewed: (state) => {
      state.recentlyViewed = [];
      saveToStorage(STORAGE_KEYS.RECENTLY_VIEWED, []);
    },

    /**
     * Clear saved properties only
     */
    clearSavedProperties: (state) => {
      state.savedProperties = [];
      saveToStorage(STORAGE_KEYS.SAVED_PROPERTIES, []);
    },

    /**
     * Merge local saves to authenticated user account
     * Call this after successful login
     */
    mergeSavesToAccount: (state) => {
      // This should trigger an API call to sync saves
      // After syncing, clear local storage
      state.savedProperties = [];
      localStorage.removeItem(STORAGE_KEYS.SAVED_PROPERTIES);
    },

    /**
     * Clear all local saves (on logout or request)
     */
    clearAllLocalSaves: (state) => {
      state.savedProperties = [];
      state.recentlyViewed = [];
      localStorage.removeItem(STORAGE_KEYS.SAVED_PROPERTIES);
      localStorage.removeItem(STORAGE_KEYS.RECENTLY_VIEWED);
    },

    /**
     * Reload from localStorage (useful after storage changes)
     */
    reloadFromStorage: (state) => {
      state.savedProperties = loadFromStorage(STORAGE_KEYS.SAVED_PROPERTIES);
      state.recentlyViewed = loadFromStorage(STORAGE_KEYS.RECENTLY_VIEWED);
    },
  },
});

// Actions
export const {
  saveProperty,
  unsaveProperty,
  toggleSaveProperty,
  addRecentlyViewed,
  clearRecentlyViewed,
  clearSavedProperties,
  mergeSavesToAccount,
  clearAllLocalSaves,
  reloadFromStorage,
} = localSavesSlice.actions;

// Selectors
export const selectSavedProperties = (state) => state.localSaves.savedProperties;
export const selectRecentlyViewed = (state) => state.localSaves.recentlyViewed;
export const selectIsPropertySaved = (propertyId) => (state) =>
  state.localSaves.savedProperties.some(p => p.id === propertyId);
export const selectSavedCount = (state) => state.localSaves.savedProperties.length;
export const selectRecentlyViewedCount = (state) => state.localSaves.recentlyViewed.length;

export default localSavesSlice.reducer;
