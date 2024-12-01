import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDebounce} from 'use-debounce';
import {useStoreSearch} from '../../stores';

export default function useController() {
  const navigation = useNavigation();
  const {loading, searchKeyword} = useStoreSearch();

  // Keyword state
  const [keyword, setKeyword] = useState('');
  const [dKeyword] = useDebounce(keyword, 1000);

  // Pagination state
  // const [page, setPage] = useState()

  const onGoCanvas = () => {
    requestAnimationFrame(() => {
      navigation.navigate('CANVAS_SCREEN');
    });
  };

  // Get data based on dKeyword
  useEffect(() => {
    if (dKeyword.length >= 3) {
      searchKeyword(dKeyword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dKeyword]);

  return {loading, onGoCanvas, setKeyword};
}
