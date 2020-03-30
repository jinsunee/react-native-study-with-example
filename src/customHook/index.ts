import React, { useState } from 'react';

import { ThemeType } from '../type'

export const useTheme = () => {
  const [ themeMode, setThemeMode ] = useState<ThemeType>(ThemeType.LIGHT);

  const toggleTheme = () => setThemeMode(themeMode === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT);

  return [themeMode, toggleTheme];
}