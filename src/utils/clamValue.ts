type TClamValue = {
  value: number;
  min?: number;
  max?: number;
};

export default function clamValue({value, min = 0, max = 100}: TClamValue) {
  return Math.min(max, Math.max(min, value));
}
