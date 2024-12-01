import {useNavigation} from '@react-navigation/native';
import {useStoreSearch} from '../../stores';
import {useEffect, useState} from 'react';

export default function useController() {
  const navigation = useNavigation();
  const {loading, categories, getCategories} = useStoreSearch();

  // Pagination
  const [page] = useState(1);

  const onCategoryDetail = (item: any) => () => {
    requestAnimationFrame(() => {
      navigation.navigate('SEARCH_CATEGORY_DETAIL_SCREEN', {
        slug: item?.slug ?? '',
        title: item?.name ?? '',
      });
    });
  };

  // Get categories
  useEffect(() => {
    getCategories({page});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return {loading, categories, onCategoryDetail};
}
