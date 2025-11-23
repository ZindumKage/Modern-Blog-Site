import { useContext } from 'react';
import { ThemeContext } from "./ThemeContext";
import type { ThemeContextType } from '../utils/interfaces';

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};