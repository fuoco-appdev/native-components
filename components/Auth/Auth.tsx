import { SupabaseClient, Provider, AuthError } from '@supabase/supabase-js';
import { ButtonStyles } from '../Button/Button';
import { InputStyles } from '../Input/Input';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { DividerStyles } from '../Divider/Divider';

const VIEWS: ViewsMap = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  RESET_PASSWORD: 'reset_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password',
  TERMS_OF_SERVICE: 'terms_of_service',
  PRIVACY_POLICY: 'privacy_policy',
};

interface ViewsMap {
  [key: string]: ViewType;
}

type ViewType =
  | 'sign_in'
  | 'sign_up'
  | 'forgotten_password'
  | 'reset_password'
  | 'magic_link'
  | 'update_password'
  | 'terms_of_service'
  | 'privacy_policy';

type RedirectTo = undefined | string;

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
  container?: string;
}

export interface ExtraAuthStyles {
  socialAuth?: SocialAuthStyles;
  emailAuth?: EmailAuthStyles;
  magicLink?: MagicLinkStyles;
  forgottenPassword?: ExtraForgottenPasswordStyles;
  updatePassword?: ExtraUpdatePasswordStyles;
}

export interface SocialButtonStyles {
  buttonContainer?: string;
  buttonContent?: string;
  buttonIcon?: string;
}

export interface ExtraSocialButtonStyles {
  buttonStyles?: ButtonStyles;
}

export interface SocialAuthStyles {
  buttonRoot?: string;
  buttonContainer?: string;
}

export interface ExtraSocialAuthStyles {
  socialButton?: SocialButtonStyles;
  divider?: DividerStyles;
}

export interface EmailAuthStyles {
  buttonContainer?: string;
  rememberMeContainer?: string;
  linkContainer?: string;
  emailButtonContainer?: string;
  emailButtonContent?: string;
  buttonIcon?: string;
}

export interface ExtraEmailAuthStyles {
  input?: InputStyles;
  //checkbox?: CheckboxStyles;
  emailButton?: ButtonStyles;
}

export interface MagicLinkStyles {
  buttonContainer?: string;
  buttonContent?: string;
  buttonIcon?: string;
  link?: string;
}

export interface ExtraMagicLinkStyles {
  input?: InputStyles;
  button?: ButtonStyles;
}

export interface ForgottenPasswordClasses {
  buttonContainer?: string;
  buttonContent?: string;
  buttonIcon?: string;
  link?: string;
}

export interface ExtraForgottenPasswordStyles {
  input?: InputStyles;
  button?: ButtonStyles;
}

export interface ResetPasswordStyles {
  buttonContainer?: string;
  buttonContent?: string;
  buttonIcon?: string;
}

export interface ExtraResetPasswordStyles {
  input?: InputStyles;
  button?: ButtonStyles;
}

export interface UpdatePasswordClasses {
  buttonContainer?: string;
  buttonContent?: string;
  buttonIcon?: string;
}

export interface ExtraUpdatePasswordStyles {
  input?: InputStyles;
  button?: ButtonStyles;
}

export interface AndroidRippleProps {
  //socialButton?: AndroidRipplesProps;
  //submitButton?: AndroidRipplesProps;
}

export interface AuthProps {
  supabaseClient: SupabaseClient;
  customStyles?: AuthStyles;
  customDarkStyles?: AuthStyles;
  customLightStyles?: AuthStyles;
  emailValue?: string;
  passwordValue?: string;
  confirmPasswordValue?: string;
  children?: React.ReactNode;
  touchScreen?: boolean;
  socialLoadingComponent?: JSX.Element;
  emailLoadingComponent?: JSX.Element;
  style?: React.CSSProperties;
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
  onForgotPasswordRedirect?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onTermsOfServiceRedirect?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onPrivacyPolicyRedirect?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMagicLinkRedirect?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onSignupRedirect?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onSigninRedirect?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onAuthenticating?: (e?: React.FormEvent<HTMLFormElement>) => void;
  onEmailConfirmationSent?: (e?: React.FormEvent<HTMLFormElement>) => void;
  onPasswordUpdated?: (e?: React.FormEvent<HTMLFormElement>) => void;
  onResetPasswordSent?: (e?: React.FormEvent<HTMLFormElement>) => void;
  onMagicLinkSent?: (e?: React.FormEvent<HTMLFormElement>) => void;
  onSigninError?: (error: AuthError) => void;
  onSignupError?: (error: AuthError) => void;
  onUpdatePasswordError?: (error: AuthError) => void;
  onResetPasswordError?: (error: AuthError) => void;
  onMagicLinkError?: (error: AuthError) => void;
}
