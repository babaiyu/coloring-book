import {useStyles} from 'osmicsx';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Text from '../../components/Text';
import {coreStyles} from '../../styles';
import {colors} from '../../constants';
import useController from './useController';

export default function WelcomeScreen() {
  const {apply} = useStyles();
  const {onSearchByKey, onSearchByCategory} = useController();

  return (
    <SafeAreaView style={apply('flex')}>
      <ScrollView>
        <View style={apply(coreStyles.section)} />
        <View style={apply(coreStyles.section)} />

        <View style={apply(coreStyles.section)}>
          <Text type="BOLD" size="6XL" textAlign="center">
            MEWARIKA
          </Text>
        </View>

        <View style={apply(coreStyles.section)}>
          <Image
            source={require('../../assets/kucing_outline.png')}
            resizeMode="cover"
            style={apply('w%100 h/50')}
          />
        </View>
        <View style={apply(coreStyles.section)} />

        <View style={apply(coreStyles.section, 'w%75 self-center')}>
          <Text type="SEMIBOLD" size="4XL" textAlign="center">
            Banyak pilihan gambar yang tersedia untuk segera kamu warnai
          </Text>
          <Text textAlign="center" style={apply('mt-4')}>
            Silahkan pilih jenis pencarian gambar yang kamu suka
          </Text>
        </View>

        <View
          style={apply(coreStyles.section, 'row justify-between items-center')}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={onSearchByKey}
            style={apply(
              'w%47.5 bg-slate-900 py-4 rounded-xl row justify-around items-center',
            )}>
            <Text size="SM" color={colors.white}>
              Kata Kunci
            </Text>
            <Icon name="arrow-right-long" size={12} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={onSearchByCategory}
            style={apply(
              'w%47.5 bg-slate-900 py-4 rounded-xl row justify-around items-center',
            )}>
            <Text size="SM" color={colors.white}>
              Kategori
            </Text>
            <Icon name="arrow-right-long" size={12} color={colors.white} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
