import React from 'react';
import {OsmiProvider, useStyles} from 'osmicsx';
import {SafeAreaView, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Drawing from './components/Drawing';
import osmiConfig from '../osmi.config';

function Main() {
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

export default function App() {
  return (
    <OsmiProvider theme={osmiConfig}>
      <Main />
    </OsmiProvider>
  );
}
