import {Dimensions} from 'react-native';

export default function dimensions() {
  const actualWidth = Dimensions.get('window').width;
  const actualHeight = Dimensions.get('window').height;

  return {
    width: Math.min(actualWidth, actualHeight),
    height: Math.max(actualWidth, actualHeight),
    actualWidth,
    actualHeight,
  };
}
