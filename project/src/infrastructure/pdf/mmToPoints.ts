/**
 * @ssot SSOTに含まれるmm値を変換するための補助関数です。
 * @accuracy 1inch=25.4mm, 1pt=1/72inchの換算により±0.3mm精度を保持します。
 * @algorithm mm値に72/25.4を乗算しポイントへ変換します。
 */
export const mmToPoints = (valueMm: number): number => {
  return (valueMm * 72) / 25.4;
};
