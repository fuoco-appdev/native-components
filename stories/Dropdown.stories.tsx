/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/react-in-jsx-scope */
import type { Meta, StoryObj } from '@storybook/react';
import { MoreVert, Edit, Delete } from '../components/Icon/Icons/Line';
import Button from '../components/Button/Button';
import Dropdown, { DropdownAlignment } from '../components/Dropdown/Dropdown';
import { PortalProvider } from '../components/Portal';
import { useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LayoutRectangle, SafeAreaView, View } from 'react-native';

const meta = {
  title: 'General/Dropdown',
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isLeftOpen, setIsLeftOpen] = useState<boolean>(false);
    const [isRightOpen, setIsRightOpen] = useState<boolean>(false);
    const [isCenterOpen, setIsCenterOpen] = useState<boolean>(false);
    const [isRightAlignedOpen, setIsRightAlignedOpen] =
      useState<boolean>(false);
    const [isBottomOpen, setIsBottomOpen] = useState<boolean>(false);
    const [leftAnchorLayout, setLeftAnchorLayout] = useState<{
      x: number;
      y: number;
      width: number;
      height: number;
      pageX: number;
      pageY: number;
    }>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      pageX: 0,
      pageY: 0,
    });
    const [rightAnchorLayout, setRightAnchorLayout] = useState<{
      x: number;
      y: number;
      width: number;
      height: number;
      pageX: number;
      pageY: number;
    }>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      pageX: 0,
      pageY: 0,
    });
    const [rightAlignedAnchorLayout, setRightAlignedAnchorLayout] = useState<{
      x: number;
      y: number;
      width: number;
      height: number;
      pageX: number;
      pageY: number;
    }>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      pageX: 0,
      pageY: 0,
    });
    const [centerAnchorLayout, setCenterAnchorLayout] = useState<{
      x: number;
      y: number;
      width: number;
      height: number;
      pageX: number;
      pageY: number;
    }>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      pageX: 0,
      pageY: 0,
    });
    const [bottomLayout, setBottomLayout] = useState<{
      x: number;
      y: number;
      width: number;
      height: number;
      pageX: number;
      pageY: number;
    }>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      pageX: 0,
      pageY: 0,
    });
    return (
      <GestureHandlerRootView>
        <PortalProvider>
          <View
            style={[
              {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              },
            ]}
          >
            <Button
              onLayout={(event) =>
                event.currentTarget.measure(
                  (x, y, width, height, pageX, pageY) => {
                    setLeftAnchorLayout({
                      x,
                      y,
                      width,
                      height,
                      pageX,
                      pageY,
                    });
                  }
                )
              }
              icon={<MoreVert size={21} color={'#fff'} />}
              rounded={true}
              type={'primary'}
              onPress={() => setIsLeftOpen(true)}
            />
            <Button
              onLayout={(event) =>
                event.currentTarget.measure(
                  (x, y, width, height, pageX, pageY) => {
                    setRightAnchorLayout({
                      x,
                      y,
                      width,
                      height,
                      pageX,
                      pageY,
                    });
                  }
                )
              }
              icon={<MoreVert size={21} color={'#fff'} />}
              rounded={true}
              type={'primary'}
              onPress={() => setIsRightOpen(true)}
            />
          </View>
          <View
            style={[
              {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
              },
            ]}
          >
            <Button
              onLayout={(event) =>
                event.currentTarget.measure(
                  (x, y, width, height, pageX, pageY) => {
                    setRightAlignedAnchorLayout({
                      x,
                      y,
                      width,
                      height,
                      pageX,
                      pageY,
                    });
                  }
                )
              }
              icon={<MoreVert size={21} color={'#fff'} />}
              rounded={true}
              type={'primary'}
              onPress={() => setIsRightAlignedOpen(true)}
            />
          </View>
          <View
            style={[
              {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              },
            ]}
          >
            <Button
              onLayout={(event) =>
                event.currentTarget.measure(
                  (x, y, width, height, pageX, pageY) => {
                    setCenterAnchorLayout({
                      x,
                      y,
                      width,
                      height,
                      pageX,
                      pageY,
                    });
                  }
                )
              }
              icon={<MoreVert size={21} color={'#fff'} />}
              rounded={true}
              type={'primary'}
              onPress={() => setIsCenterOpen(true)}
            />
          </View>
          <View
            style={[
              {
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              },
            ]}
          >
            <Button
              onLayout={(event) =>
                event.currentTarget.measure(
                  (x, y, width, height, pageX, pageY) => {
                    setBottomLayout({
                      x,
                      y,
                      width,
                      height,
                      pageX,
                      pageY,
                    });
                  }
                )
              }
              icon={<MoreVert size={21} color={'#fff'} />}
              rounded={true}
              type={'primary'}
              onPress={() => setIsBottomOpen(true)}
            />
          </View>
          <Dropdown
            id={'left'}
            open={isLeftOpen}
            onClose={() => setIsLeftOpen(false)}
            anchorLayout={leftAnchorLayout}
          >
            <Dropdown.Item icon={<Edit size={21} color={'#000'} />}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item icon={<Delete size={21} color={'#000'} />}>
              Delete
            </Dropdown.Item>
          </Dropdown>
          <Dropdown
            id={'right'}
            open={isRightOpen}
            onClose={() => setIsRightOpen(false)}
            anchorLayout={rightAnchorLayout}
            alignment={DropdownAlignment.Right}
          >
            <Dropdown.Item icon={<Edit size={21} color={'#000'} />}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item icon={<Delete size={21} color={'#000'} />}>
              Delete
            </Dropdown.Item>
          </Dropdown>
          <Dropdown
            id={'right-aligned'}
            open={isRightAlignedOpen}
            onClose={() => setIsRightAlignedOpen(false)}
            anchorLayout={rightAlignedAnchorLayout}
            alignment={DropdownAlignment.Left}
          >
            <Dropdown.Item icon={<Edit size={21} color={'#000'} />}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item icon={<Delete size={21} color={'#000'} />}>
              Delete
            </Dropdown.Item>
          </Dropdown>
          <Dropdown
            id={'center'}
            open={isCenterOpen}
            onClose={() => setIsCenterOpen(false)}
            anchorLayout={centerAnchorLayout}
            alignment={DropdownAlignment.Center}
          >
            <Dropdown.Item icon={<Edit size={21} color={'#000'} />}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item icon={<Delete size={21} color={'#000'} />}>
              Delete
            </Dropdown.Item>
          </Dropdown>
          <Dropdown
            id={'bottom'}
            open={isBottomOpen}
            onClose={() => setIsBottomOpen(false)}
            anchorLayout={bottomLayout}
            alignment={DropdownAlignment.Left}
          >
            <Dropdown.Item icon={<Edit size={21} color={'#000'} />}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item icon={<Delete size={21} color={'#000'} />}>
              Delete
            </Dropdown.Item>
          </Dropdown>
        </PortalProvider>
      </GestureHandlerRootView>
    );
  },
};
