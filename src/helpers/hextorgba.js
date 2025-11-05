export function hexToRgba(hex, alpha = 1) {
  let cleanedHex = hex.replace(/^#/, "");

  if (cleanedHex.length === 3) {
    cleanedHex = cleanedHex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  if (cleanedHex.length !== 6) {
    throw new Error(`Invalid HEX color: "${hex}"`);
  }

  const r = parseInt(cleanedHex.slice(0, 2), 16);
  const g = parseInt(cleanedHex.slice(2, 4), 16);
  const b = parseInt(cleanedHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
