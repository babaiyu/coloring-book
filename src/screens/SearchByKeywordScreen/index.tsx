import {useStyles} from 'osmicsx';
import React from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {coreStyles} from '../../styles';
import {TextInput} from '../../components/Forms';
import ItemKeyword from './components/ItemKeyword';
import useController from './useController';
import HeaderKeyword from './components/HeaderKeyword';
import {Props} from './types';
import Pagination from '../../components/Pagination';

export default function SearchByKeywordScreen(props: Props) {
  const {apply} = useStyles();
  const paramKeyword = props?.route?.params?.keyword ?? '';
  const {
    page,
    loading,
    imageList,
    keyword,
    onPrev,
    onNext,
    onProcessingAsset,
    onSetKeyword,
  } = useController(props);

  const renderItem = ({item}: {item: any}) => (
    <ItemKeyword item={item} onPress={onProcessingAsset(item?.id)} />
  );
  const renderHeader = () => <HeaderKeyword isLoading={loading} />;

  const renderFooter = () => (
    <View style={apply(coreStyles.section)}>
      <Pagination page={page} onPrev={onPrev} onNext={onNext} />
      <View style={apply('w%100 h-50')} />
    </View>
  );

  return (
    <SafeAreaView style={apply('flex')}>
      <View style={apply(coreStyles.section)} />

      {/* Search Keyword */}
      <View style={apply(coreStyles.section)}>
        <TextInput
          label="Kata Kunci"
          placeholder="Cari berdasarkan kata kunci"
          onChangeText={onSetKeyword}
          value={keyword}
          editable={!((paramKeyword ?? '').length > 0)}
        />
      </View>

      {/* List image */}
      <FlatList
        data={!loading ? imageList?.data ?? [] : []}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={apply(coreStyles.section, 'mt-4')}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}
