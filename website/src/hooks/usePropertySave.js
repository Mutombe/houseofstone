import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSaveProperty, selectIsPropertySaved } from '../redux/slices/localSavesSlice';
import api from '../utils/api';

/**
 * Hook to manage property saves
 * Works for both authenticated users (server sync) and unauthenticated (localStorage)
 */
const usePropertySave = (property) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Check local saves for unauthenticated users
  const isLocalSaved = useSelector(selectIsPropertySaved(property?.id));

  // For authenticated users, we would check server-side favorites
  // For now, we use a combination approach
  const isSaved = useMemo(() => {
    if (!property) return false;
    // If authenticated, could check server state here
    // For now, use local saves for both cases for consistency
    return isLocalSaved;
  }, [property, isLocalSaved]);

  const toggleSave = useCallback(async () => {
    if (!property) return;

    if (isAuthenticated) {
      // For authenticated users, sync with server
      try {
        if (isSaved) {
          // Remove from favorites
          await api.delete(`/favorites/${property.id}/`);
        } else {
          // Add to favorites
          await api.post('/favorites/', { property: property.id });
        }
      } catch (error) {
        console.error('Failed to sync favorite:', error);
      }
    }

    // Always update local state for immediate feedback
    dispatch(toggleSaveProperty(property));
  }, [property, isAuthenticated, isSaved, dispatch]);

  return {
    isSaved,
    toggleSave,
    isAuthenticated,
  };
};

/**
 * Hook to get all saved properties
 */
export const useSavedProperties = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const localSaved = useSelector((state) => state.localSaves.savedProperties);

  // Return local saves for now
  // Could be enhanced to fetch from server for authenticated users
  return {
    savedProperties: localSaved,
    count: localSaved.length,
    isAuthenticated,
  };
};

/**
 * Hook to get recently viewed properties
 */
export const useRecentlyViewed = () => {
  const recentlyViewed = useSelector((state) => state.localSaves.recentlyViewed);

  return {
    recentlyViewed,
    count: recentlyViewed.length,
  };
};

export default usePropertySave;
