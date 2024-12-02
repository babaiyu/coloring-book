import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDebounce} from 'use-debounce';
import {useStoreSearch} from '../../stores';

export default function useController() {
  const navigation = useNavigation();
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

  // Get data based on dKeyword
  useEffect(() => {
    if (dKeyword.length >= 3) {
      searchKeyword({name: dKeyword, page});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dKeyword]);

  return {loading, imageList, onProcessingAsset, setKeyword};
}
