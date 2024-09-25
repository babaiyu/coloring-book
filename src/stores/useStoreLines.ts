import {SkPaint, SkPath} from '@shopify/react-native-skia';
import {create} from 'zustand';

type Line = {
  path: SkPath;
  paint: SkPaint;
};
interface State {
  lines: Line[];
  setLines: (completedPaths: Line[]) => void;
}

const useStoreLines = create<State>()(set => ({
  lines: [],
  setLines: lines => {
    set({lines});
  },
}));

export default useStoreLines;
