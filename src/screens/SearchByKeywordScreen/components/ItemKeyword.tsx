import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Text from '../../../components/Text';
import {useStyles} from 'osmicsx';

const IMG_URL =
  'https://images.unsplash.com/photo-1642403944864-04ad7f092eff?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

interface Props {
  onPress: () => void;
}

export default function ItemKeyword({onPress}: Props) {
  const {apply, colors: osmiColors} = useStyles();
  const txtColors = osmiColors('gray-500', 'gray-400');

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={apply(
        'h-130',
        'mb-4 px-2 py-4 bg-white rounded-lg shadow',
        'row justify-between',
      )}>
      <Image
        source={{uri: IMG_URL}}
        resizeMode="cover"
        style={apply('w-100 h-100 rounded-full mr-4')}
      />
      <View style={apply('flex-grow')}>
        <Text type="BOLD" size="LG">
          Angsa
        </Text>
        <Text numberOfLines={3} color={txtColors[0]}>
          he most advanced AI features, the largest content library, and
          everything the future holds—all in one powerful API that you can set
          up instantly.
        </Text>
      </View>
    </TouchableOpacity>
  );
}
