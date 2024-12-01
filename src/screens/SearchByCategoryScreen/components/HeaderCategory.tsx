import React from 'react';
import Text from '../../../components/Text';
import {ActivityIndicator} from 'react-native';

interface Props {
  isLoading: boolean;
}

export default function HeaderCategory({isLoading}: Props) {
  return (
    <>
      <Text size="LG" className="mb-4">
        Pilih kategori di bawah ini:
      </Text>

      {isLoading ? <ActivityIndicator size="large" /> : null}
    </>
  );
}
