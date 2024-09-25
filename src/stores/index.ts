import {useCallback} from 'react';
import useStoreLines from './useStoreLines';
import useStoreTools from './useStoreTools';

export const useLines = () =>
  useStoreLines(
    useCallback(
      state => ({
        lines: state.lines,
        setLines: state.setLines,
      }),
      [],
    ),
  );

export const useTools = () =>
  useStoreTools(
    useCallback(
      state => ({
        // Eraser mode
        eraserMode: state.eraserMode,
        setEraser: state.setEraser,

        // Color
        color: state.color,
        setColor: state.setColor,

        // Open color
        openColor: state.openColor,
        setOpenColor: state.setOpenColor,

        // Open brush
        openBrush: state.openBrush,
        setOpenBrush: state.setOpenBrush,

        // tool size
        toolSize: state.toolSize,
        setToolSize: state.setToolSize,
      }),
      [],
    ),
  );
