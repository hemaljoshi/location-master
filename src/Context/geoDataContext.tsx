import React, { useContext, useState } from 'react';

interface geoData {
  previousLocation: any[];
  setPreviousLocation: React.Dispatch<React.SetStateAction<any[]>>;
}

const geoDataContext = React.createContext<geoData | null>(null);

interface geoDataContextType {
  children: React.ReactNode;
}

export const GeoDataContextProvider: React.FC<geoDataContextType> = ({
  children,
}) => {
  const [previousLocation, setPreviousLocation] = useState<any[]>([]);

  return (
    <geoDataContext.Provider value={{ previousLocation, setPreviousLocation }}>
      {children}
    </geoDataContext.Provider>
  );
};

export function useGeoData() {
  return useContext(geoDataContext);
}
