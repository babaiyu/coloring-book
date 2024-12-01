import {useStyles} from 'osmicsx';
import React, {useId} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {coreStyles} from '../../styles';
import ItemCategory from './components/ItemCategory';
import useController from './useController';
import HeaderCategory from './components/HeaderCategory';

export default function SearchByCategoryScreen() {
  const flatlistID = useId();
  const {apply} = useStyles();
  const {loading, categories, onCategoryDetail} = useController();

  const renderItem = ({item}: {item: any}) => (
    <ItemCategory item={item} onPress={onCategoryDetail(item)} />
  );
  const renderHeader = () => <HeaderCategory isLoading={loading} />;

  return (
    <SafeAreaView style={apply('flex')}>
      <FlatList
        id={flatlistID}
        numColumns={2}
        data={!loading ? categories?.data ?? [] : []}
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
