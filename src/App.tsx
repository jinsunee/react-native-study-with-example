import React, { ReactElement, useState } from 'react';
import { dark, light } from './theme'

import RootStackNavigator from './components/navigator/RootStackNavigator';
import { ThemeProvider } from 'styled-components';

function App(): ReactElement {
  const [themeMode, setThemeMode] = useState<string>('light');
  const theme = themeMode === 'light' ? light : dark;
  return (
    <ThemeProvider theme={theme}>
        <RootStackNavigator />
    </ThemeProvider>
  );
}

export default App;
