import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TemperatureContextProps {
  unit: 'C' | 'F';
  toggleUnit: () => void;
}

const TemperatureContext = createContext<TemperatureContextProps | undefined>(undefined);

export const TemperatureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C'); // Default is Celsius

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};

export const useTemperatureUnit = () => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error('useTemperature must be used within a TemperatureProvider');
  }
  return context;
};
