import React, { ReactChild, ReactElement } from 'react';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

import Animated from 'react-native-reanimated';
import { screenWidth } from '../../utils/common';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export enum StartDirectionType {
  top= '270deg',
  bottom = '90deg',
  right = '0deg',
  left = '180deg',
}

interface Props {
  progress?: Animated.Value<number>;
  size?: number;
  strokeWidth?: number;
  centerElement?: ReactChild;
  progressColor?: string[];
  strokeColorunderProgress?: string;
  progressStartDirection?: string;
}

function CircularProgress(props: Props): ReactElement {
  const {
    progress = 0.5,
    size = screenWidth - 32,
    strokeWidth = 30,
    centerElement,
    progressColor = ['#f7cd46', '#ef9837'],
    strokeColorunderProgress = 'rgba(0, 0, 0, 0.2)',
    progressStartDirection = StartDirectionType.top,
  } = props;

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const circumference = r * 2 * Math.PI;
  const α = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [Math.PI * 2, 0],
  });
  const strokeDashoffset = Animated.multiply(α, r); // arc
  const progressStrokeColor = progressColor?.length === 1 ? `${progressColor[0]}` : 'url(#grad)';

  return (
    <Container>
      <Wrapper>
        {
          centerElement || null
        }
      </Wrapper>
      <Svg width={size} height={size} style={{
        transform: [{ rotateZ: progressStartDirection }],
      }}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor={progressColor[0]} />
            <Stop offset="1" stopColor={progressColor[1]} />
          </LinearGradient>
        </Defs>
        <Circle
          stroke={strokeColorunderProgress}
          fill="none"
          {...{
            strokeWidth, cx, cy, r,
          }}
        />
        <AnimatedCircle
          stroke={progressStrokeColor}
          fill="none"
          strokeDasharray={`${circumference}, ${circumference}`}
          {...{
            strokeDashoffset, strokeWidth, cx, cy, r,
          }}
        />
      </Svg>
    </Container>
  );
}

export default CircularProgress;
