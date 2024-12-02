import React, { useContext, useEffect } from 'react';
import { PortalContext } from './PortalProvider';
import { observer } from 'mobx-react-lite';

export interface PortalProps {
  children: React.ReactNode;
  name: string;
  visible: boolean;
}

function Portal({ children, name, visible }: PortalProps) {
  const { addComponent, removeComponent } = useContext(PortalContext);
  useEffect(() => {
    if (visible) {
      addComponent({ name, component: children });
    } else {
      removeComponent(name);
    }
    return () => {
      removeComponent(name);
    };
  }, [visible]);

  return null;
}

export default observer(Portal);
