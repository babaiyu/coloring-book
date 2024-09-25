export type TypeObject = {
  [key: string]: string;
};

export type TypeObjectNum = {
  [key: string]: number;
}

export const kidsColors = {
  black: '#222222',
  'kids-green': '#35D461',
  'kids-yellow': '#F9E104',
  'kids-orange': '#F99D07',
  'kids-violet': '#882FF6',
  'kids-blue': '#37B6F6',
  'kids-red': '#FB565A',
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
