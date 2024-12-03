import {
  Canvas,
  Fill,
  Group,
  Path,
  Skia,
  useImage,
  Image,
} from '@shopify/react-native-skia';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import React, {useMemo, useState} from 'react';
import usePaintingContext from './usePaintingContext';
import {useLines, useTools} from '../../stores';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useStyles} from 'osmicsx';
import {clamValue, dimensions} from '../../utils';

// Layout configuration
const {width, height} = dimensions();
const A4_WIDTH_300DPI = 210;
const A4_HEIGHT_300DPI = 297;
const A4_HEIGHT_RATIO = A4_HEIGHT_300DPI / A4_WIDTH_300DPI;
const SAFE_HEIGHT_RATIO = 0.58;
const SAFE_HEIGHT = height * SAFE_HEIGHT_RATIO;
const bestDrawWidth = clamValue({
  value: width - 24,
  min: 0,
  max: 600,
});
const drawWidth = bestDrawWidth;
const drawHeight = clamValue({
  value: bestDrawWidth * A4_HEIGHT_RATIO,
  min: 0,
  max: SAFE_HEIGHT,
});

// Main component
export default function PaintingBody() {
  const {bareImage, drawRef, history} = usePaintingContext();
  const {lines, setLines} = useLines();
  const {apply} = useStyles();

  // Tools
  const {
    color: colorTool,
    toolSize,
    openBrush,
    openColor,
    isZooming,
    setOpenBrush,
    setOpenColor,
  } = useTools();
  const shouldPaint = useMemo(
    () => !(openBrush || openColor),
    [openBrush, openColor],
  );

  // Path drawing color
  const path = useSharedValue(Skia.Path.Make());
  const paint = useSharedValue(Skia.Paint());
  const image = useImage(bareImage || '');
  const [count, setCount] = useState(0);

  // Zoom value
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  // Drag value
  const drag = useSharedValue({dragX: 0, dragY: 0});

  // For drawing control
  const touchHandler = Gesture.Pan()
    .runOnJS(true)
    .onStart(({x, y}) => {
      if (shouldPaint && !isZooming) {
        if (openBrush) {
          setOpenBrush();
        }

        if (openColor) {
          setOpenColor();
        }

        path.value.moveTo(x, y);
        const color = colorTool;
        const strokeWidth = toolSize;
        paint.value.setStrokeWidth(strokeWidth);
        paint.value.setColor(Skia.Color(color));
      }
    })
    .onChange(({x, y}) => {
      if (shouldPaint && !isZooming) {
        const lastPt = path.value.getLastPt();
        const xMid = (lastPt.x + x) / 2;
        const yMid = (lastPt.y + y) / 2;
        path.value.quadTo(lastPt.x, lastPt.y, xMid, yMid);
        setCount(v => v + 1);
      }
    })
    .onEnd(() => {
      if (shouldPaint && !isZooming) {
        const valuePath = {
          path: path.value.copy(),
          paint: paint.value.copy(),
        };
        setLines([...lines, valuePath]);
        history.push(valuePath);
        path.value.reset();
        paint.value.reset();
        setCount(0);
      }
    })
    .minDistance(1);

  // For zooming control
  const zoomHandler = Gesture.Pinch()
    .runOnJS(true)
    .enabled(isZooming)
    .onStart(() => {
      // isZooming.value = true;
    })
    .onUpdate(e => {
      const tempScale = savedScale.value * e.scale;
      if (tempScale >= 1) {
        scale.value = savedScale.value * e.scale;
      }
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      // isZooming.value = false;
    });

  // For dragging control
  const dragHandler = Gesture.Pan()
    .runOnJS(true)
    .enabled(isZooming)
    .onStart(e => {
      drag.value = {dragX: e.translationX, dragY: e.translationY};
    })
    .onUpdate(e => {
      drag.value = {dragX: e.translationX, dragY: e.translationY};
    });

  const composedGesture = Gesture.Simultaneous(
    // touchHandler,
    // Gesture.Simultaneous(zoomHandler),
    // Gesture.Pan(dragHandler),
    touchHandler,
    zoomHandler,
    dragHandler,
  );

  // Painting pen
  // const pathValue = useDerivedValue(() => path.value);
  const paintingPen = useMemo(() => {
    return (
      <Path
        path={path.value.copy()}
        strokeWidth={toolSize}
        color={colorTool}
        style="stroke"
        strokeJoin="round"
        strokeCap="round"
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const animatedStyles = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {scale: scale.value},
        {translateX: drag.value.dragX},
        {translateY: drag.value.dragY},
        // {skewX: drag.value.dragX},
        // {skewY: drag.value.dragY},
      ],
    };
  });

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        removeClippedSubviews
        style={[
          apply('relative z-10', `w-${drawWidth} h-${drawHeight}`),
          animatedStyles,
        ]}>
        <Canvas
          ref={drawRef}
          style={apply('absolute', `w-${drawWidth} h-${drawHeight}`)}>
          <Group>
            <Fill color="#FFFFFF" />
            {lines.map((line, index) => (
              <Path
                key={`line_${line.path.toSVGString()}_${index}`}
                style="stroke"
                strokeJoin="round"
                strokeCap="round"
                path={line.path.copy()}
                strokeWidth={line.paint.getStrokeWidth()}
                color={line.paint.getColor()}
              />
            ))}

            {paintingPen}

            {!!image && (
              <Image
                x={0}
                y={0}
                image={image}
                width={drawWidth}
                height={drawHeight}
                fit="contain"
              />
            )}
          </Group>
        </Canvas>
      </Animated.View>
    </GestureDetector>
  );
}
