import {
  DataSource,
  ImageFormat,
  SkiaDomView,
  type SkPaint,
  type SkPath,
  useCanvasRef,
} from '@shopify/react-native-skia';
import React, {createContext, ReactNode, RefObject} from 'react';
import * as RNFS from '@dr.pogodin/react-native-fs';
import {requestCameraRoll} from '../../utils';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Alert} from 'react-native';
import {useLines} from '../../stores';

type LinePath = {
  path: SkPath;
  paint: SkPaint;
};

type HistoryType = {
  undo: LinePath[];
  redo: LinePath[];
};

export type PaintingProviderType = {
  bareImage?: DataSource;
  drawRef?: RefObject<SkiaDomView>;
  strokes?: Array<number>;
  saveImage: Function;
  history: {
    undo: () => void;
    redo: () => void;
    clear: () => void;
    push: (path: LinePath) => void;
  };
};

export interface PaintingProvider {
  bareImage?: DataSource | string;
  children?: ReactNode;
}

const history: HistoryType = {
  undo: [],
  redo: [],
};

const strokes = [2, 4, 6, 8, 10];

export const PaintingContext = createContext<PaintingProviderType>({
  saveImage: () => {},
  history: {
    undo: () => {},
    redo: () => {},
    clear: () => {},
    push: () => {},
  },
});

// File saved location
const album = 'album-drawing';
const albumPictureDirectoryPath = `${RNFS.DocumentDirectoryPath}/${album}`;

export default function PaintingProvider({
  children,
  bareImage,
}: PaintingProvider) {
  const drawRef = useCanvasRef();
  const {setLines} = useLines();

  // Undo history function
  const undo = () => {
    if (history.undo.length === 0) {
      return;
    }
    let lastPath = history.undo.slice(-1)[0];
    history.redo.push(lastPath);
    history.undo.splice(history.undo.length - 1, 1);
    setLines([...history.undo]);
  };

  // Redo history function
  const redo = () => {
    if (history.redo.length === 0) {
      return;
    }
    let lastPath = history.redo.slice(-1)[0];
    history.redo.splice(history.redo.length - 1, 1);
    history.undo.push(lastPath);
    setLines([...history.undo]);
  };

  // Clear history
  const clear = () => {
    history.undo = [];
    history.redo = [];
  };

  // Push the history
  const push = (path: LinePath) => {
    history.undo.push(path);
    history.redo = [];
  };

  // Save image to local device
  const saveImage = async () => {
    try {
      await requestCameraRoll();
      const img = drawRef.current?.makeImageSnapshot();
      const png = img?.encodeToBase64(ImageFormat.PNG, 100) || '';

      await RNFS.mkdir(albumPictureDirectoryPath);

      const imgAddress = `${albumPictureDirectoryPath}/${Date.now()}.png`;
      await RNFS.writeFile(imgAddress, png, 'base64');
      await CameraRoll.saveAsset(imgAddress, {
        type: 'photo',
        album,
      });

      await RNFS.unlink(imgAddress);
      Alert.alert('Success', 'Berhasil menyimpan gambar');
    } catch (error) {
      Alert.alert('Maaf...', 'Gagal menyimpan gambar, silahkan coba kembali!');
    }
  };

  return (
    <PaintingContext.Provider
      value={{
        bareImage,
        strokes,
        drawRef,
        saveImage,
        history: {
          undo,
          redo,
          clear,
          push,
        },
      }}>
      {children}
    </PaintingContext.Provider>
  );
}
