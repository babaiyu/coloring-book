import React from 'react';
import {TextInput as RNTextInput} from 'react-native';
import type {TextInputProps} from 'react-native';
import Text from '../Text';
import {useStyles} from 'osmicsx';

interface Props extends TextInputProps {
  label?: string;
}

export default function TextInput({label = '', ...props}: Props) {
  const {apply, colors: osmiColors} = useStyles();

  const placeholderTextColor: any = osmiColors('gray-400');

  return (
    <>
      {/* Label */}
      <Text type="SEMIBOLD">{label}</Text>

      {/* Text Input */}
      <RNTextInput
        placeholderTextColor={
          props.placeholderTextColor ?? placeholderTextColor
        }
        style={[
          apply(
            'h-40 p-2 mt-2 bg-white border border-gray-400 rounded text-slate-800',
          ),
          props.style,
        ]}
        {...props}
      />
    </>
  );
}
