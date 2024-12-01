import {useStyles} from 'osmicsx';
import React from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {coreStyles} from '../../styles';
import {TextInput} from '../../components/Forms';
import ItemKeyword from './components/ItemKeyword';
import useController from './useController';
import HeaderKeyword from './components/HeaderKeyword';

const DATA = Array.from({length: 20}, (_, index) => ({
  id: index.toString(),
  title: `Item ${index + 1}`,
}));

export default function SearchByKeywordScreen() {
  const {apply} = useStyles();
  const {loading, onGoCanvas, setKeyword} = useController();

  const renderItem = () => <ItemKeyword onPress={onGoCanvas} />;
  const renderHeader = () => <HeaderKeyword isLoading={loading} />;

  return (
    <SafeAreaView style={apply('flex')}>
      <View style={apply(coreStyles.section)} />

      {/* Search Keyword */}
      <View style={apply(coreStyles.section)}>
        <TextInput
          label="Kata Kunci"
          placeholder="Cari berdasarkan kata kunci"
          onChangeText={setKeyword}
        />
      </View>

      {/* List image */}
      <FlatList
        data={DATA}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={apply(coreStyles.section, 'mt-4')}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
}
