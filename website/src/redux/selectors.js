import { createSelector } from '@reduxjs/toolkit';

// Auth Selectors
export const selectAuthState = (state) => state.auth;
export const selectCurrentUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);
export const selectAuthTokens = createSelector(
  [selectAuthState],
  (auth) => auth.tokens
);
export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);
export const selectAuthStatus = createSelector(
  [selectAuthState],
  (auth) => auth.status
);
export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

// Property Selectors
export const selectPropertyState = (state) => state.properties;
export const selectAllProperties = createSelector(
  [selectPropertyState],
  (properties) => properties.items
);
export const selectSelectedProperty = createSelector(
  [selectPropertyState],
  (properties) => properties.selectedProperty
);
export const selectPropertyStatus = createSelector(
  [selectPropertyState],
  (properties) => properties.status
);
export const selectPropertyError = createSelector(
  [selectPropertyState],
  (properties) => properties.error
);
export const selectFilteredProperties = createSelector(
  [selectAllProperties, (_, filters) => filters],
  (properties, filters) => properties.filter(property => 
    Object.entries(filters).every(([key, value]) => 
      property[key] === value
    )
  )
);

// Admin Selectors
export const selectAdminState = (state) => state.admin;
export const selectAdminStats = createSelector(
  [selectAdminState],
  (admin) => admin.stats
);
export const selectAllUsers = createSelector(
  [selectAdminState],
  (admin) => admin.users
);
export const selectAdminActions = createSelector(
  [selectAdminState],
  (admin) => admin.actions
);
export const selectActiveUsers = createSelector(
  [selectAllUsers],
  (users) => users.filter(user => user.is_active)
);

// User Selectors
export const selectUserState = (state) => state.user;
export const selectUserProfile = createSelector(
  [selectUserState],
  (user) => user.profile
);
export const selectUserDashboard = createSelector(
  [selectUserState],
  (user) => user.dashboard
);
export const selectUserAlerts = createSelector(
  [selectUserDashboard],
  (dashboard) => dashboard.alerts || []
);

// Recommendation Selectors
export const selectRecommendationState = (state) => state.recommendations;
export const selectAllRecommendations = createSelector(
  [selectRecommendationState],
  (recommendations) => recommendations.items
);
export const selectFeaturedRecommendations = createSelector(
  [selectAllRecommendations],
  (recommendations) => recommendations.slice(0, 3)
);

// Combined Selectors
export const selectPropertyDetails = createSelector(
  [selectSelectedProperty, selectAllRecommendations],
  (property, recommendations) => ({
    property,
    similarProperties: recommendations.filter(p => 
      p.property_type === property?.property_type &&
      p.id !== property?.id
    )
  })
);

export const selectDashboardData = createSelector(
  [selectUserDashboard, selectAllProperties],
  (dashboard, properties) => ({
    ...dashboard,
    recentProperties: properties.slice(-3)
  })
);

// For complex filtered selections
export const selectExpensiveProperties = createSelector(
    [selectAllProperties],
    (properties) => properties.filter(p => p.price > 1000000)
  );
  
  export const selectPropertiesByType = createSelector(
    [selectAllProperties, (_, type) => type],
    (properties, type) => properties.filter(p => p.property_type === type)
  );