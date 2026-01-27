const colors = {
  primary: '#111827',
  background: '#f9fafb',
  surface: '#ffffff',
  border: '#e5e7eb',
  text: '#111827',
  textMuted: '#6b7280',
  textInverse: '#ffffff',
  canvasBorder: '#1f2937',
} as const;

export const uiConfig = {
  colors,
  canvas: {
    borderColor: colors.canvasBorder,
    backgroundColor: colors.surface,
    borderWidth: 2,
  },
} as const;

/**
 * @ssot UI描画に必要な配色・サイズのSSOT。
 * @accuracy SSOTの値をそのままKonva描画へ反映します。
 * @algorithm UI変更時はこの設定だけを更新します。
 */
export type UiConfig = typeof uiConfig;
