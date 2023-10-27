// Formats a number in standard notation (xxxxx.yyyyyy)
export function formatNumber(value: number, decimals?: number): string {
  // We use toLocaleString() instead of toFixed() to avoid getting a number in scientific notation for very large or small values
  return value
    .toLocaleString("en-US", {
      notation: "standard",
      maximumFractionDigits: decimals || 20,
    })
    .replace(/,/g, ""); // Remove thousand separators
}
