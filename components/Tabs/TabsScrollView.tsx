/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { TabsContext } from './TabsProvider';

export interface TabsScrollViewStyles {
  scrollView?: ViewStyle;
}

export interface ExtraTabScrollViewStyles {}

export interface TabsScrollViewProps {
  children?: React.ReactNode;
  customStyles?: TabsScrollViewStyles;
  customLightStyles?: TabsScrollViewStyles;
  customDarkStyles?: TabsScrollViewStyles;
}

const styles = StyleSheet.create<TabsScrollViewStyles>({
  scrollView: {},
});
const lightStyles = StyleSheet.create<TabsScrollViewStyles>({});
const darkStyles = StyleSheet.create<TabsScrollViewStyles>({});

function TabsScrollView({
  children,
  customStyles,
  customDarkStyles,
  customLightStyles,
}: TabsScrollViewProps) {
  const tabsContext = useContext(TabsContext);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (!tabsContext.scrollValue) {
        return;
      }

      tabsContext.scrollValue.value = event.contentOffset.x;
    },
  });

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.floor(scrollX / tabsContext.rootSize.width);
    const tab = tabsContext.tabs.find(
      (value, index) => index === selectedIndex
    );
    if (tab) {
      tabsContext.onChange?.(tab.id);
    }
  };

  return (
    <Animated.ScrollView
      ref={tabsContext.scrollRef}
      onScroll={scrollHandler}
      onMomentumScrollEnd={onMomentumScrollEnd}
      pagingEnabled={true}
      horizontal={true}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      scrollToOverflowEnabled={true}
      snapToInterval={tabsContext.rootSize.width}
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
  );
}

export interface TabsScrollViewItemStyles {
  root?: ViewStyle;
}

export interface ExtraTabScrollViewItemsStyles {}

export interface TabsScrollViewItemProps {
  children?: React.ReactNode;
  customStyles?: TabsScrollViewItemStyles;
  customLightStyles?: TabsScrollViewItemStyles;
  customDarkStyles?: TabsScrollViewItemStyles;
}

function TabsScrollViewItem({
  children,
  customStyles,
  customDarkStyles,
  customLightStyles,
}: TabsScrollViewItemProps) {
  const tabsContext = useContext(TabsContext);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (tabsContext.rootSize.width > 0) {
      opacity.value = withTiming(1, {
        duration: 75,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    }
  }, [tabsContext.rootSize]);

  return (
    <Animated.View
      style={[
        customStyles?.root ?? {},
        ...(isDarkTheme
          ? [customDarkStyles?.root ?? {}]
          : [customLightStyles?.root ?? {}]),
        { width: tabsContext.rootSize.width },
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
}

TabsScrollView.Item = TabsScrollViewItem;

export default TabsScrollView;
