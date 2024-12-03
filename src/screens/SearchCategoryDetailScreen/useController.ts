import {useNavigation} from '@react-navigation/native';
import {Props} from './types';
import {useEffect, useState} from 'react';
import {useStoreSearch} from '../../stores';

export default function useController({route: {params}}: Props) {
  const {title = '', slug} = params;
  const navigation = useNavigation();
  const {loading, subCategories, getSubCategories} = useStoreSearch();

  // Pagination
  const [page] = useState(1);

  // Get sub categories
  useEffect(() => {
    // Set title header
    navigation.setOptions({
      headerTitle: `Kategori - ${title}`,
    });

    getSubCategories({slug, page});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, title]);

  const onSearchKeyword = (item: any) => () => {
    requestAnimationFrame(() => {
      // navigation.navigate('CANVAS_SCREEN');
      navigation.navigate('SEARCH_BY_KEYWORD_SCREEN', {
        keyword: item?.title ?? '',
      });
    });
  };

  return {loading, subCategories, onSearchKeyword};
}
