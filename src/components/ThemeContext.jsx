// components/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const themes = {
  light: {
    name: 'Light',
    bg: 'bg-gray-50',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-gray-200',
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    gradient: 'from-gray-50 to-gray-100'
  },
  dark: {
    name: 'Dark',
    bg: 'bg-gray-900',
    card: 'bg-gray-800',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    border: 'border-gray-700',
    primary: 'bg-indigo-600',
    primaryHover: 'hover:bg-indigo-700',
    gradient: 'from-gray-900 to-gray-800'
  },
  forest: {
    name: 'Forest',
    bg: 'bg-emerald-50',
    card: 'bg-white',
    text: 'text-emerald-900',
    textSecondary: 'text-emerald-700',
    border: 'border-emerald-200',
    primary: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    gradient: 'from-emerald-50 to-teal-50'
  },
  sunset: {
    name: 'Sunset',
    bg: 'bg-orange-50',
    card: 'bg-orange-100',
    text: 'text-orange-900',
    textSecondary: 'text-orange-700',
    border: 'border-orange-200',
    primary: 'bg-orange-600',
    primaryHover: 'hover:bg-orange-700',
    gradient: 'from-orange-50 to-red-50'
  },
  ocean: {
    name: 'Ocean',
    bg: 'bg-cyan-50',
    card: 'bg-white',
    text: 'text-cyan-900',
    textSecondary: 'text-cyan-700',
    border: 'border-cyan-200',
    primary: 'bg-cyan-600',
    primaryHover: 'hover:bg-cyan-700',
    gradient: 'from-cyan-50 to-blue-50'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const theme = themes[currentTheme];

  useEffect(() => {
    document.body.className = theme.bg;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};