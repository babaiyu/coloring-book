import {useStyles} from 'osmicsx';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import {colors} from '../constants';
import Text from './Text';

interface Props {
  page: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({page, onPrev, onNext}: Props) {
  const {apply} = useStyles();

  return (
    <View style={apply('row justify-between items-center')}>
      <TouchableOpacity
        onPress={onPrev}
        disabled={page <= 1} // Disable prev when page <= 1
        activeOpacity={0.75}
        style={apply('w%25 items-start')}>
        <Icon
          name="chevron-left"
          iconStyle="solid"
          size={32}
          color={page <= 1 ? '#DDDDDD' : colors.black}
        />
      </TouchableOpacity>
      <Text size="LG" type="SEMIBOLD">
        {page.toString()}
      </Text>
      <TouchableOpacity
        onPress={onNext}
        activeOpacity={0.75}
        style={apply('w%25 items-end')}>
        <Icon
          name="chevron-right"
          iconStyle="solid"
          size={32}
          color={colors.black}
        />
      </TouchableOpacity>
    </View>
  );
}
