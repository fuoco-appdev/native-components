import {
  ImageStyle,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import Button, { ButtonStyles } from '../Button/Button';
import Input, { ExtraInputStyles, InputStyles } from '../Input/Input';
import { AuthStrings, RedirectTo } from './Auth';
import { AuthError, SupabaseClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { Email, Inbox } from '../Icon/Icons/Line';
import MarginsPaddings from '../Themes/margins_paddings';

export interface ForgottenPasswordStyles {
  buttonContainer?: ViewStyle | TextStyle | ImageStyle;
  buttonContent?: ViewStyle | TextStyle | ImageStyle;
  buttonIcon?: ViewStyle | TextStyle | ImageStyle;
  link?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraForgottenPasswordStyles {
  extraInput?: ExtraInputStyles;
  input?: InputStyles;
  button?: ButtonStyles;
}

export interface ForgottenPasswordPlaceholders {
  email?: string;
}

export interface ForgottenPasswordIcons {
  input?: React.ReactNode;
  button?: React.ReactNode;
}

export interface ForgottenPasswordProps {
  email?: string;
  customStyles?: ForgottenPasswordStyles;
  customDarkStyles?: ForgottenPasswordStyles;
  customLightStyles?: ForgottenPasswordStyles;
  extraCustomStyles?: ExtraForgottenPasswordStyles;
  extraCustomDarkStyles?: ExtraForgottenPasswordStyles;
  extraCustomLightStyles?: ExtraForgottenPasswordStyles;
  placeholders?: ForgottenPasswordPlaceholders;
  loadingComponent?: React.ReactNode;
  icons?: ForgottenPasswordIcons;
  strings: AuthStrings;
  supabaseClient: SupabaseClient;
  redirectTo?: RedirectTo;
  emailErrorMessage?: string;
  onEmailChanged?: (email: string) => void;
  onSigninRedirect?: () => void;
  onResetPasswordError?: (error: AuthError) => void;
  onResetPasswordSent?: () => void;
}

const styles = StyleSheet.create<ForgottenPasswordStyles>({});
const lightStyles = StyleSheet.create<ForgottenPasswordStyles>({});
const darkStyles = StyleSheet.create<ForgottenPasswordStyles>({});

export default function ForgottenPassword({
  email,
  customStyles,
  customDarkStyles,
  customLightStyles,
  extraCustomStyles,
  extraCustomDarkStyles,
  extraCustomLightStyles,
  placeholders,
  icons,
  strings,
  loadingComponent,
  supabaseClient,
  redirectTo,
  emailErrorMessage,
  onEmailChanged,
  onSigninRedirect,
  onResetPasswordError,
  onResetPasswordSent,
}: ForgottenPasswordProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePasswordResetAsync = async (e: any) => {
    setIsLoading(true);
    const { error } = await supabaseClient.auth.resetPasswordForEmail(
      email ?? '',
      {
        redirectTo,
      }
    );
    setIsLoading(false);
    if (error) onResetPasswordError?.(error);
    else onResetPasswordSent?.();
  };

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
          customStyles={extraCustomStyles?.input}
          customDarkStyles={extraCustomDarkStyles?.input}
          customLightStyles={extraCustomLightStyles?.input}
          customExtraStyles={extraCustomStyles?.extraInput}
          customExtraLightStyles={extraCustomLightStyles?.extraInput}
          customExtraDarkStyles={extraCustomDarkStyles?.extraInput}
          label={strings.emailAddress}
          placeholder={placeholders?.email}
          error={emailErrorMessage}
          icon={
            icons?.input ?? (
              <Email size={21} color={isDarkTheme ? '#fff' : '#000'} />
            )
          }
          onChange={(e) => onEmailChanged?.(e.nativeEvent.text)}
        />
        <Button
          customStyles={{
            root: {
              paddingTop: MarginsPaddings.mp_6,
              paddingBottom: MarginsPaddings.mp_6,
            },
            ...extraCustomStyles?.button,
          }}
          customDarkStyles={extraCustomDarkStyles?.button}
          customLightStyles={extraCustomLightStyles?.button}
          loading={isLoading}
          loadingComponent={loadingComponent}
          block
          size={'full'}
          icon={icons?.button ?? <Inbox size={21} color={'#fff'} />}
          onPress={handlePasswordResetAsync}
        >
          {strings.sendResetPasswordInstructions}
        </Button>
      </View>
    </View>
  );
}
