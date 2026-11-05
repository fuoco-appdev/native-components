import { iso31661, ISO31661AssignedEntry } from 'iso-3166';
import iso3166 from 'iso-3166-2';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageStyle,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Skeleton from 'react-native-reanimated-skeleton';
import {
  BottomSheet,
  BottomSheetItemStyles,
  BottomSheetStyles,
  ExtraBottomSheetItemStyles,
} from '../BottomSheet';
import Button, { ButtonStyles } from '../Button/Button';
import { FormLayout, FormLayoutStyles } from '../FormLayout/FormLayout';
import Input, { ExtraInputStyles, InputStyles } from '../Input/Input';
import Colors from '../Themes/colors';
import Globals from '../Themes/globals';
import MarginsPaddings from '../Themes/margins_paddings';
import Typography, { TypographyStyles } from '../Typography/Typography';

export interface MapboxGeocodingContext {
  country?: {
    name?: string;
    country_code?: string;
  };
  region?: {
    name?: string;
    region_code?: string;
  };
  postcode?: {
    name?: string;
  };
  district?: {
    name?: string;
  };
  place?: {
    name?: string;
  };
  locality?: {
    name?: string;
  };
  neighborhood?: {
    name?: string;
  };
  address?: {
    name?: string;
    address_number?: string;
    street_name?: string;
  };
  street?: {
    name?: string;
  };
}

export interface MapboxGeocodingFeature {
  type: 'Feature';
  id: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    mapbox_id?: string;
    feature_type?: string;
    name?: string;
    name_preferred?: string;
    place_formatted?: string;
    full_address?: string;
    context: MapboxGeocodingContext;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    bbox?: [number, number, number, number];
    language?: string;
    maki?: string;
  };
}

export interface MapboxGeocodingResponse {
  type: 'FeatureCollection';
  features: MapboxGeocodingFeature[];
  attribution?: string;
}

