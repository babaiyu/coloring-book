import React from 'react';
import Icon from '@react-native-vector-icons/fontawesome6';
import {colors} from '../../constants';
import {useStyles} from 'osmicsx';
import {Alert, Platform, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLines} from '../../stores';
import usePaintingContext from './usePaintingContext';

const headerHeight = Platform.OS === 'ios' ? 44 : 56;
const heightContent = `h-${headerHeight}`;

export default function PaintingHeader() {
  const {apply} = useStyles();
  const {reset: resetLines} = useLines();
  const navigation = useNavigation();
  const {saveImage, history} = usePaintingContext();

  // On back
  const onGoBack = () => {
    requestAnimationFrame(() => {
      Alert.alert(
        'Tunggu Sebentar!',
        'Anda yakin ingin keluar? Semua akan terhapus apabila Anda keluar sekarang!',
        [
          {
            text: 'Batal',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Ya, Keluar!',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
      );
    });
  };

  // On reset
  const onReset = () => {
    requestAnimationFrame(() => {
      history.clear();
      resetLines();
    });
  };

  // On save image
  const onSaveImage = () => {
    requestAnimationFrame(async () => {
      await saveImage();
    });
  };

  // On undo history
  const onUndoHistory = () => {
    history.undo();
  };

  // On redo history
  const onRedoHistory = () => {
    history.redo();
  };

  return (
    <View
      style={apply(
        'bg-white px-3',
        'row items-center justify-between',
        'z-100 border-b border-gray-500',
        heightContent,
      )}>
      <TouchableOpacity activeOpacity={0.75} onPress={onGoBack}>
        <Icon name="circle-left" color={colors.black} size={32} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.75} onPress={onReset}>
        <Icon name="trash-can" color={colors.black} size={32} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.75} onPress={onUndoHistory}>
        <Icon
          name="arrow-rotate-left"
          iconStyle="solid"
          color={colors.black}
          size={32}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.75} onPress={onRedoHistory}>
        <Icon
          name="arrow-rotate-right"
          iconStyle="solid"
          color={colors.black}
          size={32}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.75} onPress={onSaveImage}>
        <Icon
          name="download"
          iconStyle="solid"
          color={colors.black}
          size={32}
        />
      </TouchableOpacity>
    </View>
  );
}
