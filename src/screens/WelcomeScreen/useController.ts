import {useNavigation} from '@react-navigation/native';

export default function useController() {
  const navigation = useNavigation();

  // Go to search by keyword
  const onSearchByKey = () => {
    requestAnimationFrame(() => {
      navigation.navigate('SEARCH_BY_KEYWORD_SCREEN', {keyword: undefined});
    });
  };

  // Go to search by category
  const onSearchByCategory = () => {
    requestAnimationFrame(() => {
      navigation.navigate('SEARCH_BY_CATEGORY_SCREEN');
    });
  };

  return {onSearchByKey, onSearchByCategory};
}
