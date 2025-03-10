import React, { createContext, useEffect, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Animated, {
  AnimatedRef,
  ScrollHandlerProcessed,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { TabProps } from './Tabs';

export const TabsContext = createContext<{
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
  scrollValue?: SharedValue<number>;
  scrollHandler?: ScrollHandlerProcessed<Record<string, unknown>>;
  onMomentumScrollEnd?: (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => void;
  onChange?: (id: string) => void;
}>({
  tabs: [],
  rootSize: { x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 },
});

export interface TabsProviderProps {
  id?: string;
  tabs?: TabProps[];
  children?: React.ReactNode;
  onChange?: (id: string) => void;
}

function TabsProvider({
  id,
  tabs = [],
  children,
  onChange,
}: TabsProviderProps) {
  const scrollValue = useSharedValue(0);

  const [rootSize, setRootSize] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  }>({ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 });
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  useEffect(() => {
    const index = tabs.findIndex((value) => value.id === id);
    const scrollPosition = rootSize.width * index;
    if (scrollValue.value !== scrollPosition) {
      scrollRef.current?.scrollTo({
        x: rootSize.width * index,
        y: 0,
        animated: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, rootSize, scrollRef, tabs]);

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

  useEffect(() => {
    const index = tabs.findIndex((value) => value.id === id);
    const scrollPosition = rootSize.width * index;
    if (scrollValue.value !== scrollPosition) {
      scrollRef.current?.scrollTo({
        x: rootSize.width * index,
        y: 0,
        animated: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, rootSize, scrollRef, tabs]);

  return (
    <TabsContext.Provider
      value={{
        tabs: tabs,
        rootSize: rootSize,
        scrollRef: scrollRef,
        scrollValue: scrollValue,
        setRootSize: setRootSize,
        scrollHandler: scrollHandler,
        onMomentumScrollEnd: onMomentumScrollEnd,
        onChange: onChange,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}

export default TabsProvider;
