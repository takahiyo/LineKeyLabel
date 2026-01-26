export const uiConfig = {
  canvas: {
    backgroundColor: '#f9fafb',
    borderColor: '#1f2937',
    borderWidth: 2,
  },
} as const;

/**
 * @ssot UI描画に必要な配色・サイズのSSOT。
 * @accuracy SSOTの値をそのままKonva描画へ反映します。
 * @algorithm UI変更時はこの設定だけを更新します。
 */
export type UiConfig = typeof uiConfig;
