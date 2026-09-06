export function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatRatio(ratio) {
  if (!Number.isFinite(ratio)) return "∞";
  return ratio.toFixed(1);
}
