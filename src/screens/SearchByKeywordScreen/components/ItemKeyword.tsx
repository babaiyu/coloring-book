import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Text from '../../../components/Text';
import {useStyles} from 'osmicsx';

interface Props {
  item: any;
  onPress: () => void;
}

export default function ItemKeyword({item, onPress}: Props) {
  const {apply, colors: osmiColors} = useStyles();
  const txtColors = osmiColors('gray-500', 'gray-400');

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={apply(
        'h-130',
        'mb-4 px-2 py-4 bg-white rounded-lg shadow-sm',
        'row justify-between',
      )}>
      <Image
        source={{uri: item?.image?.source?.url ?? ''}}
        resizeMode="cover"
        style={apply('w-100 h-100 mr-4')}
      />
      <View style={apply('flex-grow justify-between')}>
        <Text type="BOLD" size="LG">
          {item?.title ?? ''}
        </Text>
        <View style={apply('row')}>
          <Image
            source={{uri: item?.author?.avatar ?? ''}}
            resizeMode="cover"
            style={apply('w-24 h-24 rounded-full mr-2')}
          />
          <Text numberOfLines={3} color={txtColors[0]}>
            {item?.author?.name ?? ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
