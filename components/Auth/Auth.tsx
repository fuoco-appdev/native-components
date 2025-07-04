/* eslint-disable react/react-in-jsx-scope */
import { SupabaseClient, Provider, AuthError } from '@supabase/supabase-js';
import { ButtonStyles } from '../Button/Button';
import { InputStyles } from '../Input/Input';
import {
  GestureResponderEvent,
  ImageStyle,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { DividerStyles } from '../Divider/Divider';
import React, { useEffect, useState } from 'react';
import SocialAuth, {
  ExtraSocialAuthStyles,
  SocialAuthIcons,
  SocialAuthStyles,
} from './SocialAuth';
import {
  EmailAuth,
  EmailAuthStyles,
  EmailIcons,
  EmailPlaceholders,
  ExtraEmailAuthStyles,
} from './EmailAuth';
import { ExtraMagicLinkStyles, MagicLinkStyles } from './MagicLink';
import ForgottenPassword, {
  ExtraForgottenPasswordStyles,
  ForgottenPasswordIcons,
  ForgottenPasswordPlaceholders,
  ForgottenPasswordStyles,
} from './ForgottenPassword';
import UpdatePassword, {
  ExtraUpdatePasswordStyles,
  UpdatePasswordPlaceholders,
  UpdatePasswordStyles,
} from './UpdatePassword';
import ResetPassword, {
  ExtraResetPasswordStyles,
  ResetPasswordStyles,
} from './ResetPassword';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';

export const VIEWS: ViewsMap = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  RESET_PASSWORD: 'reset_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password',
  TERMS_OF_SERVICE: 'terms_of_service',
  PRIVACY_POLICY: 'privacy_policy',
};

export interface ViewsMap {
  [key: string]: ViewType;
}

export type ViewType =
  | 'sign_in'
  | 'sign_up'
  | 'forgotten_password'
  | 'reset_password'
  | 'magic_link'
  | 'update_password'
  | 'terms_of_service'
  | 'privacy_policy';

export type RedirectTo = undefined | string;

export interface AuthStrings {
  orContinueWith?: string;
  emailAddress?: string;
  password?: string;
  confirmPassword?: string;
  rememberMe?: string;
  forgotYourPassword?: string;
  signIn?: string;
  signInWith?: string;
  signUp?: string;
  signUpWith?: string;
  doYouHaveAnAccount?: string;
  dontHaveAnAccount?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  resetPassword?: string;
  updatePassword?: string;
  enterYourNewPassword?: string;
  confirmNewPasswordPlaceholder?: string;
  agreeToThe?: string;
  termsOfService?: string;
  privacyPolicy?: string;
  yourEmailAddress?: string;
  sendResetPasswordInstructions?: string;
  goBackToSignIn?: string;
  sendMagicLink?: string;
  signInWithPassword?: string;
}

