import {useStyles} from 'osmicsx';
import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {colors, kidsColors, TypeObject} from '../../constants';
import {useTools} from '../../stores';
import clsx from 'clsx';
import Slider from '@react-native-community/slider';
import {dimensions} from '../../utils';

const {actualWidth} = dimensions();
const ICON_SIZE = 32;
const BTN_STYLE = 'p-2 rounded-full';
const tempKidsColor: TypeObject = kidsColors;
const KIDS_COLOR = Object.keys(tempKidsColor);
const SLIDER_WIDTH = actualWidth - ICON_SIZE * (3 * 2);
const SLIDER_HEIGHT = 40;
const sliderStyle = `w-${SLIDER_WIDTH} h-${SLIDER_HEIGHT}`;

export default function PaintingFooter() {
  const {apply} = useStyles();
  const {
    eraserMode,
    isZooming,
    toolSize,
    color,
    setEraser,
    setColor,
    setIsZooming,
    setToolSize,
  } = useTools();

  // Zooming functionality
  const onChangeZooming = () => {
    requestAnimationFrame(() => {
      setIsZooming();
    });
  };

  const renderColors = ({item}: {item: string}) => (
    <ColorItem item={item} onPress={setColor} />
  );

  return (
    <View style={apply('bg-white w%100', 'z-100 border-t border-gray-500')}>
      {/* Tools */}
      <View
        style={apply(
          'px-3 py-4',
          'row justify-between items-center border-b mb-4',
        )}>
        {/* Brush size */}
        <TouchableOpacity activeOpacity={0.75} style={apply(BTN_STYLE)}>
          <Icon name="paintbrush" color={color} size={ICON_SIZE} />
        </TouchableOpacity>

        {/* Brush / eraser size */}
        <Slider
          style={apply(sliderStyle)}
          value={toolSize}
          onSlidingComplete={setToolSize}
          minimumValue={4}
          maximumValue={20}
          minimumTrackTintColor={eraserMode ? colors.black : color}
          maximumTrackTintColor={colors.black}
        />

        {/* Eraser */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={setEraser}
          style={apply(
            BTN_STYLE,
            clsx({
              'bg-black': eraserMode,
              'bg-white': !eraserMode,
            }),
          )}>
          <Icon
            name="eraser"
            color={eraserMode ? colors.white : colors.black}
            size={ICON_SIZE}
          />
        </TouchableOpacity>

        {/* Zoom */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={onChangeZooming}
          style={apply(
            BTN_STYLE,
            clsx({
              'bg-black': isZooming,
              'bg-white': !isZooming,
            }),
          )}>
          <Icon
            name="arrows-to-circle"
            color={isZooming ? colors.white : colors.black}
            size={ICON_SIZE}
          />
        </TouchableOpacity>
      </View>

      {/* Color palette */}
      <FlatList
        data={KIDS_COLOR}
        keyExtractor={item => item}
        renderItem={renderColors}
        horizontal
        contentContainerStyle={apply('px-4 pb-4')}
      />
    </View>
  );
}

// Color item for palette
const ColorItem = ({
  item,
  onPress,
}: {
  item: string;
  onPress: (color: string) => void;
}) => {
  const {apply} = useStyles();
  const bgColor = {backgroundColor: tempKidsColor[item]};

  const _onPress = () => {
    requestAnimationFrame(() => {
      onPress(tempKidsColor[item]);
    });
  };

  return (
    <TouchableOpacity
      onPress={_onPress}
      activeOpacity={0.75}
      style={[apply('w-32 h-32 mr-4 rounded-full'), bgColor]}
    />
  );
};
