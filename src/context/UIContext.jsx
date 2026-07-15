import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Funções utilitárias para facilitar o uso
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <UIContext.Provider value={{ isMobileMenuOpen, setIsMobileMenuOpen, toggleMobileMenu, closeMobileMenu }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);