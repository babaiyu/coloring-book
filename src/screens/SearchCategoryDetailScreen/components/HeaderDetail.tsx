import React from 'react';
import Text from '../../../components/Text';
import {ActivityIndicator} from 'react-native';

export default function HeaderDetail({isLoading}: {isLoading: boolean}) {
  return (
    <>
      <Text size="LG" className="mb-4">
        Pilih gambar yang mau diwarnai:
      </Text>

      {isLoading ? <ActivityIndicator size="large" /> : null}
    </>
  );
}
