/* eslint-disable react/react-in-jsx-scope */
import {
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { Button, ButtonStyles } from '../Button';
import Animated from 'react-native-reanimated';
import { useContext } from 'react';
import { TabsContext } from './TabsProvider';

export interface TabProps {
  id: string;
  label?: string;
  icon?: React.ReactNode;
}

export interface TabsStyles {
  root?: ViewStyle;
  topBar?: ViewStyle;
  tabList?: ViewStyle;
  tabItem?: ViewStyle;
  tabText?: TextStyle;
  tabSlider?: ViewStyle;
}

export interface ExtraTabsStyles {
  button?: ButtonStyles;
}

export interface TabsProps {
  customStyles?: TabsStyles;
  customLightStyles?: TabsStyles;
  customDarkStyles?: TabsStyles;
  customExtraStyles?: ExtraTabsStyles;
  customExtraDarkStyles?: ExtraTabsStyles;
  customExtraLightStyles?: ExtraTabsStyles;
}

const styles = StyleSheet.create<TabsStyles>({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    position: 'relative',
  },
  tabList: {
    display: 'flex',
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
  },
  tabText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  tabSlider: {
    position: 'absolute',
    bottom: 0,
    height: 2,
  },
});
const lightStyles = StyleSheet.create<TabsStyles>({
  tabSlider: {
    backgroundColor: '#000',
  },
});
const darkStyles = StyleSheet.create<TabsStyles>({
  tabSlider: {
    backgroundColor: '#fff',
  },
});

function Tabs({
  customStyles,
  customDarkStyles,
  customLightStyles,
  customExtraStyles,
  customExtraLightStyles,
  customExtraDarkStyles,
}: TabsProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const tabsContext = useContext(TabsContext);

  return (
    <View
      style={[
        styles.root,
        customStyles?.root ?? {},
        ...(isDarkTheme
          ? [darkStyles?.root, customDarkStyles?.root ?? {}]
          : [lightStyles?.root, customLightStyles?.root ?? {}]),
      ]}
      onLayout={(event) => {
        event.currentTarget.measure((x, y, width, height, pageX, pageY) =>
          tabsContext.setRootSize?.({ x, y, width, height, pageX, pageY })
        );
      }}
    >
      <Animated.View
        style={[
          styles.topBar,
          customStyles?.topBar ?? {},
          ...(isDarkTheme
            ? [darkStyles?.topBar, customDarkStyles?.topBar ?? {}]
            : [lightStyles?.topBar, customLightStyles?.topBar ?? {}]),
        ]}
      >
        <View
          style={[
            styles.tabList,
            customStyles?.tabList ?? {},
            ...(isDarkTheme
              ? [darkStyles?.tabList, customDarkStyles?.tabList ?? {}]
              : [lightStyles?.tabList, customLightStyles?.tabList ?? {}]),
          ]}
        >
          {tabsContext.tabs.map((value, index) => {
            return (
              <Animated.View
                style={[
                  styles.tabItem,
                  customStyles?.tabItem ?? {},
                  ...(isDarkTheme
                    ? [darkStyles?.tabItem, customDarkStyles?.tabItem ?? {}]
                    : [lightStyles?.tabItem, customLightStyles?.tabItem ?? {}]),
                ]}
                onLayout={(e) => tabsContext.handleViewLayout?.(e, index)}
                key={value.id}
              >
                <Button
                  customStyles={customExtraStyles?.button}
                  customDarkStyles={customExtraDarkStyles?.button}
                  customLightStyles={customExtraLightStyles?.button}
                  block={true}
                  type={'text'}
                  size={'full'}
                  icon={value.icon}
                  onPress={() => {
                    tabsContext.scrollRef?.current?.scrollTo({
                      x: tabsContext.rootSize?.width * index,
                      y: 0,
                      animated: true,
                    });
                    tabsContext.onChange?.(value.id);
                  }}
                >
                  {value.label}
                </Button>
              </Animated.View>
            );
          })}
        </View>
        <Animated.View
          style={[
            tabsContext.indicatorStyle,
            {
              width: tabsContext.rootSize.width / tabsContext.tabs.length,
            },
            styles.tabSlider,
            customStyles?.tabSlider ?? {},
            ...(isDarkTheme
              ? [darkStyles?.tabSlider, customDarkStyles?.tabSlider ?? {}]
              : [lightStyles?.tabSlider, customLightStyles?.tabSlider ?? {}]),
          ]}
        />
      </Animated.View>
    </View>
  );
}

export default Tabs;
