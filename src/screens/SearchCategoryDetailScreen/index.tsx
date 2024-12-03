import {useStyles} from 'osmicsx';
import React, {useId} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {coreStyles} from '../../styles';
import ItemDetail from './components/ItemDetail';
import {Props} from './types';
import useController from './useController';
import HeaderDetail from './components/HeaderDetail';

export default function SearchCategoryDetailScreen(props: Props) {
  const flatlistID = useId();
  const {apply} = useStyles();
  const {loading, subCategories, onSearchKeyword} = useController(props);

  const renderItem = ({item}: {item: any}) => (
    <ItemDetail item={item} onPress={onSearchKeyword(item)} />
  );
  const renderHeader = () => <HeaderDetail isLoading={loading} />;

  return (
    <SafeAreaView style={apply('flex')}>
      <FlatList
        id={flatlistID}
        numColumns={2}
        data={!loading ? subCategories?.data ?? [] : []}
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
