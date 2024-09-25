import React, {memo} from 'react';
import {View} from 'react-native';
import PaintingProvider from './Painting/Painting.provider';
import Painting from './Painting/Painting';
import {useStyles} from 'osmicsx';

function Drawing() {
  const {apply} = useStyles();

  return (
    <PaintingProvider bareImage={require('../assets/kucing_outline.png')}>
      <View style={apply('flex justify-center items-center')}>
        <Painting />
      </View>
    </PaintingProvider>
  );
}

export default memo(Drawing);
