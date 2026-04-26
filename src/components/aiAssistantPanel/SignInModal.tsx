import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Link,
  MessageBar,
  MessageBarType,
  Panel,
  PanelType,
  PrimaryButton,
  Spinner,
  Stack,
  Text,
  TextField,
} from '@fluentui/react';
import { useDispatch } from 'react-redux';
import { logout, setAuthState, setAuthLoading, setAuthError } from '../../store/ai-assistant-auth/actions';
import { clearApiKey, saveApiKey } from '../../services/storage/chromeStorageService';

interface SignInModalProps {
  isOpen?: boolean;
  error?: string | null;
  loading?: boolean;
  isSignedIn?: boolean;
  currentApiKey?: string | null;
  onClose?: () => void;
}

const PORTAL_BASE_URL =
  (process.env.REACT_APP_AI_BACKEND_URL || 'http://localhost:5221').replace(/\/+$/, '');

const SignInModal: React.FC<SignInModalProps> = ({
  isOpen = true,
  error,
  loading,
  isSignedIn,
  currentApiKey,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    setApiKey(currentApiKey || '');
  }, [currentApiKey, isSignedIn]);

  const handleSaveKey = async () => {
    const trimmedApiKey = apiKey.trim();
    if (!trimmedApiKey) {
      dispatch(setAuthError('Please enter an API key'));
      return;
    }

    dispatch(setAuthError(null));
    dispatch(setAuthLoading(true));

    try {
      await saveApiKey(trimmedApiKey);
      dispatch(
        setAuthState({
          isAuthenticated: true,
          apiKey: trimmedApiKey,
          user: null,
        })
      );
      onClose?.();
    } catch (err) {
      dispatch(setAuthError(err instanceof Error ? err.message : 'Failed to save API key'));
    }
  };

  const handleRemoveKey = async () => {
    dispatch(setAuthError(null));
    dispatch(setAuthLoading(true));

    try {
      await clearApiKey();
      dispatch(logout());
      setApiKey('');
    } catch (err) {
      dispatch(setAuthError(err instanceof Error ? err.message : 'Failed to remove API key'));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveKey();
    }
  };

  return (
    <Panel
      isOpen={isOpen}
      type={PanelType.smallFixedFar}
      headerText="AI access"
      isLightDismiss={!!onClose}
      onDismiss={onClose}
      closeButtonAriaLabel="Close"
      layerProps={{ styles: { root: { zIndex: 200000 } } }}
    >
      {error && (
        <MessageBar
          messageBarType={MessageBarType.error}
          onDismiss={() => dispatch(setAuthError(null))}
          styles={{ root: { marginBottom: 12 } }}
        >
          {error}
        </MessageBar>
      )}

      {loading ? (
        <Spinner label={isSignedIn ? 'Updating...' : 'Saving API key...'} />
      ) : (
        <Stack tokens={{ childrenGap: 16 }}>
          <Stack tokens={{ childrenGap: 8 }}>
            <Text variant="small">
              The AI assistant uses an API key tied to your account. Update or remove
              it any time.
            </Text>
            <Text variant="small" as="ol" block style={{ margin: 0, paddingLeft: 20 }}>
              <li>
                Open{' '}
                <Link href={PORTAL_BASE_URL} target="_blank" rel="noopener noreferrer">
                  the account website
                </Link>{' '}
                and sign in with GitHub.
              </li>
              <li>Choose a plan and generate an API key.</li>
              <li>Paste the key below and click Save.</li>
            </Text>
          </Stack>

          <TextField
            label="API Key"
            type="password"
            value={apiKey}
            onChange={(_e, newValue) => setApiKey(newValue || '')}
            onKeyDown={handleKeyPress}
            placeholder="Paste API key"
            onRenderSuffix={
              isSignedIn
                ? () => (
                    <IconButton
                      iconProps={{ iconName: 'Delete' }}
                      title="Delete saved API key"
                      ariaLabel="Delete saved API key"
                      onClick={handleRemoveKey}
                      styles={{ root: { height: 24, width: 24 } }}
                    />
                  )
                : undefined
            }
          />

          <Stack horizontal tokens={{ childrenGap: 8 }} wrap>
            <PrimaryButton
              text={isSignedIn ? 'Update Key' : 'Save Key'}
              onClick={handleSaveKey}
            />
          </Stack>
        </Stack>
      )}
    </Panel>
  );
};

export default SignInModal;
