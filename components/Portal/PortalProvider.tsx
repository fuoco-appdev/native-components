import React, { useEffect, useState } from 'react';

export interface PortalProviderProps {
  children: React.ReactNode;
}
interface Element {
  component: React.ReactNode;
}

export const PortalContext = React.createContext({
  addComponent: (element: Element) => {},
});

export default function PortalProvider({ children }: PortalProviderProps) {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const addComponent = ({ component }: Element) => {
    setComponents((prevComponents) => [...prevComponents, component]);
  };
  return (
    <PortalContext.Provider value={{ addComponent }}>
      {children}
      {components}
    </PortalContext.Provider>
  );
}
