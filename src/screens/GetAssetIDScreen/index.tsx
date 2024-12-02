import React from 'react';
import {Props} from './types';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {useStyles} from 'osmicsx';
import {coreStyles} from '../../styles';
import Text from '../../components/Text';
import useController from './useController';

export default function GetAssetIDScreen(props: Props) {
  const {apply} = useStyles();
  const {loading} = useController(props);

  return (
    <SafeAreaView style={apply('flex justify-center items-center')}>
      <View style={apply(coreStyles.section)}>
        {loading ? (
          <>
            <Text type="SEMIBOLD" className="mb-4">
              Sedang memproses gambar...
            </Text>
            <ActivityIndicator size="large" />
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
