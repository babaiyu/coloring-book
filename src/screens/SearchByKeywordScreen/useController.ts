import {useNavigation} from '@react-navigation/native';

export default function useController() {
  const navigation = useNavigation();

  const onGoCanvas = () => {
    requestAnimationFrame(() => {
      navigation.navigate('CANVAS_SCREEN');
    });
  };

  return {onGoCanvas};
}
