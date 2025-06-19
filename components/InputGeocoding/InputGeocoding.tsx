/* eslint-disable react/react-in-jsx-scope */
import {
  ImageStyle,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  useColorScheme,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
  KeyboardTypeOptions,
  ColorValue,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Colors from '../Themes/colors';
import MarginsPaddings from '../Themes/margins_paddings';
import Globals from '../Themes/globals';
import Button, { ButtonStyles } from '../Button/Button';
import { FormLayout, FormLayoutStyles } from '../FormLayout/FormLayout';
import {
  ContentCopy,
  ErrorOutline,
  Visibility,
  VisibilityOff,
} from '../Icon/Icons/Line';
import React, { useEffect, useState } from 'react';
import Typography, { TypographyStyles } from '../Typography/Typography';
import {
  BottomSheet,
  BottomSheetItemStyles,
  BottomSheetStyles,
  ExtraBottomSheetItemStyles,
} from '../BottomSheet';
import { Line } from '../Icon';
import Input, { ExtraInputStyles, InputStyles } from '../Input/Input';

export interface InputGeocodingStyles {
  container?: ViewStyle | TextStyle | ImageStyle;
  error?: ViewStyle | TextStyle | ImageStyle;
  withIcon?: ViewStyle | TextStyle | ImageStyle;
  borderless?: ViewStyle | TextStyle | ImageStyle;
  iconContainer?: ViewStyle | TextStyle | ImageStyle;
  input?: ViewStyle | TextStyle | ImageStyle;
  actionsContainer?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraInputGeocodingStyles {
  formLayout?: FormLayoutStyles;
  button?: ButtonStyles;
  bottomSheet?: BottomSheetStyles;
  bottomSheetTitle?: TypographyStyles;
  bottomSheetItem?: BottomSheetItemStyles;
  extraBottomSheetItem?: ExtraBottomSheetItemStyles;
  bottomSheetInput?: InputStyles;
  extraBottomSheetInput?: ExtraInputStyles;
}

export interface InputGeocodingProps {
  mapboxAccessToken: string;
  strings?: {
    bottomSheetTitle?: string;
    searchNotFound?: string;
    searchPlaceholder?: string;
  };
  placeType?:
    | 'address'
    | 'postcode'
    | 'place'
    | 'district'
    | 'region'
    | 'country';
  defaultCoordinates?: [number, number];
  customStyles?: InputGeocodingStyles;
  customLightStyles?: InputGeocodingStyles;
  customDarkStyles?: InputGeocodingStyles;
  customExtraStyles?: ExtraInputGeocodingStyles;
  customExtraDarkStyles?: ExtraInputGeocodingStyles;
  customExtraLightStyles?: ExtraInputGeocodingStyles;
  icon?: React.ReactNode;
  placeholder?: string;
  descriptionText?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  beforeLabel?: string;
  afterLabel?: string;
  labelOptional?: string;
  onLocationChanged?: (feature: any) => void;
}

const styles = StyleSheet.create<InputGeocodingStyles>({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: Globals.rounded_md,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
  error: {
    borderColor: Colors.red_500,
    borderWidth: 1,
    borderStyle: 'solid',
    fontFamily: Globals.font_family,
  },
  withIcon: {},
  borderless: {},
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: MarginsPaddings.mp_4,
  },
  input: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    paddingTop: MarginsPaddings.mp_4,
    paddingBottom: MarginsPaddings.mp_4,
    width: '100%',
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
    fontFamily: Globals.font_family,
  },
  actionsContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: MarginsPaddings.mp_4,
    top: 0,
    bottom: 0,
    right: 0,
    paddingRight: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
  },
});
const lightStyles = StyleSheet.create<InputGeocodingStyles>({
  root: {},
  container: {
    backgroundColor: Colors.gray_100,
  },
  error: {},
  withIcon: {},
  borderless: {},
  iconContainer: {
    color: Colors.gray_900,
  },
  input: {
    color: Colors.gray_900,
  },
  actionsContainer: {
    color: Colors.gray_900,
  },
});
const darkStyles = StyleSheet.create<InputGeocodingStyles>({
  root: {},
  container: {
    backgroundColor: Colors.dark_1,
  },
  error: {},
  withIcon: {},
  borderless: {},
  iconContainer: {
    color: Colors.gray_100,
  },
  input: {
    color: Colors.gray_100,
  },
  actionsContainer: {
    color: Colors.gray_100,
  },
});

