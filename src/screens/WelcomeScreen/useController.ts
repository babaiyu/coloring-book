import {useNavigation} from '@react-navigation/native';

export default function useController() {
  const navigation = useNavigation();

  const onSearchByKey = () => {
    requestAnimationFrame(() => {
      navigation.navigate('SEARCH_BY_KEYWORD_SCREEN');
    });
  };

  const onSearchByCategory = () => {
    requestAnimationFrame(() => {
      navigation.navigate('SEARCH_BY_CATEGORY_SCREEN');
    });
  };

  return {onSearchByKey, onSearchByCategory};
}
