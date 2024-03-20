export function applyMask(mask: string, value: string): string {
  if (!value) return "";

  const isNumber = (value: string) =>
    value.trim() !== "" && !isNaN(Number(value));

  value = value.replace(/\D/g, "");
  for (let i = 0; i < value.length; i += 1) {
    mask = mask.replace("x", value[i]);
  }

  let i = mask.length - 1;
  while (!isNumber(mask[i])) {
    i -= 1;
  }

  return mask.slice(0, i + 1);
}
