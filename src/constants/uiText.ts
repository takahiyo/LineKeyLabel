export const uiText = {
  appTitle: 'Line Key Label',
  appDescription: 'SSOT参照のみでパネル寸法を描画しています。',
  downloadButtonLabel: 'A4横PDFをダウンロード',
} as const;

/**
 * @ssot UI表示文言のSSOT。
 * @accuracy 文言はUIの状態と一致させるためここで管理します。
 * @algorithm テキスト変更はこの定義のみを更新します。
 */
export type UiText = typeof uiText;
