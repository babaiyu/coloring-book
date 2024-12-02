import React, {memo} from 'react';
import {View} from 'react-native';
import PaintingProvider from './Painting/Painting.provider';
import Painting from './Painting/Painting';
import {useStyles} from 'osmicsx';
import {useStoreSearch} from '../stores';

function Drawing() {
  const {apply} = useStyles();
  const {assetID} = useStoreSearch();

  return (
    <PaintingProvider
      // bareImage={require('../assets/kucing_outline.png')}
      bareImage={assetID?.url ?? ''}>
      <View style={apply('flex justify-center items-center')}>
        <Painting />
      </View>
    </PaintingProvider>
  );
}

export default memo(Drawing);