export interface InputMapboxGeocodingStyles {
  container?: ViewStyle | TextStyle | ImageStyle;
  error?: ViewStyle | TextStyle | ImageStyle;
  withIcon?: ViewStyle | TextStyle | ImageStyle;
  borderless?: ViewStyle | TextStyle | ImageStyle;
  iconContainer?: ViewStyle | TextStyle | ImageStyle;
  input?: ViewStyle | TextStyle | ImageStyle;
  searchContainer?: ViewStyle;
  actionsContainer?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraInputMapboxGeocodingStyles {
  formLayout?: FormLayoutStyles;
  button?: ButtonStyles;
  bottomSheet?: BottomSheetStyles;
  bottomSheetTitle?: TypographyStyles;
  bottomSheetText?: TypographyStyles;
  bottomSheetItem?: BottomSheetItemStyles;
  extraBottomSheetItem?: ExtraBottomSheetItemStyles;
  bottomSheetInput?: InputStyles;
  extraBottomSheetInput?: ExtraInputStyles;
}

export enum MapboxGeocodingType {
  Country = 'country',
  Region = 'region',
  Postcode = 'postcode',
  District = 'district',
  Place = 'place',
  Locality = 'locality',
  Neighborhood = 'neighborhood',
  Street = 'street',
  Address = 'address',
  Poi = 'poi',
}

export interface InputMapboxGeocodingProps {
  mapboxAccessToken: string;
  url?: string;
  language?: string;
  limit?: number;
  disableReverseSearch?: boolean;
  countryCodes?: string[];
  street?: string;
  place?: string;
  district?: string;
  region?: string;
  country?: string;
  postcode?: string;
  strings?: {
    bottomSheetTitle?: string;
    searchNotFound?: string;
    searchPlaceholder?: string;
  };
  type?: MapboxGeocodingType;
  defaultCoordinates?: {
    latitude: number;
    longitude: number;
  };
  customStyles?: InputMapboxGeocodingStyles;
  customLightStyles?: InputMapboxGeocodingStyles;
  customDarkStyles?: InputMapboxGeocodingStyles;
  customExtraStyles?: ExtraInputMapboxGeocodingStyles;
  customExtraDarkStyles?: ExtraInputMapboxGeocodingStyles;
  customExtraLightStyles?: ExtraInputMapboxGeocodingStyles;
  icon?: React.ReactNode;
  placeholder?: string;
  descriptionText?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  beforeLabel?: string;
  afterLabel?: string;
  labelOptional?: string;
  onSearchChanged?: (
    search: MapboxGeocodingFeature,
    iso: {
      country?: ISO31661AssignedEntry;
      province?: iso3166.SubdivisionInfo.Full | null;
    }
  ) => void;
}

const styles = StyleSheet.create<InputMapboxGeocodingStyles>({
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
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
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
const lightStyles = StyleSheet.create<InputMapboxGeocodingStyles>({
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
const darkStyles = StyleSheet.create<InputMapboxGeocodingStyles>({
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

function getFeatureLabel(feature: MapboxGeocodingFeature): string {
  return (
    feature.properties.full_address ??
    feature.properties.place_formatted ??
    feature.properties.name ??
    ''
  );
}

function getIsoCountry(
  feature: MapboxGeocodingFeature
): ISO31661AssignedEntry | undefined {
  return iso31661.find(
    (item) =>
      item.alpha2 ===
      feature.properties.context.country?.country_code?.toUpperCase()
  );
}

function getIsoProvince(
  feature: MapboxGeocodingFeature
): iso3166.SubdivisionInfo.Full | null {
  const countryCode =
    feature.properties.context.country?.country_code?.toUpperCase();
  const regionCode =
    feature.properties.context.region?.region_code?.toUpperCase();
  return iso3166.subdivision(
    countryCode && regionCode ? `${countryCode}-${regionCode}` : ''
  );
}

function InputMapboxGeocodingSearch({
  customStyles,
  customDarkStyles,
  customLightStyles,
  customExtraStyles,
  customExtraLightStyles,
  customExtraDarkStyles,
  mapboxAccessToken,
  url = 'https://api.mapbox.com/search/geocode/v6',
  language,
  limit = 10,
  timeout = 500,
  type,
  countryCodes,
  street,
  place,
  district,
  region,
  country,
  postcode,
  defaultCoordinates,
  onChanged,
  onClose,
  strings,
}: {
  customStyles?: InputMapboxGeocodingStyles;
  customDarkStyles?: InputMapboxGeocodingStyles;
  customLightStyles?: InputMapboxGeocodingStyles;
  customExtraStyles?: ExtraInputMapboxGeocodingStyles;
  customExtraDarkStyles?: ExtraInputMapboxGeocodingStyles;
  customExtraLightStyles?: ExtraInputMapboxGeocodingStyles;
  mapboxAccessToken: string;
  url?: string;
  language?: string;
  limit?: number;
  timeout?: number;
  type: MapboxGeocodingType;
  countryCodes?: string[];
  street?: string;
  place?: string;
  district?: string;
  region?: string;
  country?: string;
  postcode?: string;
  defaultCoordinates?: {
    latitude: number;
    longitude: number;
  };
  onChanged?: (item: MapboxGeocodingFeature) => void;
  onClose?: () => void;
  strings?: {
    bottomSheetTitle?: string;
    searchNotFound?: string;
    searchPlaceholder?: string;
  };
}) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [searchValue, setSearchValue] = useState<string>('');
  const [items, setItems] = useState<MapboxGeocodingFeature[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFeaturePressed = (item: MapboxGeocodingFeature) => {
    onChanged?.(item);
    onClose?.();
  };

  useEffect(() => {
    const searchUrl = `${url}/forward`;
    const params = new URLSearchParams('');
    params.append('q', searchValue);
    params.append('types', type);
    params.append('autocomplete', 'true');
    params.append('limit', limit.toString());
    params.append('access_token', mapboxAccessToken);

    const contextParts: string[] = [];
    if (street && type !== MapboxGeocodingType.Street) {
      contextParts.push(street);
    }
    if (place && type !== MapboxGeocodingType.Place) {
      contextParts.push(place);
    }
    if (district && type !== MapboxGeocodingType.District) {
      contextParts.push(district);
    }
    if (region && type !== MapboxGeocodingType.Region) {
      contextParts.push(region);
    }
    if (postcode && type !== MapboxGeocodingType.Postcode) {
      contextParts.push(postcode);
    }
    if (country && type !== MapboxGeocodingType.Country) {
      contextParts.push(country);
    }
    if (contextParts.length > 0) {
      params.set('q', [searchValue, ...contextParts].join(', '));
    }

    if (countryCodes) {
      params.append('country', countryCodes.join(','));
    } else if (country) {
      const isoCountry = iso31661.find(
        (item) => item.name.toLowerCase() === country.toLowerCase()
      );
      if (isoCountry) {
        params.append('country', isoCountry.alpha2.toLowerCase());
      }
    }

    if (language) {
      params.append('language', language);
    }

    if (defaultCoordinates) {
      params.append(
        'proximity',
        `${defaultCoordinates.longitude},${defaultCoordinates.latitude}`
      );
    }

    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(`${searchUrl}?${params.toString()}`);

        setIsLoading(false);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: MapboxGeocodingResponse = await response.json();
        if (data.features.length === 0) {
          console.log('No results found');
          setItems([]);
          return;
        }
        setItems(data.features);
      } catch (error) {
        console.error('Error fetching data, ', error);
        setIsLoading(false);
      }
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [
    url,
    mapboxAccessToken,
    language,
    limit,
    timeout,
    type,
    searchValue,
    setItems,
    countryCodes,
    street,
    place,
    district,
    region,
    country,
    postcode,
    defaultCoordinates,
  ]);

  return (
    <View
      style={[
        ...(isDarkTheme
          ? [
              {
                ...darkStyles?.searchContainer,
                ...(customDarkStyles?.searchContainer ?? {}),
              },
            ]
          : [
              {
                ...lightStyles?.searchContainer,
                ...(customLightStyles?.searchContainer ?? {}),
              },
            ]),
        { ...styles.searchContainer, ...(customStyles?.searchContainer ?? {}) },
      ]}
    >
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
            marginTop: MarginsPaddings.mp_5,
            flex: 1,
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
      {!isLoading &&
        items.length > 0 &&
        items?.map((value) => (
          <BottomSheet.Item
            key={value.id}
            onPress={() => onFeaturePressed(value)}
            customStyles={customExtraStyles?.bottomSheetItem}
            customDarkStyles={customExtraDarkStyles?.bottomSheetItem}
            customLightStyles={customExtraLightStyles?.bottomSheetItem}
            customExtraStyles={customExtraStyles?.extraBottomSheetItem}
            customExtraLightStyles={
              customExtraLightStyles?.extraBottomSheetItem
            }
            customExtraDarkStyles={customExtraDarkStyles?.extraBottomSheetItem}
          >
            {getFeatureLabel(value)}
          </BottomSheet.Item>
        ))}
      {!isLoading && items.length <= 0 && (
        <Typography.Text
          customStyles={{
            root: {
              width: '100%',
              textAlign: 'center',
              padding: MarginsPaddings.mp_5,
              ...customExtraStyles?.bottomSheetText,
            },
          }}
          customLightStyles={customExtraLightStyles?.bottomSheetText}
          customDarkStyles={customExtraDarkStyles?.bottomSheetText}
        >
          {strings?.searchNotFound}
        </Typography.Text>
      )}
      {isLoading && (
        <Skeleton
          isLoading={true}
          containerStyle={{
            display: 'flex',
            flexDirection: 'column',
          }}
          layout={[
            {
              key: 'text1',
              width: '100%',
              height: 13,
              borderRadius: 13,
              marginTop: MarginsPaddings.mp_5 + 4,
              marginBottom: 4,
            },
            {
              key: 'text2',
              width: '34%',
              height: 13,
              borderRadius: 13,
              marginTop: 4,
              marginBottom: MarginsPaddings.mp_5 + 4,
            },
            {
              key: 'text3',
              width: '100%',
              height: 13,
              borderRadius: 13,
              marginTop: MarginsPaddings.mp_5 + 4,
              marginBottom: 4,
            },
            {
              key: 'text4',
              width: '34%',
              height: 13,
              borderRadius: 13,
              marginTop: 4,
              marginBottom: MarginsPaddings.mp_5 + 4,
            },
            {
              key: 'text5',
              width: '100%',
              height: 13,
              borderRadius: 13,
              marginTop: MarginsPaddings.mp_5 + 4,
              marginBottom: 4,
            },
            {
              key: 'text6',
              width: '34%',
              height: 13,
              borderRadius: 13,
              marginTop: 4,
              marginBottom: MarginsPaddings.mp_5 + 4,
            },
            {
              key: 'text7',
              width: '100%',
              height: 13,
              borderRadius: 13,
              marginTop: MarginsPaddings.mp_5 + 4,
              marginBottom: 4,
            },
            {
              key: 'text8',
              width: '34%',
              height: 13,
              borderRadius: 13,
              marginTop: 4,
              marginBottom: MarginsPaddings.mp_5 + 4,
            },
          ]}
        />
      )}
    </View>
  );
}

function InputMapboxGeocoding({
  mapboxAccessToken,
  url = 'https://api.mapbox.com/search/geocode/v6',
  language,
  limit = 10,
  disableReverseSearch,
  type = MapboxGeocodingType.Address,
  countryCodes,
  street,
  place,
  district,
  region,
  country,
  postcode,
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
  icon,
  placeholder = '123 Main Street, Quebec, Canada',
  descriptionText,
  disabled,
  error,
  label = 'Location',
  beforeLabel,
  afterLabel,
  labelOptional,
  onSearchChanged,
}: InputMapboxGeocodingProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>();
  const [provinces, setProvinces] = useState<iso3166.CountryInfo.Full | null>(
    null
  );
  const { height } = Dimensions.get('screen');

  const onChanged = (data: MapboxGeocodingFeature) => {
    setValue(getFeatureLabel(data));
    onSearchChanged?.(data, {
      country: getIsoCountry(data),
      province: getIsoProvince(data),
    });
  };

  const onCountryChangedAsync = async (iso: ISO31661AssignedEntry) => {
    const searchUrl = `${url}/forward`;
    const params = new URLSearchParams('');
    params.append('q', iso.name);
    params.append('types', MapboxGeocodingType.Country);
    params.append('limit', '1');
    params.append('access_token', mapboxAccessToken);

    if (countryCodes) {
      params.append('country', countryCodes.join(','));
    }

    if (language) {
      params.append('language', language);
    }

    try {
      const response = await fetch(`${searchUrl}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MapboxGeocodingResponse = await response.json();
      if (data.features.length === 0) {
        console.log('No results found');
        return;
      }
      setValue(iso.name);
      onSearchChanged?.(data.features[0], {
        country: iso,
      });
    } catch (error) {
      console.error('Error fetching data, ', error);
    }
  };

  const onProvinceChangedAsync = async (iso: iso3166.SubdivisionInfo.Full) => {
    const searchUrl = `${url}/forward`;
    const params = new URLSearchParams('');
    params.append('q', iso.name);
    params.append('types', MapboxGeocodingType.Region);
    params.append('limit', '1');
    params.append('access_token', mapboxAccessToken);

    if (countryCodes) {
      params.append('country', countryCodes.join(','));
    } else if (iso.countryCode) {
      params.append('country', iso.countryCode.toLowerCase());
    }

    if (language) {
      params.append('language', language);
    }

    try {
      const response = await fetch(`${searchUrl}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MapboxGeocodingResponse = await response.json();
      if (data.features.length === 0) {
        console.log('No results found');
        return;
      }
      setValue(iso.name);
      onSearchChanged?.(data.features[0], {
        country: iso31661.find(
          (item) => item.alpha2 === iso.countryCode?.toUpperCase()
        ),
        province: iso,
      });
    } catch (error) {
      console.error('Error fetching data, ', error);
    }
  };

  useEffect(() => {
    if (value || disableReverseSearch || !defaultCoordinates) {
      return;
    }

    const updateLocationAsync = async () => {
      try {
        const params = new URLSearchParams('');
        params.append('longitude', defaultCoordinates.longitude.toString());
        params.append('latitude', defaultCoordinates.latitude.toString());
        params.append('types', type);
        params.append('limit', '1');
        params.append('access_token', mapboxAccessToken);

        if (language) {
          params.append('language', language);
        }

        const response = await fetch(`${url}/reverse?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: MapboxGeocodingResponse = await response.json();
        if (data.features.length === 0) {
          console.log('No results found');
          return;
        }

        const feature = data.features[0];
        setValue(getFeatureLabel(feature));
        onSearchChanged?.(feature, {
          country: getIsoCountry(feature),
          province: getIsoProvince(feature),
        });
      } catch (error: any) {
        console.error(error);
      }
    };

    updateLocationAsync();
  }, [
    url,
    defaultCoordinates,
    mapboxAccessToken,
    language,
    type,
    disableReverseSearch,
    value,
    onSearchChanged,
  ]);

  useEffect(() => {
    if (street && type === MapboxGeocodingType.Street) {
      setValue(street);
    }

    if (place && type === MapboxGeocodingType.Place) {
      setValue(place);
    }

    if (district && type === MapboxGeocodingType.District) {
      setValue(district);
    }

    if (region && type === MapboxGeocodingType.Region) {
      setValue(region);
    }

    if (country && type === MapboxGeocodingType.Country) {
      setValue(country);
    }

    if (country) {
      setProvinces(iso3166.country(country ?? ''));
    }
  }, [street, place, district, region, country, type]);

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
      {type !== MapboxGeocodingType.Country &&
        type !== MapboxGeocodingType.Region && (
          <BottomSheet
            id={'input-mapbox-geocoding-search'}
            open={open}
            onClose={() => setOpen(false)}
            defaultSheetHeight={height * 0.6}
            customStyles={{
              root: {
                paddingBottom: MarginsPaddings.mp_5,
              },
              ...customExtraStyles.bottomSheet,
            }}
            customLightStyles={customExtraLightStyles.bottomSheet}
            customDarkStyles={customExtraDarkStyles.bottomSheet}
          >
            <BottomSheet.ScrollView>
              <InputMapboxGeocodingSearch
                customStyles={customStyles}
                customLightStyles={customLightStyles}
                customDarkStyles={customDarkStyles}
                customExtraStyles={customExtraStyles}
                customExtraLightStyles={customExtraLightStyles}
                customExtraDarkStyles={customExtraDarkStyles}
                mapboxAccessToken={mapboxAccessToken}
                url={url}
                language={language}
                limit={limit}
                type={type}
                countryCodes={countryCodes}
                street={street}
                place={place}
                district={district}
                region={region}
                country={country}
                postcode={postcode}
                defaultCoordinates={defaultCoordinates}
                strings={strings}
                onChanged={onChanged}
                onClose={() => setOpen(false)}
              />
            </BottomSheet.ScrollView>
          </BottomSheet>
        )}
      {type === MapboxGeocodingType.Country && (
        <BottomSheet
          id={'input-mapbox-geocoding-countries'}
          open={open}
          onClose={() => setOpen(false)}
          defaultSheetHeight={height * 0.6}
          customStyles={{
            root: {
              paddingBottom: MarginsPaddings.mp_5,
            },
            ...customExtraStyles.bottomSheet,
          }}
          customLightStyles={customExtraLightStyles.bottomSheet}
          customDarkStyles={customExtraDarkStyles.bottomSheet}
        >
          <BottomSheet.FlatList
            data={iso31661}
            renderItem={({ item }) => (
              <BottomSheet.Item
                customStyles={customExtraStyles?.bottomSheetItem}
                customDarkStyles={customExtraDarkStyles?.bottomSheetItem}
                customLightStyles={customExtraLightStyles?.bottomSheetItem}
                customExtraDarkStyles={
                  customExtraDarkStyles?.extraBottomSheetItem
                }
                customExtraLightStyles={
                  customExtraLightStyles?.extraBottomSheetItem
                }
                customExtraStyles={customExtraStyles?.extraBottomSheetItem}
                key={item.name}
                icon={
                  <CountryFlag
                    isoCode={item.alpha2.toUpperCase() ?? 'ca'}
                    size={21}
                  />
                }
                onPress={() => {
                  onCountryChangedAsync(item);
                  setOpen(false);
                }}
              >
                {item.name}
              </BottomSheet.Item>
            )}
          />
        </BottomSheet>
      )}
      {type === MapboxGeocodingType.Region && (
        <BottomSheet
          id={'input-mapbox-geocoding-states'}
          open={open}
          onClose={() => setOpen(false)}
          defaultSheetHeight={height * 0.6}
          customStyles={{
            root: {
              paddingBottom: MarginsPaddings.mp_5,
            },
            ...customExtraStyles.bottomSheet,
          }}
          customLightStyles={customExtraLightStyles.bottomSheet}
          customDarkStyles={customExtraDarkStyles.bottomSheet}
        >
          <BottomSheet.FlatList
            data={Object.values(provinces?.sub ?? {})}
            renderItem={({ item }) => (
              <BottomSheet.Item
                customStyles={customExtraStyles?.bottomSheetItem}
                customDarkStyles={customExtraDarkStyles?.bottomSheetItem}
                customLightStyles={customExtraLightStyles?.bottomSheetItem}
                customExtraDarkStyles={
                  customExtraDarkStyles?.extraBottomSheetItem
                }
                customExtraLightStyles={
                  customExtraLightStyles?.extraBottomSheetItem
                }
                customExtraStyles={customExtraStyles?.extraBottomSheetItem}
                key={item.name}
                onPress={() => {
                  const key = Object.keys(provinces?.sub ?? {}).find(
                    (subKey) => provinces?.sub[subKey].name === item.name
                  );
                  const subdivision = iso3166.subdivision(key ?? '');
                  if (subdivision) {
                    onProvinceChangedAsync(subdivision);
                  }

                  setOpen(false);
                }}
              >
                {item.name}
              </BottomSheet.Item>
            )}
          />
        </BottomSheet>
      )}
    </>
  );
}

export interface MapboxAddressFormStyles {
  root?: ViewStyle;
  horizontalContainer?: ViewStyle;
}

export interface ExtraMapboxAddressFormStyles {
  inputMapboxGeocoding?: InputMapboxGeocodingStyles;
  extraInputMapboxGeocoding?: ExtraInputMapboxGeocodingStyles;
  input?: InputStyles;
  extraInput?: ExtraInputStyles;
}

export interface MapboxAddressFormProps {
  mapboxAccessToken: string;
  url?: string;
  language?: string;
  strings?: {
    country?: string;
    region?: string;
    place?: string;
    street?: string;
    civic?: string;
    postcode?: string;
  };
  defaultCoordinates?: {
    latitude: number;
    longitude: number;
  };
  value?: {
    country?: string;
    region?: string;
    place?: string;
    street?: string;
    civic?: string;
    postcode?: string;
  };
  placeholder?: {
    country?: string;
    region?: string;
    place?: string;
    street?: string;
    civic?: string;
    postcode?: string;
  };
  error?: {
    country?: string;
    region?: string;
    place?: string;
    street?: string;
    civic?: string;
    postcode?: string;
  };
  customStyles?: MapboxAddressFormStyles;
  customLightStyles?: MapboxAddressFormStyles;
  customDarkStyles?: MapboxAddressFormStyles;
  customExtraStyles?: ExtraMapboxAddressFormStyles;
  customExtraDarkStyles?: ExtraMapboxAddressFormStyles;
  customExtraLightStyles?: ExtraMapboxAddressFormStyles;
  onSearchChanged?: (
    search: MapboxGeocodingFeature,
    iso: {
      country?: ISO31661AssignedEntry;
      province?: iso3166.SubdivisionInfo.Full | null;
    }
  ) => void;
  onCountryChanged?: (
    search: MapboxGeocodingFeature,
    iso: {
      country?: ISO31661AssignedEntry;
      province?: iso3166.SubdivisionInfo.Full | null;
    }
  ) => void;
  onRegionChanged?: (
    search: MapboxGeocodingFeature,
    iso: {
      country?: ISO31661AssignedEntry;
      province?: iso3166.SubdivisionInfo.Full | null;
    }
  ) => void;
  onPlaceChanged?: (
    search: MapboxGeocodingFeature,
    iso: {
      country?: ISO31661AssignedEntry;
      province?: iso3166.SubdivisionInfo.Full | null;
    }
  ) => void;
  onStreetChanged?: (
    search: MapboxGeocodingFeature,
    iso: {
      country?: ISO31661AssignedEntry;
      province?: iso3166.SubdivisionInfo.Full | null;
    }
  ) => void;
  onCivicChanged?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onPostcodeChanged?: (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => void;
}

const addressFormStyles = StyleSheet.create<MapboxAddressFormStyles>({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  horizontalContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: MarginsPaddings.mp_5,
  },
});
const addressFormLightStyles = StyleSheet.create<MapboxAddressFormStyles>({});
const addressFormDarkStyles = StyleSheet.create<MapboxAddressFormStyles>({});

function MapboxAddressForm({
  mapboxAccessToken,
  url = 'https://api.mapbox.com/search/geocode/v6',
  language,
  defaultCoordinates,
  value,
  strings = {
    country: 'Country',
    region: 'State / Province',
    place: 'City',
    street: 'Street',
    civic: 'Civic',
    postcode: 'Postal code',
  },
  placeholder = {
    country: 'Canada',
    region: 'Quebec',
    place: 'Montreal',
    street: 'Peel',
    civic: '123',
    postcode: 'A1B 2C3',
  },
  error,
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  customExtraStyles = {},
  customExtraDarkStyles = {},
  customExtraLightStyles = {},
  onSearchChanged,
  onCountryChanged,
  onRegionChanged,
  onPlaceChanged,
  onStreetChanged,
  onCivicChanged,
  onPostcodeChanged,
}: MapboxAddressFormProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [reverseResult, setReverseResult] = useState<
    MapboxGeocodingFeature | undefined
  >(undefined);
  const [countryValue, setCountryValue] = useState<string | undefined>(
    value?.country
  );
  const [regionValue, setRegionValue] = useState<string | undefined>(
    value?.region
  );
  const [placeValue, setPlaceValue] = useState<string | undefined>(
    value?.place
  );
  const [streetValue, setStreetValue] = useState<string | undefined>(
    value?.street
  );
  const [civicValue, setCivicValue] = useState<string | undefined>(
    value?.civic
  );
  const [postcodeValue, setPostcodeValue] = useState<string | undefined>(
    value?.postcode
  );

  useEffect(() => {
    if (
      reverseResult ||
      !defaultCoordinates ||
      (value &&
        Object.values<string | undefined>(value).filter(
          (item) => item === undefined
        ).length !== Object.keys(value).length)
    ) {
      return;
    }

    const updateLocationAsync = async () => {
      try {
        const params = new URLSearchParams('');
        params.append('longitude', defaultCoordinates.longitude.toString());
        params.append('latitude', defaultCoordinates.latitude.toString());
        params.append('types', MapboxGeocodingType.Address);
        params.append('limit', '1');
        params.append('access_token', mapboxAccessToken);

        if (language) {
          params.append('language', language);
        }

        const response = await fetch(`${url}/reverse?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: MapboxGeocodingResponse = await response.json();
        if (data.features.length === 0) {
          console.log('No results found');
          return;
        }

        const feature = data.features[0];
        const context = feature.properties.context;
        const countryName = context.country?.name;
        const civic = context.address?.address_number;
        const postcodeName = context.postcode?.name;
        const placeName = context.place?.name ?? context.locality?.name;
        const streetName = context.address?.street_name ?? context.street?.name;
        const regionName = context.region?.name;
        setReverseResult(feature);
        setCountryValue(countryName);
        setRegionValue(regionName);
        setPlaceValue(placeName);
        setStreetValue(streetName);
        setCivicValue(civic);
        setPostcodeValue(postcodeName);
        onSearchChanged?.(feature, {
          country: getIsoCountry(feature),
          province: getIsoProvince(feature),
        });
      } catch (error: any) {
        console.error(error);
      }
    };

    updateLocationAsync();
  }, [
    defaultCoordinates,
    mapboxAccessToken,
    language,
    value,
    url,
    reverseResult,
    onSearchChanged,
  ]);

  return (
    <View
      style={[
        ...(isDarkTheme
          ? [
              {
                ...addressFormDarkStyles?.root,
                ...(customDarkStyles?.root ?? {}),
              },
            ]
          : [
              {
                ...addressFormLightStyles?.root,
                ...(customLightStyles?.root ?? {}),
              },
            ]),
        { ...addressFormStyles.root, ...(customStyles?.root ?? {}) },
      ]}
    >
      <InputMapboxGeocoding
        mapboxAccessToken={mapboxAccessToken}
        url={url}
        language={language}
        type={MapboxGeocodingType.Country}
        country={value?.country ?? countryValue}
        label={strings.country}
        disableReverseSearch={true}
        customStyles={customExtraStyles.inputMapboxGeocoding}
        customLightStyles={customExtraLightStyles.inputMapboxGeocoding}
        customDarkStyles={customExtraDarkStyles.inputMapboxGeocoding}
        customExtraStyles={customExtraStyles.extraInputMapboxGeocoding}
        customExtraLightStyles={
          customExtraLightStyles.extraInputMapboxGeocoding
        }
        customExtraDarkStyles={customExtraDarkStyles.extraInputMapboxGeocoding}
        placeholder={placeholder?.country}
        error={error?.country}
        onSearchChanged={onCountryChanged}
      />
      <InputMapboxGeocoding
        mapboxAccessToken={mapboxAccessToken}
        url={url}
        language={language}
        type={MapboxGeocodingType.Region}
        country={value?.country ?? countryValue}
        region={value?.region ?? regionValue}
        label={strings.region}
        disableReverseSearch={true}
        customStyles={customExtraStyles.inputMapboxGeocoding}
        customLightStyles={customExtraLightStyles.inputMapboxGeocoding}
        customDarkStyles={customExtraDarkStyles.inputMapboxGeocoding}
        customExtraStyles={customExtraStyles.extraInputMapboxGeocoding}
        customExtraLightStyles={
          customExtraLightStyles.extraInputMapboxGeocoding
        }
        customExtraDarkStyles={customExtraDarkStyles.extraInputMapboxGeocoding}
        placeholder={placeholder?.region}
        error={error?.region}
        onSearchChanged={onRegionChanged}
      />
      <InputMapboxGeocoding
        mapboxAccessToken={mapboxAccessToken}
        url={url}
        language={language}
        type={MapboxGeocodingType.Place}
        country={value?.country ?? countryValue}
        region={value?.region ?? regionValue}
        place={value?.place ?? placeValue}
        label={strings.place}
        disableReverseSearch={true}
        customStyles={customExtraStyles.inputMapboxGeocoding}
        customLightStyles={customExtraLightStyles.inputMapboxGeocoding}
        customDarkStyles={customExtraDarkStyles.inputMapboxGeocoding}
        customExtraStyles={customExtraStyles.extraInputMapboxGeocoding}
        customExtraLightStyles={
          customExtraLightStyles.extraInputMapboxGeocoding
        }
        customExtraDarkStyles={customExtraDarkStyles.extraInputMapboxGeocoding}
        placeholder={placeholder?.place}
        error={error?.place}
        onSearchChanged={onPlaceChanged}
      />
      <InputMapboxGeocoding
        mapboxAccessToken={mapboxAccessToken}
        url={url}
        language={language}
        type={MapboxGeocodingType.Street}
        country={value?.country ?? countryValue}
        region={value?.region ?? regionValue}
        place={value?.place ?? placeValue}
        street={value?.street ?? streetValue}
        label={strings.street}
        disableReverseSearch={true}
        customStyles={customExtraStyles.inputMapboxGeocoding}
        customLightStyles={customExtraLightStyles.inputMapboxGeocoding}
        customDarkStyles={customExtraDarkStyles.inputMapboxGeocoding}
        customExtraStyles={customExtraStyles.extraInputMapboxGeocoding}
        customExtraLightStyles={
          customExtraLightStyles.extraInputMapboxGeocoding
        }
        customExtraDarkStyles={customExtraDarkStyles.extraInputMapboxGeocoding}
        placeholder={placeholder?.street}
        error={error?.street}
        onSearchChanged={onStreetChanged}
      />
      <View
        style={[
          ...(isDarkTheme
            ? [
                {
                  ...addressFormDarkStyles?.horizontalContainer,
                  ...(customDarkStyles?.horizontalContainer ?? {}),
                },
              ]
            : [
                {
                  ...addressFormLightStyles?.horizontalContainer,
                  ...(customLightStyles?.horizontalContainer ?? {}),
                },
              ]),
          {
            ...addressFormStyles.horizontalContainer,
            ...(customStyles?.horizontalContainer ?? {}),
          },
        ]}
      >
        <Input
          type={'number-pad'}
          label={strings.civic}
          customStyles={customExtraStyles.input}
          customLightStyles={customExtraLightStyles.input}
          customDarkStyles={customExtraDarkStyles.input}
          customExtraStyles={customExtraStyles.extraInput}
          customExtraLightStyles={customExtraLightStyles.extraInput}
          customExtraDarkStyles={customExtraDarkStyles.extraInput}
          placeholder={placeholder?.civic}
          error={error?.civic}
          value={value?.civic ?? civicValue}
          onChange={onCivicChanged}
        />
        <Input
          type={'default'}
          label={strings.postcode}
          customStyles={customExtraStyles.input}
          customLightStyles={customExtraLightStyles.input}
          customDarkStyles={customExtraDarkStyles.input}
          customExtraStyles={customExtraStyles.extraInput}
          customExtraLightStyles={customExtraLightStyles.extraInput}
          customExtraDarkStyles={customExtraDarkStyles.extraInput}
          placeholder={placeholder?.postcode}
          error={error?.postcode}
          value={value?.postcode ?? postcodeValue}
          onChange={onPostcodeChanged}
          textInputProps={{
            maxLength: 7,
            autoCapitalize: 'characters',
          }}
        />
      </View>
    </View>
  );
}

InputMapboxGeocoding.AddressForm = MapboxAddressForm;

export default InputMapboxGeocoding;
