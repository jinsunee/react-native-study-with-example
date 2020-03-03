import React, { ReactElement } from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 15px;
  color: white;
`;

function Screen(): ReactElement {
  return (
    <Container>
      <StyledText>Hello!</StyledText>
    </Container>
  );
}

export default Screen;
