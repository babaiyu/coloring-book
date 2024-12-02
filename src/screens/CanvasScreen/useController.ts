import {useEffect} from 'react';
import {useLines, useStoreSearch, useTools} from '../../stores';

export default function useController() {
  const {resetAssetID} = useStoreSearch();
  const {reset: resetLines} = useLines();
  const {reset: resetTools} = useTools();

  // Always reset everything when closing the Canvas screen!
  useEffect(() => {
    return () => {
      Promise.all([resetAssetID(), resetLines(), resetTools()]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
}
