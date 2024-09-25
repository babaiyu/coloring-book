import {useContext} from 'react';
import {PaintingContext} from './Painting.provider';

const usePaintingContext = () => useContext(PaintingContext);

export default usePaintingContext;
