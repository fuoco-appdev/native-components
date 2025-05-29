/* eslint-disable react/react-in-jsx-scope */
import {
  GestureResponderEvent,
  ImageStyle,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import Button, { ButtonStyles } from '../Button/Button';
import Input, { ExtraInputStyles, InputStyles } from '../Input/Input';
import { AuthStrings, defaultStrings } from './Auth';
import { AuthError, SupabaseClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { Key } from '../Icon/Icons/Line';
import MarginsPaddings from '../Themes/margins_paddings';

export interface ResetPasswordStyles {
  buttonContainer?: ViewStyle | TextStyle | ImageStyle;
  buttonContent?: ViewStyle | TextStyle | ImageStyle;
  buttonIcon?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraResetPasswordStyles {
  extraInput?: ExtraInputStyles;
  input?: InputStyles;
  button?: ButtonStyles;
}

export interface ResetPasswordProps {
  customStyles?: ResetPasswordStyles;
  customDarkStyles?: ResetPasswordStyles;
  customLightStyles?: ResetPasswordStyles;
  customExtraStyles?: ExtraResetPasswordStyles;
  customExtraDarkStyles?: ExtraResetPasswordStyles;
  customExtraLightStyles?: ExtraResetPasswordStyles;
  supabaseClient: SupabaseClient;
  strings?: AuthStrings;
  loadingComponent?: JSX.Element;
  passwordErrorMessage?: string;
  confirmPasswordErrorMessage?: string;
  onResetPasswordError?: (error: AuthError) => void;
  onPasswordUpdated?: (e: GestureResponderEvent) => void;
}

const styles = StyleSheet.create<ResetPasswordStyles>({});
const lightStyles = StyleSheet.create<ResetPasswordStyles>({});
const darkStyles = StyleSheet.create<ResetPasswordStyles>({});

export default function ResetPassword({
  customStyles,
  customDarkStyles,
  customLightStyles,
  customExtraStyles,
  customExtraDarkStyles,
  customExtraLightStyles,
  strings,
  loadingComponent,
  supabaseClient,
  passwordErrorMessage,
  confirmPasswordErrorMessage,
  onResetPasswordError,
  onPasswordUpdated,
}: ResetPasswordProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordResetAsync = async (e: any) => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      onResetPasswordError?.(
        new AuthError('Confirm password does not match', 401)
      );
      return;
    }

    const { error } = await supabaseClient.auth.updateUser({
      password,
    });
    setIsLoading(false);
    setPassword('');
    setConfirmPassword('');
    if (error) onResetPasswordError?.(error);
    else onPasswordUpdated?.(e);
  };

  strings = { ...defaultStrings, ...strings };

  return (
    <View>
      <View
        style={[
          {
            ...styles.buttonContainer,
            ...(customStyles?.buttonContainer ?? {}),
          },
          ...(isDarkTheme
            ? [
                {
                  ...darkStyles?.buttonContainer,
                  ...(customDarkStyles?.buttonContainer ?? {}),
                },
              ]
            : [
                {
                  ...lightStyles?.buttonContainer,
                  ...(customLightStyles?.buttonContainer ?? {}),
                },
              ]),
        ]}
      >
        <Input
          value={password}
          customStyles={customExtraStyles?.input}
          customDarkStyles={customExtraDarkStyles?.input}
          customLightStyles={customExtraLightStyles?.input}
          customExtraStyles={customExtraStyles?.extraInput}
          customExtraLightStyles={customExtraLightStyles?.extraInput}
          customExtraDarkStyles={customExtraDarkStyles?.extraInput}
          label={strings.newPassword}
          placeholder={strings.enterYourNewPassword}
          reveal={true}
          password={true}
          error={passwordErrorMessage}
          icon={<Key size={21} color={isDarkTheme ? '#fff' : '#000'} />}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
        <Input
          value={confirmPassword}
          customStyles={customExtraStyles?.input}
          customDarkStyles={customExtraDarkStyles?.input}
          customLightStyles={customExtraLightStyles?.input}
          customExtraStyles={customExtraStyles?.extraInput}
          customExtraLightStyles={customExtraLightStyles?.extraInput}
          customExtraDarkStyles={customExtraDarkStyles?.extraInput}
          label={strings.confirmNewPassword}
          placeholder={strings.confirmNewPasswordPlaceholder}
          reveal={true}
          password={true}
          error={passwordErrorMessage}
          icon={<Key size={21} color={isDarkTheme ? '#fff' : '#000'} />}
          onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
        />
        <Button
          customStyles={{
            root: {
              paddingTop: MarginsPaddings.mp_6,
              paddingBottom: MarginsPaddings.mp_6,
            },
            ...customExtraStyles?.button,
          }}
          customDarkStyles={customExtraDarkStyles?.button}
          customLightStyles={customExtraLightStyles?.button}
          loading={isLoading}
          loadingComponent={loadingComponent}
          block
          size={'full'}
          icon={<Key size={21} color={'#fff'} />}
          onPress={handlePasswordResetAsync}
        >
          {strings.resetPassword}
        </Button>
      </View>
    </View>
  );
}
