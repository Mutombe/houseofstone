// website/src/hooks/useApiAction.js
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { showSuccess, showError, getUserFriendlyMessage } from '../redux/slices/toastSlice';

/**
 * Custom hook for executing API actions with automatic toast feedback
 *
 * @example
 * const { execute, loading } = useApiAction();
 *
 * const handleDelete = async (id) => {
 *   const success = await execute(
 *     deleteProperty(id),
 *     'Property deleted successfully',
 *     'Delete Property'
 *   );
 *   if (success) {
 *     // Handle success
 *   }
 * };
 */
export const useApiAction = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (action, successMessage, operationName = 'Operation') => {
      setLoading(true);
      try {
        const result = await dispatch(action).unwrap();

        if (successMessage) {
          dispatch(showSuccess(successMessage, operationName));
        }

        setLoading(false);
        return { success: true, data: result };
      } catch (error) {
        const friendlyMessage = getUserFriendlyMessage(error);
        dispatch(showError(friendlyMessage, `${operationName} Failed`));
        setLoading(false);
        return { success: false, error: friendlyMessage };
      }
    },
    [dispatch]
  );

  return { execute, loading };
};

/**
 * Pre-configured action messages for common operations
 */
export const actionMessages = {
  property: {
    create: { success: 'Property created successfully!', name: 'Create Property' },
    update: { success: 'Property updated successfully!', name: 'Update Property' },
    delete: { success: 'Property deleted successfully!', name: 'Delete Property' },
    publish: { success: 'Property published successfully!', name: 'Publish Property' },
    unpublish: { success: 'Property unpublished successfully!', name: 'Unpublish Property' },
  },
  lead: {
    create: { success: 'Lead created successfully!', name: 'Create Lead' },
    update: { success: 'Lead updated successfully!', name: 'Update Lead' },
    delete: { success: 'Lead deleted successfully!', name: 'Delete Lead' },
    convert: { success: 'Lead marked as converted!', name: 'Convert Lead' },
  },
  agent: {
    create: { success: 'Agent created successfully!', name: 'Create Agent' },
    update: { success: 'Agent updated successfully!', name: 'Update Agent' },
    delete: { success: 'Agent deleted successfully!', name: 'Delete Agent' },
    activate: { success: 'Agent activated successfully!', name: 'Activate Agent' },
    deactivate: { success: 'Agent deactivated successfully!', name: 'Deactivate Agent' },
  },
  user: {
    create: { success: 'User created successfully!', name: 'Create User' },
    update: { success: 'User updated successfully!', name: 'Update User' },
    delete: { success: 'User deleted successfully!', name: 'Delete User' },
  },
  auth: {
    login: { success: 'Welcome back!', name: 'Login' },
    register: { success: 'Account created successfully!', name: 'Register' },
    logout: { success: 'Logged out successfully', name: 'Logout' },
    passwordReset: { success: 'Password reset email sent!', name: 'Reset Password' },
  },
  inquiry: {
    submit: { success: 'Your inquiry has been sent!', name: 'Send Inquiry' },
  },
  share: {
    create: { success: 'Share link created!', name: 'Share Property' },
    copy: { success: 'Link copied to clipboard!', name: 'Copy Link' },
  },
  favorite: {
    add: { success: 'Added to saved properties!', name: 'Save Property' },
    remove: { success: 'Removed from saved properties', name: 'Remove Property' },
  },
};

/**
 * Hook specifically for property operations
 */
export const usePropertyActions = () => {
  const { execute, loading } = useApiAction();

  return {
    loading,
    createProperty: (action) =>
      execute(action, actionMessages.property.create.success, actionMessages.property.create.name),
    updateProperty: (action) =>
      execute(action, actionMessages.property.update.success, actionMessages.property.update.name),
    deleteProperty: (action) =>
      execute(action, actionMessages.property.delete.success, actionMessages.property.delete.name),
    publishProperty: (action) =>
      execute(action, actionMessages.property.publish.success, actionMessages.property.publish.name),
    unpublishProperty: (action) =>
      execute(action, actionMessages.property.unpublish.success, actionMessages.property.unpublish.name),
  };
};

/**
 * Hook specifically for lead operations
 */
export const useLeadActions = () => {
  const { execute, loading } = useApiAction();

  return {
    loading,
    createLead: (action) =>
      execute(action, actionMessages.lead.create.success, actionMessages.lead.create.name),
    updateLead: (action) =>
      execute(action, actionMessages.lead.update.success, actionMessages.lead.update.name),
    deleteLead: (action) =>
      execute(action, actionMessages.lead.delete.success, actionMessages.lead.delete.name),
  };
};

/**
 * Hook specifically for agent operations
 */
export const useAgentActions = () => {
  const { execute, loading } = useApiAction();

  return {
    loading,
    createAgent: (action) =>
      execute(action, actionMessages.agent.create.success, actionMessages.agent.create.name),
    updateAgent: (action) =>
      execute(action, actionMessages.agent.update.success, actionMessages.agent.update.name),
    deleteAgent: (action) =>
      execute(action, actionMessages.agent.delete.success, actionMessages.agent.delete.name),
  };
};

export default useApiAction;
