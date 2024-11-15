import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Button, ButtonStyles } from '../Button';

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
  scrollView?: ViewStyle;
}

export interface ExtraTabsStyles {
  button?: ButtonStyles;
}

export interface TabsProps {
  defaultId?: string;
  tabs?: TabProps[];
  children?: React.ReactNode;
  customStyles?: TabsStyles;
  customLightStyles?: TabsStyles;
  customDarkStyles?: TabsStyles;
  customExtraStyles?: ExtraTabsStyles;
  customExtraDarkStyles?: ExtraTabsStyles;
  customExtraLightStyles?: ExtraTabsStyles;
  onChange?: (id: string) => void;
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
  scrollView: {},
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

const TabsContext = createContext<{ width: number }>({ width: 0 });

function Tabs({
  defaultId,
  tabs = [],
  children,
  customStyles,
  customDarkStyles,
  customLightStyles,
  customExtraStyles,
  customExtraLightStyles,
  customExtraDarkStyles,
  onChange,
}: TabsProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const scrollValue = useSharedValue(0);
  const [viewTranslatePoints, setViewTranslatePoints] = useState<number[]>([]);
  const [rootSize, setRootSize] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  }>({ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 });
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollValue.value = event.contentOffset.x;
    },
  });

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.floor(scrollX / rootSize.width);
    const tab = tabs.find((value, index) => index === selectedIndex);
    if (tab) {
      onChange?.(tab.id);
    }
  };

  const indicatorStyle = useAnimatedStyle(() => {
    if (viewTranslatePoints.length < 2) {
      return {};
    }
    return {
      transform: [
        {
          translateX: interpolate(
            scrollValue.value,
            tabs.map((value, index) => index * rootSize.width),
            viewTranslatePoints
          ),
        },
      ],
    };
  });

  const handleViewLayout = (event: LayoutChangeEvent, index: number) => {
    const { x } = event.nativeEvent.layout;
    const currentPoints = [...viewTranslatePoints];
    currentPoints[index] = x;
    setViewTranslatePoints(currentPoints);
  };

  useEffect(() => {
    const index = tabs.findIndex((value) => value.id === defaultId);
    scrollRef.current?.scrollTo({ x: rootSize.width * index }, 0, false);
  }, [defaultId, rootSize]);

  return (
    <TabsContext.Provider value={{ width: rootSize.width }}>
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
            setRootSize({ x, y, width, height, pageX, pageY })
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
            {tabs.map((value, index) => {
              return (
                <Animated.View
                  style={[
                    styles.tabItem,
                    customStyles?.tabItem ?? {},
                    ...(isDarkTheme
                      ? [darkStyles?.tabItem, customDarkStyles?.tabItem ?? {}]
                      : [
                          lightStyles?.tabItem,
                          customLightStyles?.tabItem ?? {},
                        ]),
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
                      scrollRef.current?.scrollTo(
                        { x: rootSize.width * index },
                        0,
                        true
                      );
                      onChange?.(value.id);
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
                width: rootSize.width / tabs.length,
              },
              styles.tabSlider,
              customStyles?.tabSlider ?? {},
              ...(isDarkTheme
                ? [darkStyles?.tabSlider, customDarkStyles?.tabSlider ?? {}]
                : [lightStyles?.tabSlider, customLightStyles?.tabSlider ?? {}]),
            ]}
          />
        </Animated.View>
        <Animated.ScrollView
          ref={scrollRef}
          onScroll={scrollHandler}
          onMomentumScrollEnd={onMomentumScrollEnd}
          pagingEnabled={true}
          horizontal={true}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          scrollToOverflowEnabled={true}
          snapToInterval={rootSize.width}
          style={[
            styles.scrollView,
            customStyles?.scrollView ?? {},
            ...(isDarkTheme
              ? [darkStyles?.scrollView, customDarkStyles?.scrollView ?? {}]
              : [lightStyles?.scrollView, customLightStyles?.scrollView ?? {}]),
          ]}
        >
          {children}
        </Animated.ScrollView>
      </View>
    </TabsContext.Provider>
  );
}

export interface TabsItemStyles {
  root?: ViewStyle;
}

export interface ExtraTabItemsStyles {}

export interface TabsItemProps {
  children?: React.ReactNode;
  customStyles?: TabsItemStyles;
  customLightStyles?: TabsItemStyles;
  customDarkStyles?: TabsItemStyles;
}

function TabsItem({
  children,
  customStyles,
  customDarkStyles,
  customLightStyles,
}: TabsItemProps) {
  const tabsContext = useContext(TabsContext);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  return (
    <Animated.View
      style={[
        customStyles?.root ?? {},
        ...(isDarkTheme
          ? [customDarkStyles?.root ?? {}]
          : [customLightStyles?.root ?? {}]),
        { width: tabsContext.width },
      ]}
    >
      {children}
    </Animated.View>
  );
}

Tabs.Item = TabsItem;

export default Tabs;
