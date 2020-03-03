import React, { ReactElement } from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 15px;
`;

function App(): ReactElement {
  return (
    <Container>
      <StyledText>Hello World~!</StyledText>
    </Container>
  );
}

export default App;
