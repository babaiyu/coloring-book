import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDebounce} from 'use-debounce';
import {useStoreSearch} from '../../stores';
import {Props} from './types';

export default function useController({route: {params}}: Props) {
  const navigation = useNavigation();
  const paramKeyword = params?.keyword ?? '';
  const {loading, imageList, searchKeyword} = useStoreSearch();

  // Keyword state
  const [keyword, setKeyword] = useState('');
  const [dKeyword] = useDebounce(keyword, 1000);

  // Pagination state
  const [page] = useState(1);

  const onProcessingAsset = (resource_id: number) => () => {
    requestAnimationFrame(() => {
      navigation.navigate('GET_ASSET_ID_SCREEN', {resource_id});
    });
  };

  // Set keyword when from category screen
  useEffect(() => {
    if ((paramKeyword ?? '').length >= 3) {
      setKeyword(paramKeyword ?? '');
      navigation.setOptions({
        headerTitle: paramKeyword,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramKeyword]);

  // Get data based on dKeyword
  useEffect(() => {
    if (dKeyword.length >= 3) {
      searchKeyword({name: dKeyword, page});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dKeyword]);

  return {loading, imageList, keyword, onProcessingAsset, setKeyword};
}
