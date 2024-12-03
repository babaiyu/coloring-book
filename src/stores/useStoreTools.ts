import {create} from 'zustand';
import {colors, toolsSize} from '../constants';

interface TTools {
  // Eraser
  eraserMode: boolean;
  setEraser: () => void;
  clearEraser: () => void;

  // Color
  color: string;
  setColor: (color: string) => void;

  // Open color
  openColor: boolean;
  setOpenColor: () => void;

  // Open brush
  openBrush: boolean;
  setOpenBrush: () => void;

  // tool size
  toolSize: number;
  setToolSize: (toolSize: number) => void;

  // Zooming canvas
  isZooming: boolean;
  setIsZooming: () => void;

  // Reset
  reset: () => void;
}

const useStoreTools = create<TTools>()((set, get) => ({
  // Eraser
  eraserMode: false,
  setEraser() {
    const {eraserMode} = get();
    set({
      eraserMode: !eraserMode,
      color: !eraserMode ? colors.white : colors.black,
    });
  },
  clearEraser() {
    set({eraserMode: false});
  },

  // Color
  color: colors.black,
  setColor(color) {
    set({color});
  },

  // Open color
  openColor: false,
  setOpenColor() {
    const {openColor} = get();
    set({openColor: !openColor, eraserMode: false});
  },

  // Open brush
  openBrush: false,
  setOpenBrush() {
    const {openBrush} = get();
    set({openBrush: !openBrush, eraserMode: false});
  },

  // tool size
  toolSize: toolsSize.small,
  setToolSize(toolSize) {
    set({toolSize});
  },

  // Zooming canvas
  isZooming: false,
  setIsZooming() {
    const {isZooming} = get();
    set({isZooming: !isZooming});
  },

  // Reset
  reset() {
    set({
      eraserMode: false,
      color: colors.black,
      openColor: false,
      openBrush: false,
      toolSize: toolsSize.small,
      isZooming: false,
    });
  },
}));

export default useStoreTools;
