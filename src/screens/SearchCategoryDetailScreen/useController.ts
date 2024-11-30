import {useNavigation} from '@react-navigation/native';
import {Props} from './types';
import {useEffect} from 'react';

export default function useController({route: {params}}: Props) {
  const {title = ''} = params;
  const navigation = useNavigation();

  // Set title
  useEffect(() => {
    if (title.length > 0) {
      navigation.setOptions({
        headerTitle: `Kategori - ${title}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const onGoCanvas = () => {
    requestAnimationFrame(() => {
      navigation.navigate('CANVAS_SCREEN');
    });
  };

  return {onGoCanvas};
}
