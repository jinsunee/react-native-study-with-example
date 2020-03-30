import React, { ReactElement, useState } from 'react';
import { dark, light } from '../theme';

import { ThemeProvider } from 'styled-components';
import { ThemeType } from '../type';
import { useTheme } from '../customHook';

interface Props {
  theme: ThemeType;
  children: ReactElement;
}

const CustomThemeProvider = ({ children }: Props): ReactElement => {
  const [ themeMode ] = useTheme();
  const theme = themeMode === ThemeType.LIGHT ? light : dark;

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;