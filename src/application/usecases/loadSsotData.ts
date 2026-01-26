import { SsotRepository } from '../../domain/repositories/SsotRepository';
import type { PanelTemplate } from '../../domain/types/panelTemplate';
import type { DesignLayout } from '../../domain/types/designLayout';

export type SsotData = {
  panelTemplate: PanelTemplate;
  designLayout: DesignLayout;
};

/**
 * @ssot SSOTリポジトリのみを参照してデータを取得します。
 * @accuracy SSOTの数値は±0.3mmの精度要求を満たすため変更しません。
 * @algorithm リポジトリからPanelTemplateとDesignLayoutを取得してまとめます。
 */
export const loadSsotData = (repository: SsotRepository): SsotData => {
  return {
    panelTemplate: repository.getPanelTemplate(),
    designLayout: repository.getDesignLayout()
  };
};
