import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStaticNavigation} from '@react-navigation/native';

// Import screen here...
import CanvasScreen from './CanvasScreen';

// Root of screen
const RootStack = createNativeStackNavigator({
  initialRouteName: 'CANVAS_SCREEN',
  screenOptions: {
    navigationBarHidden: true,
    statusBarHidden: true,
  },
  screens: {
    CANVAS_SCREEN: {
      screen: CanvasScreen,
      options: {
        headerShown: false,
      },
    },
  },
});

// Navigation screen
export const Navigation = createStaticNavigation(RootStack);
