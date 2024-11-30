import React from 'react';
import Text from '../../../components/Text';
import {Image, TouchableOpacity} from 'react-native';
import {useStyles} from 'osmicsx';

const IMG_URL =
  'https://images.unsplash.com/photo-1642403944864-04ad7f092eff?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

interface Props {
  onPress: () => void;
}

export default function ItemDetail({onPress}: Props) {
  const {apply} = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={apply('w%47.5 p-4 mb-4 bg-white shadow rounded-lg')}>
      <Image
        source={{uri: IMG_URL}}
        resizeMode="cover"
        style={apply('w-100 h-100 rounded-full self-center')}
      />
      <Text type="BOLD" size="SM" textAlign="center" className="mt-4">
        Pohon Pisang
      </Text>
    </TouchableOpacity>
  );
}
