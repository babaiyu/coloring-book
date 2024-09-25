import React, {memo} from 'react';
import {type GestureResponderEvent, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'osmicsx';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useTools} from '../../stores';
import {colors, toolsSize, type TypeObjectNum} from '../../constants';

const tempToolsSize: TypeObjectNum = toolsSize;

function PaintingFooterBrush() {
  const {color, toolSize, openBrush, eraserMode, setOpenBrush, setToolSize} =
    useTools();
  const {apply} = useStyles();

  const onChooseToolSize = (size: number) => (e?: GestureResponderEvent) => {
    e?.preventDefault();
    requestAnimationFrame(() => {
      setToolSize(size);
      setOpenBrush();
    });
  };

  if (openBrush) {
    return (
      <View
        style={apply('p-4 absolute z-50 bg-white bottom-0 left-0 border-t')}>
        {Object.keys(tempToolsSize).map(key => (
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={onChooseToolSize(tempToolsSize[key])}
            key={key}
            style={apply('w%100 h-50', 'row justify-between items-center')}>
            <View
              style={[
                apply('w%90', `h-${tempToolsSize[key]}`),
                {backgroundColor: eraserMode ? colors.black : color},
              ]}>
              <></>
            </View>
            {toolSize === tempToolsSize[key] ? (
              <Icon
                name="check"
                color={eraserMode ? colors.black : color}
                size={20}
              />
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return null;
}

export default memo(PaintingFooterBrush);
