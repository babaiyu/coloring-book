import React, {memo} from 'react';
import {View} from 'react-native';
import PaintingProvider from './Painting/Painting.provider';
import Painting from './Painting/Painting';
import {useStyles} from 'osmicsx';
import {useStoreSearch} from '../stores';
import PaintingHeader from './Painting/Painting.header';
import PaintingFooter from './Painting/Painting.newfooter';

function Drawing() {
  const {apply} = useStyles();
  const {assetID} = useStoreSearch();

  return (
    <PaintingProvider bareImage={assetID?.url ?? ''}>
      <PaintingHeader />
      <View style={apply('flex justify-center items-center')}>
        <Painting />
      </View>
      <PaintingFooter />
    </PaintingProvider>
  );
}

export default memo(Drawing);
