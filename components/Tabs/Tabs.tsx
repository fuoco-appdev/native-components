/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/react-in-jsx-scope */
import {
  LayoutChangeEvent,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { Button, ButtonStyles } from '../Button';
import Animated, {
  AnimatedRef,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useContext, useState } from 'react';
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
  context?: {
    tabs: TabProps[];
    rootSize: {
      x: number;
      y: number;
      width: number;
      height: number;
      pageX: number;
      pageY: number;
    };
    setRootSize?: (value: {
      x: number;
      y: number;
      width: number;
      height: number;
      pageX: number;
      pageY: number;
    }) => void;
    scrollRef?: AnimatedRef<Animated.ScrollView>;
    onChange?: (id: string) => void;
  };
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
  context,
  customStyles,
  customDarkStyles,
  customLightStyles,
  customExtraStyles,
  customExtraLightStyles,
  customExtraDarkStyles,
}: TabsProps) {
  const [viewTranslatePoints, setViewTranslatePoints] = useState<number[]>([]);
  const tabsContext = context
    ? {
        ...context,
        tabs: context.tabs ?? [],
        rootSize: context.rootSize ?? {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          pageX: 0,
          pageY: 0,
        },
      }
    : useContext(TabsContext);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const handleViewLayout = (event: LayoutChangeEvent, index: number) => {
    const { x } = event.nativeEvent.layout;
    const currentPoints = [...viewTranslatePoints];
    currentPoints[index] = x;
    setViewTranslatePoints(currentPoints);
  };

  const indicatorStyle = useAnimatedStyle(() => {
    if (viewTranslatePoints.length < 2) {
      return {};
    }
    return {
      transform: [
        {
          translateX: interpolate(
            tabsContext.scrollValue?.value ?? 0,
            tabsContext.tabs.map(
              (value, index) => index * tabsContext.rootSize.width
            ),
            viewTranslatePoints
          ),
        },
      ],
    };
  });

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
        event.currentTarget.measure(
          (x, y, width, height, pageX, pageY) =>
            tabsContext.setRootSize &&
            tabsContext.setRootSize({
              x,
              y,
              width,
              height,
              pageX,
              pageY,
            })
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
                onLayout={(e) => handleViewLayout(e, index)}
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
                    tabsContext.scrollRef?.current?.scrollTo &&
                      tabsContext.scrollRef.current.scrollTo({
                        x: tabsContext.rootSize?.width * index,
                        y: 0,
                        animated: true,
                      });
                    tabsContext.onChange && tabsContext.onChange(value.id);
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
            indicatorStyle,
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
