import React from 'react';
import Text from '../../../components/Text';
import {Image, TouchableOpacity} from 'react-native';
import {useStyles} from 'osmicsx';
import {BASE_URL} from '../../../../env';

interface Props {
  item: any;
  onPress: () => void;
}

export default function ItemDetail({item, onPress}: Props) {
  const {apply} = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={apply('w%47.5 p-4 mb-4 bg-white shadow rounded-lg')}>
      <Image
        source={{
          uri: `${BASE_URL}${item?.image?.formats?.thumbnail?.url ?? ''}`,
        }}
        resizeMode="cover"
        style={apply('w-100 h-100 rounded-full self-center')}
      />
      <Text type="BOLD" size="SM" textAlign="center" className="mt-4">
        {item?.title ?? ''}
      </Text>
    </TouchableOpacity>
  );
}
