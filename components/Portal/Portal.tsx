import React, { useContext, useEffect } from 'react';
import { PortalContext } from './PortalProvider';

export interface PortalProps {
  children: React.ReactNode;
  name: string;
  visible: boolean;
}

export default function Portal({ children, name, visible }: PortalProps) {
  const { addComponent, removeComponent } = useContext(PortalContext);
  useEffect(() => {
    addComponent({ name, component: children });
    return () => {
      removeComponent(name);
    };
  }, [visible]);

  return null;
}
