import {useEffect} from 'react';
import {useLines, useStoreSearch, useTools} from '../../stores';
import {Alert, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function useController() {
  const navigation = useNavigation();
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

  // Handle back action
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Tunggu Sebentar!',
        'Anda yakin ingin keluar? Semua akan terhapus apabila Anda keluar sekarang!',
        [
          {
            text: 'Batal',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Ya, Keluar!',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
      );

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
}
