import {
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import React, { ReactElement } from 'react';

import { LoadingIndicator } from '@dooboo-ui/native';
import styled from 'styled-components/native';

const Container = styled.View`
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const ProgressiveImage = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #F2F2F2;
`;

interface Props {
  source: ImageSourcePropType;
  imageStyle?: ImageStyle;
  containerStyle?: ViewStyle;
  indicatorElement?: () => ReactElement | null;
  indicatorContainerStyle?: ViewStyle;
  imageProps?: ImageProps | undefined;
  indicatorSize?: number;
}

function Shared(props: Props): ReactElement {
  const {
    source,
    containerStyle,
    imageStyle,
    imageProps,
    indicatorElement,
    indicatorContainerStyle,
    indicatorSize = 10,
  } = props;

  return (
    <Container style={containerStyle} container={containerStyle}>
      <ProgressiveImage style={[containerStyle, imageStyle, indicatorContainerStyle]}>
        {!indicatorElement ? (<LoadingIndicator size={indicatorSize} />) : indicatorElement}
      </ProgressiveImage>
      <Image
        style={[
          {
            width: '100%',
            height: '100%',
          },
          imageStyle,
        ]}
        source={source}
        resizeMode="cover"
        {...imageProps}
      />
    </Container>
  );
}

export default Shared;
