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
  const [page, setPage] = useState(1);
  const [dPage] = useDebounce(page, 1000);

  const onPrev = () => {
    requestAnimationFrame(() => {
      setPage(v => v - 1);
    });
  };

  const onNext = () => {
    requestAnimationFrame(() => {
      setPage(v => v + 1);
    });
  };

  const onSetKeyword = (txt: string) => {
    setKeyword(txt);
    setPage(1);
  };

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
      searchKeyword({name: dKeyword, page: dPage});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dKeyword, dPage]);

  return {
    page,
    loading,
    imageList,
    keyword,
    onPrev,
    onNext,
    onProcessingAsset,
    onSetKeyword,
  };
}