export interface AuthStyles {
  root?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraAuthStyles {
  socialAuth?: SocialAuthStyles;
  extraSocialAuth?: ExtraSocialAuthStyles;
  emailAuth?: EmailAuthStyles;
  extraEmailAuth?: ExtraEmailAuthStyles;
  magicLink?: MagicLinkStyles;
  extraMagicLink?: ExtraMagicLinkStyles;
  forgottenPassword?: ForgottenPasswordStyles;
  extraForgottenPassword?: ExtraForgottenPasswordStyles;
  updatePassword?: UpdatePasswordStyles;
  extraUpdatePassword?: ExtraUpdatePasswordStyles;
  resetPassword?: ResetPasswordStyles;
  extraResetPassword?: ExtraResetPasswordStyles;
}

export interface AndroidRippleProps {
  //socialButton?: AndroidRipplesProps;
  //submitButton?: AndroidRipplesProps;
}

export interface AuthPlaceholders {
  email?: EmailPlaceholders;
  forgottenPassword?: ForgottenPasswordPlaceholders;
  updatePassword?: UpdatePasswordPlaceholders;
}

export interface AuthIcons {
  socialAuth?: SocialAuthIcons;
  email?: EmailIcons;
  forgottenPassword?: ForgottenPasswordIcons;
}

export interface AuthProps {
  supabaseClient: SupabaseClient;
  customStyles?: AuthStyles;
  customDarkStyles?: AuthStyles;
  customLightStyles?: AuthStyles;
  customExtraStyles?: ExtraAuthStyles;
  customExtraDarkStyles?: ExtraAuthStyles;
  customExtraLightStyles?: ExtraAuthStyles;
  icons?: AuthIcons;
  placeholders?: AuthPlaceholders;
  emailValue?: string;
  passwordValue?: string;
  confirmPasswordValue?: string;
  children?: React.ReactNode;
  touchScreen?: boolean;
  socialLoadingComponent?: JSX.Element;
  emailLoadingComponent?: JSX.Element;
  checkboxTintColors?: {
    true?: any;
    false?: any;
  };
  checkboxOnFillColor?: string;
  strings?: AuthStrings;
  androidRippleProps?: AndroidRippleProps;
  socialLayout?: 'horizontal' | 'vertical';
  socialColors?: boolean;
  socialButtonSize?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  providers?: Provider[];
  verticalSocialLayout?: any;
  view?: ViewType;
  redirectTo?: RedirectTo;
  onlyThirdPartyProviders?: boolean;
  magicLink?: boolean;
  termsOfService?: JSX.Element;
  privacyPolicy?: JSX.Element;
  emailErrorMessage?: string;
  passwordErrorMessage?: string;
  confirmPasswordErrorMessage?: string;
  onEmailChanged?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onPasswordChanged?: (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => void;
  onConfirmPasswordChanged?: (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => void;
  onTermsOfServiceRedirect?: (e: GestureResponderEvent) => void;
  onPrivacyPolicyRedirect?: (e: GestureResponderEvent) => void;
  onForgotPasswordRedirect?: (e: GestureResponderEvent) => void;
  // onMagicLinkRedirect?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onSignupRedirect?: () => void;
  onSigninRedirect?: () => void;
  onAuthenticating?: () => void;
  onEmailConfirmationSent?: () => void;
  onPasswordUpdated?: (e?: GestureResponderEvent) => void;
  onResetPasswordSent?: () => void;
  // onMagicLinkSent?: (e?: React.FormEvent<HTMLFormElement>) => void;
  onSigninError?: (error: AuthError) => void;
  onSignupError?: (error: AuthError) => void;
  onUpdatePasswordError?: (error: AuthError) => void;
  onResetPasswordError?: (error: AuthError) => void;
  onMagicLinkError?: (error: AuthError) => void;
}

const styles = StyleSheet.create<AuthStyles>({
  root: {
    width: '100%',
  },
});
const lightStyles = StyleSheet.create<AuthStyles>({});
const darkStyles = StyleSheet.create<AuthStyles>({});

export const defaultStrings: AuthStrings = {
  orContinueWith: 'or continue with',
  emailAddress: 'Email address',
  password: 'Password',
  confirmPassword: 'Confirm password',
  rememberMe: 'Remember me',
  forgotYourPassword: 'Forgot your password?',
  signIn: 'Sign in',
  signInWith: 'Sign in with',
  signUp: 'Sign up',
  signUpWith: 'Sign up with',
  doYouHaveAnAccount: 'Do you have an account? Sign in',
  dontHaveAnAccount: "Don't have an account? Sign up",
  newPassword: 'New password',
  confirmNewPassword: 'Confirm new password',
  resetPassword: 'Reset password',
  updatePassword: 'Update password',
  enterYourNewPassword: 'Enter your new password',
  confirmNewPasswordPlaceholder: 'Confirm your new password',
  agreeToThe: 'I agree to the',
  termsOfService: 'Terms of Service',
  privacyPolicy: 'Privacy Policy',
  yourEmailAddress: 'Your email address',
  sendResetPasswordInstructions: 'Send reset password instructions',
  goBackToSignIn: 'Go back to sign in',
  sendMagicLink: 'Send magic link',
  signInWithPassword: 'Sign in with password',
};

function Auth({
  customStyles,
  customDarkStyles,
  customLightStyles,
  customExtraStyles,
  customExtraLightStyles,
  customExtraDarkStyles,
  icons,
  placeholders,
  supabaseClient,
  emailValue,
  passwordValue,
  confirmPasswordValue,
  checkboxTintColors,
  checkboxOnFillColor,
  strings,
  socialLoadingComponent,
  emailLoadingComponent,
  androidRippleProps = {},
  socialLayout = 'vertical',
  socialColors = false,
  socialButtonSize = 'large',
  touchScreen = false,
  providers,
  view = 'sign_in',
  emailErrorMessage,
  passwordErrorMessage,
  confirmPasswordErrorMessage,
  redirectTo,
  onlyThirdPartyProviders = false,
  magicLink = false,
  termsOfService,
  privacyPolicy,
  onEmailChanged,
  onPasswordChanged,
  onConfirmPasswordChanged,
  onTermsOfServiceRedirect,
  onPrivacyPolicyRedirect,
  onForgotPasswordRedirect,
  // onMagicLinkRedirect,
  onSignupRedirect,
  onSigninRedirect,
  onAuthenticating,
  onEmailConfirmationSent,
  onPasswordUpdated,
  onResetPasswordSent,
  // onMagicLinkSent,
  onSigninError,
  onSignupError,
  onUpdatePasswordError,
  onResetPasswordError,
  onMagicLinkError,
}: AuthProps): JSX.Element | null {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [authView, setAuthView] = useState(view);
  const verticalSocialLayout = socialLayout === 'vertical' ? true : false;

  useEffect(() => {
    setAuthView(view);
  }, [view]);

  return (
    <View
      style={[
        ...(isDarkTheme
          ? [{ ...darkStyles?.root, ...(customDarkStyles?.root ?? {}) }]
          : [{ ...lightStyles?.root, ...(customLightStyles?.root ?? {}) }]),
        { ...styles.root, ...(customStyles?.root ?? {}) },
      ]}
    >
      {providers && providers?.length > 0 && (
        <SocialAuth
          customStyles={customExtraStyles?.socialAuth}
          customLightStyles={customExtraLightStyles?.socialAuth}
          customDarkStyles={customExtraDarkStyles?.socialAuth}
          customExtraStyles={customExtraStyles?.extraSocialAuth}
          customExtraLightStyles={customExtraLightStyles?.extraSocialAuth}
          customExtraDarkStyles={customExtraDarkStyles?.extraSocialAuth}
          icons={icons?.socialAuth as Record<string, React.ReactNode>}
          view={view}
          socialLoadingComponent={socialLoadingComponent}
          strings={{ ...defaultStrings, ...strings }}
          supabaseClient={supabaseClient}
          verticalSocialLayout={verticalSocialLayout}
          providers={providers}
          socialButtonSize={socialButtonSize}
          socialColors={socialColors}
          redirectTo={redirectTo}
          onlyThirdPartyProviders={onlyThirdPartyProviders}
          onAuthenticating={onAuthenticating}
        />
      )}
      {(authView === VIEWS.SIGN_IN || authView === VIEWS.SIGN_UP) && (
        <EmailAuth
          customStyles={customExtraStyles?.emailAuth}
          customLightStyles={customExtraLightStyles?.emailAuth}
          customDarkStyles={customExtraDarkStyles?.emailAuth}
          extraCustomStyles={customExtraStyles?.extraEmailAuth}
          extraCustomLightStyles={customExtraLightStyles?.extraEmailAuth}
          extraCustomDarkStyles={customExtraDarkStyles?.extraEmailAuth}
          icons={icons?.email}
          placeholders={placeholders?.email}
          loadingComponent={emailLoadingComponent}
          emailValue={emailValue}
          passwordValue={passwordValue}
          confirmPasswordValue={confirmPasswordValue}
          checkboxTintColors={checkboxTintColors}
          checkboxOnFillColor={checkboxOnFillColor}
          strings={{ ...defaultStrings, ...strings }}
          supabaseClient={supabaseClient}
          authView={authView}
          setAuthView={setAuthView}
          emailErrorMessage={emailErrorMessage}
          passwordErrorMessage={passwordErrorMessage}
          confirmPasswordErrorMessage={confirmPasswordErrorMessage}
          magicLink={magicLink}
          redirectTo={redirectTo}
          onEmailChanged={onEmailChanged}
          onPasswordChanged={onPasswordChanged}
          onConfirmPasswordChanged={onConfirmPasswordChanged}
          onAuthenticating={onAuthenticating}
          onEmailConfirmationSent={onEmailConfirmationSent}
          onTermsOfServiceRedirect={onTermsOfServiceRedirect}
          onPrivacyPolicyRedirect={onPrivacyPolicyRedirect}
          onForgotPasswordRedirect={onForgotPasswordRedirect}
          onSigninError={onSigninError}
          onSignupError={onSignupError}
        />
      )}
      {authView === VIEWS.FORGOTTEN_PASSWORD && (
        <ForgottenPassword
          customStyles={customExtraStyles?.forgottenPassword}
          customLightStyles={customExtraLightStyles?.forgottenPassword}
          customDarkStyles={customExtraDarkStyles?.forgottenPassword}
          extraCustomStyles={customExtraStyles?.extraForgottenPassword}
          extraCustomLightStyles={
            customExtraLightStyles?.extraForgottenPassword
          }
          extraCustomDarkStyles={customExtraDarkStyles?.extraForgottenPassword}
          placeholders={placeholders?.forgottenPassword}
          icons={icons?.forgottenPassword}
          strings={{ ...defaultStrings, ...strings }}
          supabaseClient={supabaseClient}
          redirectTo={redirectTo}
          emailErrorMessage={emailErrorMessage}
          onSigninRedirect={onSigninRedirect}
          onResetPasswordError={onResetPasswordError}
          onResetPasswordSent={onResetPasswordSent}
        />
      )}
      {authView === VIEWS.MAGIC_LINK && (
        // <MagicLink
        //   classNames={classNames?.magicLink}
        //   strings={{ ...defaultStrings, ...strings }}
        //   touchScreen={touchScreen}
        //   supabaseClient={supabaseClient}
        //   setAuthView={setAuthView}
        //   redirectTo={redirectTo}
        //   emailErrorMessage={emailErrorMessage}
        //   onMagicLinkError={onMagicLinkError}
        //   onMagicLinkSent={onMagicLinkSent}
        // />
        <></>
      )}
      {authView === VIEWS.UPDATE_PASSWORD && (
        <UpdatePassword
          customStyles={customExtraStyles?.updatePassword}
          customLightStyles={customExtraLightStyles?.updatePassword}
          customDarkStyles={customExtraDarkStyles?.updatePassword}
          extraCustomStyles={customExtraStyles?.extraUpdatePassword}
          extraCustomLightStyles={customExtraLightStyles?.extraUpdatePassword}
          extraCustomDarkStyles={customExtraDarkStyles?.extraUpdatePassword}
          placeholders={placeholders?.updatePassword}
          strings={{ ...defaultStrings, ...strings }}
          supabaseClient={supabaseClient}
          passwordErrorMessage={passwordErrorMessage}
          onUpdatePasswordError={onUpdatePasswordError}
          onPasswordUpdated={onPasswordUpdated}
        />
      )}
      {authView === VIEWS.RESET_PASSWORD && (
        <ResetPassword
          customStyles={customExtraStyles?.resetPassword}
          customLightStyles={customExtraLightStyles?.resetPassword}
          customDarkStyles={customExtraDarkStyles?.resetPassword}
          customExtraStyles={customExtraStyles?.extraResetPassword}
          customExtraLightStyles={customExtraLightStyles?.extraResetPassword}
          customExtraDarkStyles={customExtraDarkStyles?.extraResetPassword}
          strings={{ ...defaultStrings, ...strings }}
          supabaseClient={supabaseClient}
          passwordErrorMessage={passwordErrorMessage}
          onResetPasswordError={onResetPasswordError}
          onPasswordUpdated={onPasswordUpdated}
        />
      )}
      {authView === VIEWS.TERMS_OF_SERVICE && (
        <TermsOfService children={termsOfService} />
      )}
      {authView === VIEWS.PRIVACY_POLICY && (
        <PrivacyPolicy children={privacyPolicy} />
      )}
    </View>
  );
}

Auth.ForgottenPassword = ForgottenPassword;
Auth.ResetPassword = ResetPassword;
Auth.UpdatePassword = UpdatePassword;
Auth.TermsOfService = TermsOfService;
Auth.PrivacyPolicy = PrivacyPolicy;

export default Auth;
