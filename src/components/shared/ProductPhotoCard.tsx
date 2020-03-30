import {
  ImageSourcePropType,
  View,
  ViewStyle,
} from 'react-native';
import React, { ReactElement } from 'react';

import CustomImage from './CustomImage';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  /* width: 33.3%; */
  max-height: 280px;
  padding-bottom: 20px;
`;

const ImageButton = styled.TouchableOpacity`
  /* flex: 9; */
  max-height: 200px;
`;

const OverlayLine = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-width: 5px;
  border-color: #cd9bff;
  position: absolute;
  z-index: 1;
`;

const OverlayWrapper = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-width: 5px;
  border-color: #cd9bff;
  position: absolute;
  z-index: 2;
  opacity: 0.5;
  background-color: #cd9bff;
`;

const IconContainer = styled.View`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
`;

const InfoWrapper = styled.View`
  margin-top: 10px;
`;

const StyledText = styled.Text`
  font-weight: bold;
  color: ${({ theme }): string => theme.font};
`;

export enum CardType {
  DEFAULT= 'default',
  SELECT = 'select'
}

export enum IconLocation {
  LEFT_TOP = 'lt',
  LEFT_BOTTOM = 'lb',
  RIGHT_TOP = 'rt',
  RIGHT_BOTTOM = 'rb',
}

interface Props {
  cardType?: CardType;
  cardImage: ImageSourcePropType;
  label: string;
  labelSize?: number;
  storeName?: string;
  containerStyle?: ViewStyle | ViewStyle[] | undefined | {};
  focused?: boolean;
  focusColor?: string;
  icon?: ReactElement;
  iconContainerStyle?: ViewStyle;
  iconLocation?: string;
  onPress?: () => void;
  selectItem?: () => void;
  removeItem?: () => void;
}

function ProductPhotoCard(props: Props): ReactElement {
  const {
    cardType = CardType.DEFAULT,
    cardImage,
    label,
    labelSize = 14,
    storeName = '',
    containerStyle,
    focused = false,
    focusColor = '#cd9bff',
    icon,
    iconContainerStyle,
    iconLocation = 'lt',
    onPress,
    selectItem,
    removeItem,
  } = props;

  const hasIcon = (
    icon: ReactElement | void,
    iconLocation: string,
  ): ReactElement | void => {
    const iconStyle =
      iconLocation === 'rt'
        ? { alignItems: 'flex-end' }
        : iconLocation === 'lb'
          ? { justifyContent: 'flex-end' }
          : iconLocation === 'rb'
            ? { justifyContent: 'flex-end', alignItems: 'flex-end' }
            : null;
    if (icon) {
      return (
        <IconContainer style={iconStyle}>
          <View style={iconContainerStyle}>{icon}</View>
        </IconContainer>
      );
    }
  };

  const onFocus = (focused: boolean): ReactElement | void => {
    if (focused) {
      return (
        <OverlayLine style={{ borderColor: focusColor }} onPress={removeItem}>
          <OverlayWrapper
            style={{ borderColor: focusColor, backgroundColor: focusColor }}
          />
        </OverlayLine>
      );
    }
  };

  switch (cardType) {
    case CardType.DEFAULT:
    default:
      return (
        <Container style={containerStyle}>
          <ImageButton
            onPress={(): void => {
              if (onPress) {
                onPress();
              }
            }}
          >
            {hasIcon(icon, iconLocation)}
            <CustomImage
              source={cardImage}
              containerStyle={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
              imageStyle={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
            />
          </ImageButton>
          <InfoWrapper>
            <StyledText
              style={{ fontSize: labelSize }}
            >
              {label}
            </StyledText>
            <StyledText style={{ fontSize: 12 }}>{storeName}</StyledText>
          </InfoWrapper>
        </Container>
      );
    case CardType.SELECT:
      return (
        <Container style={containerStyle}>
          <ImageButton
            onPress={(): void => {
              if (selectItem) {
                selectItem();
              }
            }}
          >
            {onFocus(focused)}
            <CustomImage
              source={cardImage}
              containerStyle={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
              imageStyle={{
                borderRadius: 10,
              }}
            />
          </ImageButton>
          <InfoWrapper>
            <StyledText
              style={{ fontSize: labelSize }}
            >
              {label}
            </StyledText>
            <StyledText style={{ fontSize: 12 }}>{storeName}</StyledText>
          </InfoWrapper>
        </Container>
      );
  }
}

export default ProductPhotoCard;
