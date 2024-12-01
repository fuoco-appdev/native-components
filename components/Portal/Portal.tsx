import React, { useContext, useEffect } from 'react';
import { PortalContext } from './PortalProvider';

export interface PortalProps {
  children: React.ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const { addComponent } = useContext(PortalContext);
  useEffect(() => {
    addComponent({ component: children });
  }, [children]);

  return null;
}
