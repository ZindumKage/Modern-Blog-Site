import  { createContext } from 'react';
import type { ThemeContextType } from '../utils/interfaces';



export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggle: () => {},
});

