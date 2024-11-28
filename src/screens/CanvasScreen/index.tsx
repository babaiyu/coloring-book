import React from 'react';
import {useStyles} from 'osmicsx';
import {SafeAreaView, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Drawing from '../../components/Drawing';

export default function CanvasScreen() {
  const {apply} = useStyles();

  return (
    <GestureHandlerRootView style={apply('flex')}>
      <SafeAreaView style={apply('flex')}>
        <View style={apply('flex bg-slate-900')}>
          <Drawing />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
