import clsx from 'clsx';
import {useStyles} from 'osmicsx';
import React from 'react';
import {Text as RNText} from 'react-native';
import type {TextProps} from 'react-native';
import {colors} from '../constants';

interface Props extends TextProps {
  type?: 'EXTRABOLD' | 'BOLD' | 'SEMIBOLD' | 'MEDIUM' | 'REGULAR';
  size?:
    | '6XL'
    | '5XL'
    | '4XL'
    | '3XL'
    | '2XL'
    | 'XL'
    | 'LG'
    | 'BASE'
    | 'SM'
    | 'XS';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  color?: string;
  className?: string;
}

export default function Text({
  type = 'REGULAR',
  size = 'BASE',
  textAlign = 'left',
  color = colors.black,
  className,
  style,
  ...props
}: Props) {
  const {apply} = useStyles();

  return (
    <RNText
      style={[
        apply(
          clsx({
            // Font family
            'font-regular': type === 'REGULAR',
            'font-extrabold': type === 'EXTRABOLD',
            'font-bold': type === 'BOLD',
            'font-semibold': type === 'SEMIBOLD',
            'font-medium': type === 'MEDIUM',

            // Font size
            'text-xs': size === 'XS',
            'text-sm': size === 'SM',
            'text-base': size === 'BASE',
            'text-lg': size === 'LG',
            'text-xl': size === 'XL',
            'text-2xl': size === '2XL',
            'text-3xl': size === '3XL',
            'text-4xl': size === '4XL',
            'text-5xl': size === '5XL',
            'text-6xl': size === '6XL',

            // Align
            'text-left': textAlign === 'left',
            'text-center': textAlign === 'center',
            'text-right': textAlign === 'right',
            'text-justify': textAlign === 'justify',
          }),
          className,
        ),
        {color},
        style,
      ]}
      {...props}
    />
  );
}
