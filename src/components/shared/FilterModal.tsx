import { Animated, Modal, PanResponder, View } from 'react-native';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { SvgSwipeLayout, SvgThreeLayout, SvgTwoLayout } from '../../utils/Icons';

import { LayoutOption } from '../screen/Discovery';
import { getString } from '../../../STRINGS';
import { screenHeight } from '../../utils/common';
import styled from 'styled-components/native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useThemeContext } from '@dooboo-ui/native-theme';

const SWIPE_THRESHOLD = 0.25 * screenHeight;

const Container = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }): string => theme.background};
`;

const OverlayWrapper = styled.TouchableHighlight`
  width: 100%;
  height: 100%;
  background-color: black;
`;

const GroupWrapper = styled.View`
  padding-top: 20px;
`;

const GroupTitleText = styled.Text`
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }): string => theme.font2};
`;

const ProductOrderButtonWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const ProductOrderButton = styled.TouchableOpacity`
  padding: 8px 0;
  width: 30%;
  border-radius: 4px;
  background-color: ${({ theme }): string => theme.anti};
  justify-content: center;
  align-items: center;
`;

const StyleFilterWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyleFilterButton = styled.TouchableOpacity`
   width: 25%;
   justify-content: center;
   align-items: center;
   padding: 10px 0;
`;

const StyleFilterText = styled.Text`
  font-size: 14px;
  font-weight: ${(props): string => props.selected ? 'bold' : '500'};
  color: ${(props): string => props.selected ? props.theme.anti : props.theme.font2};
`;

const LayoutWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

const LayoutButton = styled.TouchableOpacity`
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const LayoutText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
`;

const SwipeButton = styled.TouchableOpacity`
  padding: 12px 60px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: solid 1px #f2f2f2;
`;

const SubmitButtonGroupWrapper = styled.View`
  margin-top: 30px;
  width: 100%;
  flex-direction: row;
`;

const SubmitButton = styled.TouchableOpacity`
  padding: 10px 0;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
`;

const StyledText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }): string => theme.font2};
`;

enum ButtonFilter {
  LATEST = 0,
  LOW = 1,
  HIGH = 2,
}

interface StyleFilter {
  id: number;
  name: string;
  selected: boolean;
}

