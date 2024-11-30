import React, {memo} from 'react';
import {type GestureResponderEvent, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'osmicsx';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useTools} from '../../stores';
import {colors, kidsColors, type TypeObject} from '../../constants';

const tempKidsColors: TypeObject = kidsColors;

function PaintingFooterPalette() {
  const {color, openColor, setOpenColor, setColor} = useTools();
  const {apply} = useStyles();

  const onChooseColor = (tempColor: string) => (e?: GestureResponderEvent) => {
    e?.preventDefault();
    requestAnimationFrame(() => {
      setColor(tempColor);
      setOpenColor();
    });
  };

  if (openColor) {
    return (
      <View
        style={apply('p-4 absolute z-50 bg-white bottom-0 left-0 border-t')}>
        <View style={apply('row justify-between wrap')}>
          {Object.keys(tempKidsColors).map(key => (
            <TouchableOpacity
              onPress={onChooseColor(tempKidsColors[key])}
              activeOpacity={0.75}
              key={key}
              style={[
                apply(
                  'w%30 h-50 mb-4 rounded-md',
                  'justify-center items-center',
                ),
                {backgroundColor: tempKidsColors[key]},
              ]}>
              {tempKidsColors[key] === color ? (
                <Icon name="check" color={colors.white} size={20} />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  return null;
}

export default memo(PaintingFooterPalette);
