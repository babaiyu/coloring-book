import {useStyles} from 'osmicsx';
import React, {useId} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {coreStyles} from '../../styles';
import ItemDetail from './components/ItemDetail';
import {Props} from './types';
import useController from './useController';
import HeaderDetail from './components/HeaderDetail';

const DATA = Array.from({length: 100}, (_, index) => ({
  id: index.toString(),
  title: `Item ${index + 1}`,
}));

export default function SearchCategoryDetailScreen(props: Props) {
  const flatlistID = useId();
  const {apply} = useStyles();
  const {onGoCanvas} = useController(props);

  const renderItem = () => <ItemDetail onPress={onGoCanvas} />;
  const renderHeader = () => <HeaderDetail />;

  return (
    <SafeAreaView style={apply('flex')}>
      <FlatList
        id={flatlistID}
        numColumns={2}
        data={DATA}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={apply(coreStyles.section)}
        columnWrapperStyle={apply('flex justify-between')}
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={apply('my-4')}
      />
    </SafeAreaView>
  );
}
