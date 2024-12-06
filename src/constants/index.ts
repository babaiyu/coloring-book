export type TypeObject = {
  [key: string]: string;
};

export type TypeObjectNum = {
  [key: string]: number;
};

export const kidsColors = {
  black: '#222222',
  'bright-red': '#FF4C4C',
  'bright-orange': '#FF7F32',
  'bright-yellow': '#FFEB3B',
  'bright-green': '#4CAF50',
  'bright-blue': '#2196F3',
  'bright-purple': '#9C27B0',
  'bright-pink': '#E91E63',
  'bright-cyan': '#00BCD4',
  'bright-lime': '#CDDC39',
  'bright-teal': '#009688',
  'bright-indigo': '#3F51B5',
  'bright-violet': '#673AB7',
  'bright-lavender': '#9C4EFF',
  'bright-turquoise': '#1DE9B6',
  'bright-sunset': '#FF6D00',
  'bright-rose': '#F06292',
  'bright-bubblegum': '#FF4081',
  'bright-peach': '#FFB74D',
  'bright-sky-blue': '#64B5F6',
  'bright-grass': '#8BC34A',
  'bright-sunflower': '#FFEB3B',
  'bright-kiwi': '#8BC34A',
  'bright-coral': '#FF5722',
  'bright-tangerine': '#FF9800',
  'bright-mint': '#00E5FF',
  'bright-sapphire': '#2962FF',
};

export const colors = {
  // Base color
  white: '#FFFFFF',
  'semi-white': '#F0F0F0',

  // Kids color
  ...kidsColors,
};

// Brush & Eraser size
export const toolsSize = {
  small: 4,
  medium: 8,
  semiMedium: 12,
  large: 16,
  semiLarge: 20,
};
