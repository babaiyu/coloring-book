import {
  DataSource,
  ImageFormat,
  SkiaDomView,
  useCanvasRef,
} from '@shopify/react-native-skia';
import React, {createContext, ReactNode, RefObject} from 'react';
import * as RNFS from '@dr.pogodin/react-native-fs';
import {requestCameraRoll} from '../../utils';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Alert} from 'react-native';

export type PaintingProviderType = {
  bareImage?: DataSource;
  drawRef?: RefObject<SkiaDomView>;
  strokes?: Array<number>;
  saveImage: Function;
};

export interface PaintingProvider {
  bareImage?: DataSource | string;
  children?: ReactNode;
}

const strokes = [2, 4, 6, 8, 10];

export const PaintingContext = createContext<PaintingProviderType>({
  saveImage: () => {},
});

// File saved location
const album = 'album-drawing';
const albumPictureDirectoryPath = `${RNFS.DocumentDirectoryPath}/${album}`;

export default function PaintingProvider({
  children,
  bareImage,
}: PaintingProvider) {
  const drawRef = useCanvasRef();

  const saveImage = async () => {
    try {
      await requestCameraRoll();
      const img = drawRef.current?.makeImageSnapshot();
      const jpg = img?.encodeToBase64(ImageFormat.JPEG, 100) || '';

      await RNFS.mkdir(albumPictureDirectoryPath);

      const imgAddress = `${albumPictureDirectoryPath}/${Date.now()}.jpg`;
      await RNFS.writeFile(imgAddress, jpg, 'base64');
      await CameraRoll.saveAsset(imgAddress, {
        type: 'photo',
        album,
      });

      await RNFS.unlink(imgAddress);
      Alert.alert('Success', 'Berhasil menyimpan gambar');
    } catch (error) {
      console.log('Error => ', JSON.stringify(error));
    }
  };

  return (
    <PaintingContext.Provider value={{bareImage, strokes, drawRef, saveImage}}>
      {children}
    </PaintingContext.Provider>
  );
}
