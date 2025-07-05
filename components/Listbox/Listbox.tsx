import {
  GestureResponderEvent,
  ListRenderItem,
  StyleSheet,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { BottomSheet, BottomSheetStyles } from '../BottomSheet';
import { FormLayout, FormLayoutStyles } from '../FormLayout';
// import { ArrowDropDown } from '../Icon/Icons/Line';
import React from 'react';
import { Button } from '../Button';
import { ArrowDropDown } from '../Icon/Icons/Line';
import { Colors, Globals, MarginsPaddings } from '../Themes';
import { TypographyStyles } from '../Typography';

export interface ListboxProps {
  id?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
  label?: string;
  labelOptional?: string;
  descriptionText?: string;
  error?: string;
  snapPoints?: string[];
  customStyles?: ListboxStyles;
  customLightStyles?: ListboxStyles;
  customDarkStyles?: ListboxStyles;
  customExtraStyles?: ExtraListboxStyles;
  customExtraLightStyles?: ExtraListboxStyles;
  customExtraDarkStyles?: ExtraListboxStyles;
  data?: ArrayLike<any> | null;
  renderBottomSheetItem?: ListRenderItem<any> | null;
  keyExtractor?: ((item: any, index: number) => string) | undefined;
  onOpen?: (event: GestureResponderEvent) => void;
  onClose?: () => void;
}

export interface ListboxStyles {
  listboxContainer?: ViewStyle;
  listbox?: ViewStyle;
  container?: ViewStyle;
  listboxButton?: ViewStyle;
  iconContainer?: ViewStyle;
  chevronContainer?: ViewStyle;
}

export interface ExtraListboxStyles {
  button?: ButtonStyles;
  formLayout?: FormLayoutStyles;
  bottomSheet?: BottomSheetStyles;
  label?: TypographyStyles;
}

const styles = StyleSheet.create<ListboxStyles>({
  listboxContainer: {
    position: 'relative',
    width: '100%',
  },
  listboxButton: {
    display: 'flex',
    overflow: 'hidden',
    paddingTop: MarginsPaddings.mp_4,
    paddingBottom: MarginsPaddings.mp_4,
    width: '100%',
    borderRadius: Globals.rounded_md,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: MarginsPaddings.mp_4,
    marginRight: MarginsPaddings.mp_4,
  },
  listbox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
  chevronContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: MarginsPaddings.mp_3,
  },
});
const lightStyles = StyleSheet.create<ListboxStyles>({
  listboxButton: {
    backgroundColor: Colors.gray_100,
  },
});
const darkStyles = StyleSheet.create<ListboxStyles>({});

function Listbox({
  id,
  open = false,
  children,
  icon,
  label,
  labelOptional,
  descriptionText,
  error,
  snapPoints,
  customStyles,
  customLightStyles,
  customDarkStyles,
  customExtraStyles,
  customExtraDarkStyles,
  customExtraLightStyles,
  data,
  renderBottomSheetItem,
  keyExtractor,
  onOpen,
  onClose,
}: ListboxProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  return (
    <View style={[{ position: 'relative', flexShrink: 1, width: '100%' }]}>
      <FormLayout
        label={label}
        labelOptional={labelOptional}
        error={error}
        descriptionText={descriptionText}
        customStyles={customExtraStyles?.formLayout}
        customLightStyles={customExtraLightStyles?.formLayout}
        customDarkStyles={customExtraDarkStyles?.formLayout}
      >
        <Button
          customStyles={{
            ...customExtraStyles?.button,
            button: {
              ...styles.listboxButton,
              ...(customStyles?.listboxButton ?? {}),
            },
          }}
          customDarkStyles={{
            ...customExtraDarkStyles?.button,
            button: {
              ...darkStyles?.listboxButton,
              ...(customDarkStyles?.listboxButton ?? {}),
            },
          }}
          customLightStyles={{
            ...customExtraLightStyles?.button,
            button: {
              ...lightStyles?.listboxButton,
              ...(customLightStyles?.listboxButton ?? {}),
            },
          }}
          onPress={onOpen}
          icon={icon}
          iconRight={
            <ArrowDropDown size={21} color={isDarkTheme ? '#fff' : '#000'} />
          }
          size={'full'}
        >
          {children}
        </Button>
      </FormLayout>
      <BottomSheet
        customStyles={customExtraStyles?.bottomSheet}
        customDarkStyles={customExtraDarkStyles?.bottomSheet}
        customLightStyles={customExtraLightStyles?.bottomSheet}
        id={`language-switch-${id}`}
        type={'flat-list'}
        open={open}
        onClose={onClose}
        data={data}
        renderItem={renderBottomSheetItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

export default Listbox;
