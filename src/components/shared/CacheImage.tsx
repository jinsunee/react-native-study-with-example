import * as FileSystem from 'expo-file-system';

import {
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';

import { LoadingIndicator } from '@dooboo-ui/native';
import shorthash from 'shorthash';
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
  imageSource: ImageSourcePropType | string | undefined;
  imageStyle?: ImageStyle;
  containerStyle?: ViewStyle;
  indicatorElement?: () => ReactElement | null;
  indicatorContainerStyle?: ViewStyle;
  imageProps?: ImageProps | undefined;
  indicatorSize?: number;
}

function Shared(props: Props): ReactElement {
  const {
    imageSource,
    containerStyle,
    imageStyle,
    imageProps,
    indicatorElement,
    indicatorContainerStyle,
    indicatorSize = 10,
  } = props;

  const [sourceStr, setSourceStr] = useState<string>();

  const cacheImage = async (): Promise<void> => {
    if (typeof imageSource !== 'string') return;

    const name = shorthash.unique(imageSource);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
      setSourceStr(image.uri);
      return;
    }

    const newImage = await FileSystem.downloadAsync(imageSource, path);
    setSourceStr(newImage.uri);
  };

  useEffect(() => {
    cacheImage();
  }, []);

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
        source={
          !imageSource
            ? require('../../../assets/images/profile_default.png')
            : { uri: sourceStr }
        }
        resizeMode="cover"
        {...imageProps}
      />
    </Container>
  );
}

export default Shared;