interface Props {
  layout: string;
  setLayout: (layout: string) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

function FilterModal(props: Props): ReactElement {
  const { layout, setLayout, showModal, setShowModal } = props;
  const { theme } = useThemeContext();
  const insets = useSafeArea();

  const modalPositionY = useMemo(() => new Animated.Value(-screenHeight), []);
  const openModalAnimation = (): void => {
    Animated.spring(modalPositionY, {
      toValue: 0,
      friction: 10,
    }).start();
  };

  useEffect(() => {
    if (showModal) {
      openModalAnimation();
    }
  }, [showModal]);

  const closeModal = (): void => {
    Animated.timing(modalPositionY, {
      toValue: -screenHeight,
      duration: 200,
    }).start(() => {
      setShowModal(false);
    });
  };

  const overlayOpacity = modalPositionY.interpolate({
    inputRange: [-screenHeight, 0],
    outputRange: [0, 0.5],
  });

  const resetModalPosition = (): void => {
    Animated.spring(modalPositionY, {
      toValue: 0,
    }).start();
  };

  const _panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          if (gestureState.dy < 0) {
            modalPositionY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (evt, gesture) => {
          if (gesture.dy < -SWIPE_THRESHOLD) {
            closeModal();
          } else {
            resetModalPosition();
          }
        },
      }),
    [],
  );

  const [selectOrder, setSelectOrder] = useState<ButtonFilter>(0);
  const productOrderArr = [
    getString('PRODUCT_ORDER_LATEST'),
    getString('PRODUCT_ORDER_LOWER_PRICE'),
    getString('PRODUCT_ORDER_HIGHER_PRICE'),
  ];

  const initialStyleFilterArr: StyleFilter[] = [
    { id: 0, name: '심플베이직', selected: false },
    { id: 1, name: '모던시크', selected: false },
    { id: 2, name: '캠퍼스룩', selected: false },
    { id: 3, name: '러블리', selected: false },
    { id: 4, name: '로맨틱', selected: false },
    { id: 5, name: '페미닌', selected: false },
    { id: 6, name: '럭셔리', selected: false },
    { id: 7, name: '섹시글램', selected: false },
    { id: 8, name: '오피스룩', selected: false },
    { id: 9, name: '유니크', selected: false },
    { id: 10, name: '빈티지', selected: false },
    { id: 11, name: '스쿨룩', selected: false },
  ];
  const [styleFilter, setStyleFilter] = useState<StyleFilter[]>(initialStyleFilterArr);

  const getProductOrderButton = (index: number): ReactElement => {
    if (selectOrder === index) {
      return (
        <ProductOrderButton
          key={`button__${index}`}
          style={{ backgroudColor: theme.anti }}
          onPress={(): void => setSelectOrder(index)}
        >
          <StyledText style={{ color: theme.fontInButton, fontSize: 13 }}>{productOrderArr[index]}</StyledText>
        </ProductOrderButton>
      );
    }

    return (
      <ProductOrderButton
        key={`button__${index}`}
        style={{ borderWidth: 1, borderColor: '#C7C6C8', backgroundColor: 'transparent' }}
        onPress={(): void => setSelectOrder(index)}
      >
        <StyledText>{productOrderArr[index]}</StyledText>
      </ProductOrderButton>
    );
  };

  const selectStyle = (text: StyleFilter, index: number): void => {
    const newArr = [
      ...styleFilter.slice(0, index),
      { id: text.id, name: text.name, selected: !text.selected },
      ...styleFilter.slice(index + 1),
    ];
    setStyleFilter(newArr);
  };

  const getStyleFilter = (text: StyleFilter, index: number): ReactElement => {
    return (
      <StyleFilterButton
        key={`text__${index}`}
        onPress={(): void => selectStyle(text, index)}
      >
        <StyleFilterText selected={text.selected}>{text.name}</StyleFilterText>
      </StyleFilterButton>
    );
  };

  const onReset = (): void => {
    setSelectOrder(ButtonFilter.LATEST);
    setLayout(LayoutOption.LAYOUT_SWIPE);
    setStyleFilter(initialStyleFilterArr);
  };

  const onSubmitFilter = (): void => {
    closeModal();
  };

  return (
    <Modal
      visible={showModal}
      transparent={true}
    >
      <Animated.View style={{
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        backgroudColor: theme.background,
        transform: [
          {
            translateY: modalPositionY,
          },
        ],
      }}
      {..._panResponder.panHandlers}>
        <Container style={{ paddingTop: insets.top }}>
          <GroupWrapper>
            <GroupTitleText>{getString('PRODUCT_ORDER')}</GroupTitleText>
            <ProductOrderButtonWrapper>
              {
                productOrderArr.map((button, index) => getProductOrderButton(index))
              }
            </ProductOrderButtonWrapper>
          </GroupWrapper>
          <GroupWrapper>
            <GroupTitleText>{getString('STYLE_FILTER')}</GroupTitleText>
            <StyleFilterWrapper>
              {
                styleFilter.map((text, index) => getStyleFilter(text, index))
              }
            </StyleFilterWrapper>
          </GroupWrapper>
          <GroupWrapper>
            <GroupTitleText>{getString('SETTING_LAYOUT')}</GroupTitleText>
            <LayoutWrapper>
              <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 10,
              }}>
                <LayoutButton onPress={(): void => setLayout(LayoutOption.LAYOUT_TWO)}>
                  <View style={{ height: 29 }}>
                    <SvgTwoLayout
                      fill={layout === LayoutOption.LAYOUT_TWO ? theme.anti : '#acacac'}
                    />
                  </View>
                  <LayoutText
                    style={layout === LayoutOption.LAYOUT_TWO ? {
                      color: theme.anti,
                    } : {
                      color: '#acacac',
                    }}
                  >{getString('SETTING_LAYOUT_TWO')}</LayoutText>
                </LayoutButton>
                <LayoutButton onPress={(): void => setLayout(LayoutOption.LAYOUT_THREE)}>
                  <View style={{ height: 29 }}>
                    <SvgThreeLayout
                      fill={layout === LayoutOption.LAYOUT_THREE ? theme.anti : '#acacac'}
                    />
                  </View>
                  <LayoutText
                    style={layout === LayoutOption.LAYOUT_THREE ? {
                      color: theme.anti,
                    } : {
                      color: '#acacac',
                    }}
                  >
                    {getString('SETTING_LAYOUT_THREE')}
                  </LayoutText>
                </LayoutButton>
              </View>
              <SwipeButton
                style={
                  layout === LayoutOption.LAYOUT_SWIPE ? {
                    borderColor: theme.anti,
                  } : ''}
                onPress={(): void => setLayout(LayoutOption.LAYOUT_SWIPE)}
              >
                <SvgSwipeLayout
                  fill={layout === LayoutOption.LAYOUT_SWIPE ? theme.anti : '#acacac'}
                />
                <LayoutText
                  style={layout === LayoutOption.LAYOUT_SWIPE ? {
                    color: theme.anti,
                  } : {
                    color: '#acacac',
                  }}
                >
                  {getString('SETTING_LAYOUT_SWIPE')}
                </LayoutText>
              </SwipeButton>
            </LayoutWrapper>
          </GroupWrapper>
          <SubmitButtonGroupWrapper>
            <SubmitButton
              style={{ flex: 1, borderColor: '#C7C6C8', marginRight: 5 }}
              onPress={onReset}
            >
              <StyledText style={{ fontSize: 14 }}>{getString('INITIALIZE_SELECTION')}</StyledText>
            </SubmitButton>
            <SubmitButton
              style={{ flex: 1, borderColor: theme.anti, backgroundColor: theme.anti, marginLeft: 5 }}
              onPress={onSubmitFilter}
            >
              <StyledText style={{ fontSize: 14, color: theme.fontInButton }}>
                {getString('COMPLETING_SELECTION')}
              </StyledText>
            </SubmitButton>
          </SubmitButtonGroupWrapper>
        </Container>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          height: '100%',
          backgroudColor: 'black',
          opacity: overlayOpacity,
        }}
      >
        <OverlayWrapper onPress={closeModal}><></></OverlayWrapper>
      </Animated.View>
    </Modal>
  );
}

export default FilterModal;