function InputGeocodingSearch({
  customExtraStyles,
  customExtraLightStyles,
  customExtraDarkStyles,
  value,
  mapboxAccessToken,
  placeType,
  onChanged,
  onClose,
  strings,
}: {
  customExtraStyles?: ExtraInputGeocodingStyles;
  customExtraDarkStyles?: ExtraInputGeocodingStyles;
  customExtraLightStyles?: ExtraInputGeocodingStyles;
  value: string | undefined;
  mapboxAccessToken: string;
  placeType: string;
  onChanged?: (feature: any) => void;
  onClose?: () => void;
  strings?: {
    bottomSheetTitle?: string;
    searchNotFound?: string;
    searchPlaceholder?: string;
  };
}) {
  const [searchValue, setSearchValue] = useState<string>(value ?? '');
  const [features, setFeatures] = useState<any[]>([]);

  const onFeaturePressed = (feature: any) => {
    onChanged?.(feature);
    onClose?.();
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${mapboxAccessToken}&autocomplete=true&types=${placeType}`;
        const response = await fetch(endpoint);
        const results = await response.json();
        setFeatures(results?.features);
      } catch (error) {
        console.error('Error fetching data, ', error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [mapboxAccessToken, placeType, searchValue, setFeatures]);

  return (
    <>
      <Typography.Title
        level={4}
        customStyles={{
          root: {
            flex: 1,
            textAlign: 'center',
            padding: MarginsPaddings.mp_3,
          },
          ...customExtraStyles?.bottomSheetTitle,
        }}
        customLightStyles={customExtraLightStyles?.bottomSheetTitle}
        customDarkStyles={customExtraDarkStyles?.bottomSheetTitle}
      >
        {strings?.bottomSheetTitle}
      </Typography.Title>
      <Input
        placeholder={strings?.searchPlaceholder}
        customStyles={{
          container: {
            marginLeft: MarginsPaddings.mp_5,
            marginRight: MarginsPaddings.mp_5,
            marginTop: MarginsPaddings.mp_5,
          },
          ...customExtraStyles?.bottomSheetInput,
        }}
        customLightStyles={customExtraLightStyles?.bottomSheetInput}
        customDarkStyles={customExtraDarkStyles?.bottomSheetInput}
        customExtraStyles={customExtraStyles?.extraBottomSheetInput}
        customExtraLightStyles={customExtraLightStyles?.extraBottomSheetInput}
        customExtraDarkStyles={customExtraDarkStyles?.extraBottomSheetInput}
        value={searchValue}
        onChange={(e) => setSearchValue(e.nativeEvent.text)}
      />
      {features?.map((value) => (
        <BottomSheet.Item
          key={`feature_${value.id}`}
          onPress={() => onFeaturePressed(value)}
          customStyles={customExtraStyles?.bottomSheetItem}
          customDarkStyles={customExtraDarkStyles?.bottomSheetItem}
          customLightStyles={customExtraLightStyles?.bottomSheetItem}
          customExtraStyles={customExtraStyles?.extraBottomSheetItem}
          customExtraLightStyles={customExtraLightStyles?.extraBottomSheetItem}
          customExtraDarkStyles={customExtraDarkStyles?.extraBottomSheetItem}
        >
          {value['place_name']}
        </BottomSheet.Item>
      ))}
    </>
  );
}

function InputGeocoding({
  mapboxAccessToken,
  placeType = 'place',
  defaultCoordinates,
  strings = {
    searchNotFound: 'No entries to show',
    searchPlaceholder: 'Search',
    bottomSheetTitle: 'Location',
  },
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  customExtraStyles = {},
  customExtraDarkStyles = {},
  customExtraLightStyles = {},
  icon = <Line.LocationOn size={21} color={Colors.brand_600} />,
  placeholder = '123 Main Street, Quebec, Canada',
  descriptionText,
  disabled,
  error,
  label = 'Location',
  beforeLabel,
  afterLabel,
  labelOptional,
  onLocationChanged,
}: InputGeocodingProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>(undefined);
  const { height } = Dimensions.get('screen');

  const onChanged = (feature: any) => {
    setValue(feature['place_name']);
    onLocationChanged?.(feature);
  };

  useEffect(() => {
    if (value) {
      return;
    }

    const updateLocationAsync = new Promise<void>(async (resolve, reject) => {
      let selectedLongitude = 0;
      let selectedLatitude = 0;
      let defaultLongitude = 0;
      let defaultLatitude = 0;

      if (defaultCoordinates) {
        defaultLongitude = defaultCoordinates[0] ?? 0;
        defaultLatitude = defaultCoordinates[1] ?? 0;
      }

      if (
        selectedLongitude === defaultLongitude &&
        selectedLatitude === defaultLatitude
      ) {
        resolve();
      }

      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${defaultLongitude},${defaultLatitude}.json?access_token=${mapboxAccessToken}&types=${placeType}`;
      const response = await fetch(endpoint);
      const results = await response.json();
      if (results.features?.length > 0) {
        const feature = results.features[0];
        if (feature['place_name'] !== value) {
          setValue(feature['place_name']);
          onLocationChanged?.(feature);
        }
        resolve();
      }
    });

    updateLocationAsync.then();
  }, [defaultCoordinates, mapboxAccessToken, placeType]);

  return (
    <>
      <FormLayout
        label={label}
        afterLabel={afterLabel}
        beforeLabel={beforeLabel}
        labelOptional={labelOptional}
        error={error}
        descriptionText={descriptionText}
        customStyles={customExtraStyles.formLayout}
        customDarkStyles={customExtraDarkStyles.formLayout}
        customLightStyles={customExtraLightStyles.formLayout}
      >
        <Button
          customStyles={{
            ...{
              button: {
                paddingTop: MarginsPaddings.mp_5,
                paddingBottom: MarginsPaddings.mp_5,
              },
            },
            ...customExtraStyles.button,
          }}
          customDarkStyles={customExtraDarkStyles.button}
          customLightStyles={customExtraLightStyles.button}
          type={'text'}
          size={'full'}
          icon={icon}
          onPress={() => setOpen(true)}
          disabled={disabled}
        >
          {!value ? placeholder : value}
        </Button>
      </FormLayout>
      <BottomSheet
        id={'input-geocoding'}
        open={open}
        onClose={() => setOpen(false)}
        type={'scroll-view'}
        defaultSheetHeight={height * 0.9}
        customStyles={{
          root: {
            paddingBottom: MarginsPaddings.mp_5,
          },
          ...customExtraStyles.bottomSheet,
        }}
        customLightStyles={customExtraLightStyles.bottomSheet}
        customDarkStyles={customExtraDarkStyles.bottomSheet}
      >
        <InputGeocodingSearch
          customExtraStyles={customExtraStyles}
          customExtraLightStyles={customExtraLightStyles}
          customExtraDarkStyles={customExtraDarkStyles}
          value={value}
          mapboxAccessToken={mapboxAccessToken}
          placeType={placeType}
          strings={strings}
          onChanged={onChanged}
          onClose={() => setOpen(false)}
        />
      </BottomSheet>
    </>
  );
}

export default InputGeocoding;
