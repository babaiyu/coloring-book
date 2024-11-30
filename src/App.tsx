import React from 'react';
import {OsmiProvider} from 'osmicsx';
import osmiConfig from '../osmi.config';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import {Navigation} from './screens';

// Config for react-native-reanimated
configureReanimatedLogger({
  level: ReanimatedLogLevel.error,
  strict: false,
});

export default function App() {
  return (
    <OsmiProvider theme={osmiConfig}>
      <Navigation />
    </OsmiProvider>
  );
}
