import clsx from 'clsx';
import React, {useMemo} from 'react';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStyles} from 'osmicsx';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {dimensions} from '../../utils';
import {useTools} from '../../stores';
import {colors} from '../../constants';
import usePaintingContext from './usePaintingContext';

const {width} = dimensions();
const ITEM_SIZE = width / 4;

export default function PaintingFooter() {
  const {apply} = useStyles();
  const {saveImage} = usePaintingContext();

  // Tools function
  const {eraserMode, setOpenColor, setOpenBrush, setEraser} = useTools();

  const tools = useMemo(() => {
    return [
      {
        title: 'Warna',
        icon: 'palette',
        onPress: () => {
          setOpenColor();
        },
        isActive: false,
      },
      {
        title: 'Kuas',
        icon: 'paintbrush',
        onPress: () => {
          setOpenBrush();
        },
        isActive: !eraserMode,
      },
      {
        title: 'Hapus',
        icon: 'eraser',
        onPress: () => {
          setEraser();
        },
        isActive: eraserMode,
      },
      {
        title: 'Simpan',
        icon: 'download',
        onPress: async () => {
          await saveImage();
        },
        isActive: false,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eraserMode]);

  return (
    <>
      <View style={apply(styles.drawWrapper)}>
        {tools.map((tool, idx) => (
          <ToolItem key={idx.toString()} tool={tool} onPress={tool.onPress} />
        ))}
      </View>
    </>
  );
}

// ToolItem
const ToolItem = ({tool, onPress}: {tool: any; onPress: () => void}) => {
  const {apply} = useStyles();

  const _onPress = (e?: GestureResponderEvent) => {
    e?.preventDefault();
    requestAnimationFrame(() => {
      onPress();
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={_onPress}
      style={apply(styles.btnItem, tool?.isActive && styles.btnItemActive)}>
      <Icon
        name={tool?.icon}
        color={tool?.isActive ? colors.white : colors.black}
        size={20}
      />
      <Text style={apply(styles.text, tool?.isActive && styles.textActive)}>
        {tool?.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  drawWrapper: clsx(
    'absolute bottom-0',
    'bg-white',
    'row items-center justify-between z-20',
    `w-${width}`,
  ),
  rowButtons: clsx('row items-center justify-between'),
  btnItem: clsx(
    'justify-center items-center border bg-white',
    `w-${ITEM_SIZE} h-${ITEM_SIZE}`,
  ),
  btnItemActive: 'bg-gray-900',
  text: clsx('text-black text-xs mt-1'),
  textActive: clsx('text-white'),
};
