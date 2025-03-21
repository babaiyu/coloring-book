import {useEffect} from 'react';
import {Props} from './types';
import {useStoreSearch} from '../../stores';
import {useNavigation} from '@react-navigation/native';

export default function useController({route: {params}}: Props) {
  const navigation = useNavigation();
  const {loading, getAssetID} = useStoreSearch();

  // Get asset by resource_id
  useEffect(() => {
    if (params?.resource_id) {
      getAssetID(params?.resource_id).then(resData => {
        if (resData !== undefined) {
          navigation.reset({
            index: 1,
            routes: [{name: 'WELCOME_SCREEN'}, {name: 'CANVAS_SCREEN'}],
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.resource_id]);

  return {loading};
}
