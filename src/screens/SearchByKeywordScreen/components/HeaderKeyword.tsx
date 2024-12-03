import {useStyles} from 'osmicsx';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {coreStyles} from '../../../styles';

interface Props {
  isLoading: boolean;
}

export default function HeaderKeyword({isLoading}: Props) {
  const {apply} = useStyles();

  if (isLoading) {
    return (
      <View style={apply(coreStyles.section)}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
