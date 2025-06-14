/* eslint-disable react/react-in-jsx-scope */
import { Provider } from '@supabase/supabase-js';
import { AuthStrings } from './Auth';
import { useState } from 'react';
import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import Button, { ButtonStyles } from '../Button/Button';
import * as SocialIcons from './Icons';
import MarginsPaddings from '../Themes/margins_paddings';
import { SocialAuthIcons } from './SocialAuth';

export interface SocialButtonStyles {
  buttonContainer?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraSocialButtonStyles {
  button?: ButtonStyles;
}

export interface SocialButtonProps {
  customStyles?: SocialButtonStyles;
  customDarkStyles?: SocialButtonStyles;
  customLightStyles?: SocialButtonStyles;
  customExtraStyles?: ExtraSocialButtonStyles;
  customExtraDarkStyles?: ExtraSocialButtonStyles;
  customExtraLightStyles?: ExtraSocialButtonStyles;
  provider: Provider;
  icon?: React.ReactNode;
  isLoading: boolean;
  loadingComponent?: JSX.Element;
  verticalSocialLayout: any;
  signLabel: string;
  socialColors: boolean;
  handleProviderSignIn: (provider: Provider) => void;
}

const styles = StyleSheet.create<SocialButtonStyles>({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: MarginsPaddings.mp_5,
  },
});
const lightStyles = StyleSheet.create<SocialButtonStyles>({});
const darkStyles = StyleSheet.create<SocialButtonStyles>({});

export default function SocialButton({
  customStyles,
  customDarkStyles,
  customLightStyles,
  customExtraStyles,
  customExtraDarkStyles,
  customExtraLightStyles,
  provider,
  icon,
  isLoading,
  loadingComponent,
  verticalSocialLayout,
  signLabel,
  socialColors = true,
  handleProviderSignIn,
}: SocialButtonProps) {
  // @ts-ignore
  const AuthIcon = SocialIcons[provider];
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const buttonStyles = StyleSheet.create<any>({
    azure: {
      backgroundColor: '#008AD7',
    },
    bitbucket: {
      backgroundColor: '#205081',
    },
    facebook: {
      backgroundColor: '#4267B2',
    },
    github: {
      backgroundColor: '#333',
    },
    gitlab: {
      backgroundColor: '#FC6D27',
    },
    google: {
      backgroundColor: '#ce4430',
    },
    twitter: {
      backgroundColor: '#1DA1F2',
    },
    apple: {
      backgroundColor: '#000',
    },
    discord: {
      backgroundColor: '#404fec',
    },
    twitch: {
      backgroundColor: '#9146ff',
    },
    spotify: {
      backgroundColor: '#1ed760',
    },
  });

  const textStyles = StyleSheet.create<any>({
    azure: {
      color: 'white',
    },
    bitbucket: {
      color: 'white',
    },
    facebook: {
      color: 'white',
    },
    github: {
      color: 'white',
    },
    gitlab: {},
    google: {
      color: 'white',
    },
    twitter: {
      color: 'white',
    },
    apple: {
      color: 'white',
    },
    discord: {
      color: 'white',
    },
    twitch: {
      color: 'white',
    },
    spotify: {
      color: 'white',
    },
  });

  return (
    <View
      style={[
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
        { ...styles.buttonContainer, ...(customStyles?.buttonContainer ?? {}) },
        !verticalSocialLayout ? { flexGrow: 1 } : {},
      ]}
      key={provider}
    >
      <Button
        block={true}
        customStyles={{
          ...customExtraStyles?.button,
          ...(socialColors && {
            button: {
              ...buttonStyles[provider],
            },
          }),
        }}
        customDarkStyles={customExtraDarkStyles?.button}
        customLightStyles={customExtraLightStyles?.button}
        type={'default'}
        size={'full'}
        loading={isLoading}
        loadingComponent={loadingComponent}
        onPress={() => handleProviderSignIn(provider)}
        icon={
          icon
            ? icon
            : AuthIcon && (
                <AuthIcon
                  {...(socialColors
                    ? textStyles[provider]
                    : isDarkTheme
                    ? { color: '#fff' }
                    : { color: '#000' })}
                />
              )
        }
      >
        {verticalSocialLayout && signLabel + provider}
      </Button>
    </View>
  );
}
