import {useStyles} from 'osmicsx';
import React, {useId} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {coreStyles} from '../../styles';
import ItemCategory from './components/ItemCategory';
import useController from './useController';
import HeaderCategory from './components/HeaderCategory';

const DATA = Array.from({length: 100}, (_, index) => ({
  id: index.toString(),
  title: `Item ${index + 1}`,
}));

export default function SearchByCategoryScreen() {
  const flatlistID = useId();
  const {apply} = useStyles();
  const {onCategoryDetail} = useController();

  const renderItem = () => <ItemCategory onPress={onCategoryDetail} />;
  const renderHeader = () => <HeaderCategory />;

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
