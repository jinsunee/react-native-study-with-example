# React Native + Typescript

React-Native 패키지에 있는 컴포넌트를 사용해서 여러가지 만들어보면서 공부하기 🕶

## Develop setup

- react-native
- react-native-cli
- typescript
- styled-components

## Components

### 1) FilterModal

react-native의 컴포넌트인 `Animated`와 `Modal` 이용

![FilterModal](https://user-images.githubusercontent.com/31176502/81084854-66dab480-8f31-11ea-9e7c-52c5fcf05226.gif)

[shared/FilterModal.tsx](https://github.com/jinsunee/react-native-study-with-example/blob/master/src/components/shared/FilterModal.tsx)

1. 모달의 처음 위치 -> 화면 윗쪽에 숨어있게 -screenHeight로 위치 지정

```
const modalPositionY = useMemo(() => new Animated.Value(-screenHeight), []);
```

2. 모달 열기

```
const openModalAnimation = (): void => {
  Animated.spring(modalPositionY, {
    toValue: 0,
    friction: 10,
  }).start();
};
```

3. 모달 닫기

```
const closeModal = (): void => {
  Animated.timing(modalPositionY, {
    toValue: -screenHeight,
    duration: 200,
  }).start(() => {
    setShowModal(false);
  });
};
```

4. 모달 위치에 따른 배경 색 opacity 값 변화 시키기.

```
const overlayOpacity = modalPositionY.interpolate({
  inputRange: [-screenHeight, 0],
  outputRange: [0, 0.5],
});
```

### 2) ProductPhotoCard

읽기 쉬운 코드를 위해서 enum을 이용해 타입을 입력 받을 수 있게 했으며, 재 사용성을 고려하여 설계한 컴포넌트

| 기본 카드                                                                                                       | 선택 가능한 카드                                                                                                |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| ![image1](https://user-images.githubusercontent.com/31176502/81086077-ffbdff80-8f32-11ea-8285-b11c7c3fa0d8.png) | ![image2](https://user-images.githubusercontent.com/31176502/81087941-4ad91200-8f35-11ea-92c2-a1536fc1f02d.png) |

[shared/ProductPhotoCard.tsx](https://github.com/jinsunee/react-native-study-with-example/blob/master/src/components/shared/ProductPhotoCard.tsx)

1. 기본 카드 or 선택 가능한 카드인지

```
export enum CardType {
  DEFAULT= 'default',
  SELECT = 'select'
}

switch (cardType) {
  case CardType.DEFAULT:
  default:
    return (...기본 카드 반환);
  case CardType.SELECT:
    return (...선택된 카드 반환);
```

2. 위 스크린샷에서 오른쪽 아래에 있는 하트 아이콘처럼 아이콘을 넣을 때 편리하도록 enum 선언 & 아이콘 반환하는 함수

```
export enum IconLocation {
  LEFT_TOP = 'lt',
  LEFT_BOTTOM = 'lb',
  RIGHT_TOP = 'rt',
  RIGHT_BOTTOM = 'rb',
}

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
```

### 3) CustomImage

react-native의 Image + loading 중 컴포넌트

[shared/CustomImage.tsx](https://github.com/jinsunee/react-native-study-with-example/blob/master/src/components/shared/CustomImage.tsx)

![CustomImage](https://user-images.githubusercontent.com/31176502/81085941-d56c4200-8f32-11ea-9747-6a922ca30996.gif)

### 3-1) CacheImage

CustomImage + FileSystem 을 이용한 이미지 캐싱(성능 개선)

[shared/CacheImage.tsx](https://github.com/jinsunee/react-native-study-with-example/blob/master/src/components/shared/CacheImage.tsx)

```
  const cacheImage = async (): Promise<void> => {
  // imageSource는 props로 받아온 이미지 url
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
```

### 4) CircleProgress

진행상황을 원형으로 표현한 컴포넌트로, javascript 코드로 svg 파일에 넣을 수 있도록 직접 수정하는 방식으로 구현
![image](https://user-images.githubusercontent.com/31176502/81089643-9096da00-8f37-11ea-93d1-ab8ea461cd57.png)

[shared/CircleProgress.tsx](https://github.com/jinsunee/react-native-study-with-example/blob/master/src/components/shared/CircularProgress.tsx)

1.`react-native-svg` 사용

```
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
```

2. 시작 위치 지정할 수 있도록 enum 선언

```
export enum StartDirectionType {
  top= '270deg',
  bottom = '90deg',
  right = '0deg',
  left = '180deg',
}

progressStartDirection = StartDirectionType.top
```

3. 반지름 등 그릴 원에 필요한 값을 구하기

customizing 가능하도록 props로 받은 값을 바탕으로 구성

```
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
```

4. svg 컴포넌트 그리기

```
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
```

## License

[![License](https://img.shields.io/badge/License-MIT-red)](http://badges.mit-license.org)
