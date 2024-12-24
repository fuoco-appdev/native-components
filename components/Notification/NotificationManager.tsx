import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Dimensions, View } from 'react-native';
import Notification, { NotificationProps } from './Notification'; // Assuming your Notification component is in the same directory
import { Portal } from '../Portal';

export interface NotificationContextProps {
  showNotification: (props: NotificationProps) => void;
}

export interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationContext = createContext<NotificationContextProps>({
  showNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

const NotificationContainer = () => {
  const notificationContext = useNotification();
  const [notifications, setNotifications] = useState<
    { props: NotificationProps; height: number }[]
  >([]);

  notificationContext.showNotification = (props: NotificationProps) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { props: props, height: 0 },
    ]);
  };

  const hideNotification = (index: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index)
    );
  };

  const calculatePosition = (index: number, height: number) => {
    setNotifications(
      (prevValue: { props: NotificationProps; height: number }[]) => {
        const newValue = [...prevValue];
        newValue[index] = { props: newValue[index].props, height: height };
        return newValue;
      }
    );
  };

  return (
    <View
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}
    >
      {notifications.map((value, index) => {
        let parentTopPosition = -Dimensions.get('screen').height;
        const lastNotification = notifications[index - 1];
        if (lastNotification) {
          parentTopPosition = notifications
            .slice(0, index - 1)
            .reduce((acc, next) => acc + next.height, 0);
        }

        const topPosition = notifications
          .slice(0, index)
          .reduce((acc, next) => acc + next.height, 0);
        return (
          <Notification
            {...value.props}
            key={index}
            index={index}
            top={topPosition}
            parentTop={parentTopPosition}
            calculatePosition={calculatePosition}
            hideNotification={hideNotification}
          />
        );
      })}
    </View>
  );
};

// Provider component
const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const notificationContext = useNotification();
  return (
    <NotificationContext.Provider
      value={{
        showNotification: notificationContext.showNotification,
      }}
    >
      {children}
      <Portal name={'notifications'} visible={true}>
        <NotificationContainer />
      </Portal>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
