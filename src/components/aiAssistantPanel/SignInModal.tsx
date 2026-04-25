import React, { useState } from 'react';
import { DefaultButton, PrimaryButton, TextField, MessageBar, MessageBarType, Spinner } from '@fluentui/react';
import { useDispatch } from 'react-redux';
import { setAuthState, setAuthLoading, setAuthError } from '../../store/ai-assistant-auth/actions';
import { saveApiKey } from '../../services/storage/chromeStorageService';
import './SignInModal.css';

interface SignInModalProps {
  error?: string | null;
  loading?: boolean;
  onSignOut?: () => void;
  isSignedIn?: boolean;
}

const SignInModal: React.FC<SignInModalProps> = ({ error, loading, onSignOut, isSignedIn }) => {
  const dispatch = useDispatch();
  const [apiKey, setApiKey] = useState('');

  const handleSignIn = async () => {
    if (!apiKey.trim()) {
      dispatch(setAuthError('Please enter an API key'));
      return;
    }

    dispatch(setAuthLoading(true));

    try {
      // Save key to Chrome storage
      await saveApiKey(apiKey);

      // Dispatch auth state
      dispatch(
        setAuthState({
          isAuthenticated: true,
          apiKey: apiKey,
          user: null, // User info can be fetched later if needed
        })
      );
    } catch (err) {
      dispatch(setAuthError(err instanceof Error ? err.message : 'Failed to save API key'));
    }
  };

  const handleSignOut = async () => {
    dispatch(setAuthError(null));
    dispatch(setAuthLoading(false));
    if (onSignOut) {
      onSignOut();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  return (
    <div className="signin-modal-overlay">
      <div className="signin-modal-content">
        <h3 className="signin-modal-title">Sign In to AI Assistant</h3>

        {error && (
          <MessageBar messageBarType={MessageBarType.error} onDismiss={() => dispatch(setAuthError(null))}>
            {error}
          </MessageBar>
        )}

        {loading ? (
          <div className="signin-loading">
            <Spinner label="Signing in..." />
          </div>
        ) : (
          <>
            <TextField
              label="API Key"
              type="password"
              value={apiKey}
              onChange={(e, newValue) => setApiKey(newValue || '')}
              onKeyPress={handleKeyPress}
              placeholder="Enter your API key"
              styles={{ root: { marginBottom: 16 } }}
            />

            <div className="signin-button-group">
              <PrimaryButton
                text="Sign In"
                onClick={handleSignIn}
                disabled={!apiKey.trim()}
                styles={{ root: { marginRight: 8 } }}
              />
              {isSignedIn && (
                <DefaultButton text="Sign Out" onClick={handleSignOut} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignInModal;
