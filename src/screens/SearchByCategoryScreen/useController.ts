import {useNavigation} from '@react-navigation/native';

export default function useController() {
  const navigation = useNavigation();

  const onCategoryDetail = () => {
    requestAnimationFrame(() => {
      navigation.navigate('SEARCH_CATEGORY_DETAIL_SCREEN', {title: 'Tumbuhan'});
    });
  };

  return {onCategoryDetail};
}
