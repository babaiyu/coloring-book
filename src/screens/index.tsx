import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';

// Import screen here...
import CanvasScreen from './CanvasScreen';
import WelcomeScreen from './WelcomeScreen';
import SearchByKeywordScreen from './SearchByKeywordScreen';
import SearchByCategoryScreen from './SearchByCategoryScreen';
import SearchCategoryDetailScreen from './SearchCategoryDetailScreen';

// Root of screen
const RootStack = createNativeStackNavigator({
  initialRouteName: 'WELCOME_SCREEN',
  screenOptions: {
    navigationBarHidden: true,
    statusBarHidden: true,
    animation: 'ios_from_right',
  },
  screens: {
    WELCOME_SCREEN: {
      screen: WelcomeScreen,
      options: {headerShown: false},
    },
    CANVAS_SCREEN: {
      screen: CanvasScreen,
      options: {headerShown: false},
    },
    SEARCH_BY_KEYWORD_SCREEN: {
      screen: SearchByKeywordScreen,
      options: {title: 'Pencarian Kata Kunci'},
    },
    SEARCH_BY_CATEGORY_SCREEN: {
      screen: SearchByCategoryScreen,
      options: {title: 'Pencarian Kategori'},
    },
    SEARCH_CATEGORY_DETAIL_SCREEN: {
      screen: SearchCategoryDetailScreen,
      options: {title: ''},
    },
  },
});

// For static type of navigation
type RootStackParamList = StaticParamList<typeof RootStack>;

// Declare it as global
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Navigation screen
export const Navigation = createStaticNavigation(RootStack);
