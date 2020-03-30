import React, { ReactElement } from 'react';

import { AuthProvider } from './AuthProvider'
import CustomThemeProvider from './CustomThemeProvider'
import { ThemeType } from '../type';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

const RootProvider = ({
  initialThemeType = ThemeType.LIGHT,
  children,
}: Props): ReactElement => {
  return(
    <CustomThemeProvider 
      theme={initialThemeType}
    >
      <AuthProvider>
        {children}
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default RootProvider;