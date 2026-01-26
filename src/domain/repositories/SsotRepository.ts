import panelTemplateJson from '../../../project/panel-template.json';
import designLayoutJson from '../../../project/design.json';
import type { PanelTemplate } from '../types/panelTemplate';
import type { DesignLayout } from '../types/designLayout';

/**
 * @ssot SSOTのJSONのみを参照し、変更不可のコピーを返します。
 * @accuracy 精度要件は±0.3mmを維持するため、数値は変換せず保持します。
 * @algorithm 再帰的にObject.freezeを適用して参照専用のデータを生成します。
 */
const deepFreeze = <T>(value: T): T => {
  if (value && typeof value === 'object') {
    Object.freeze(value);
    /**
     * @ssot ネストしたSSOTオブジェクトも参照専用にします。
     * @accuracy 参照専用化のみ行い数値は変更しません。
     * @algorithm 子要素を走査して再帰的に凍結します。
     */
    const freezeChild = (child: unknown) => {
      deepFreeze(child as object);
    };
    Object.values(value as Record<string, unknown>).forEach(freezeChild);
  }
  return value;
};

export class SsotRepository {
  /**
   * @ssot panel-template.jsonを読み取り、参照専用で返却します。
   * @accuracy SSOTの数値は±0.3mmを前提にそのまま利用します。
   * @algorithm JSONをPanelTemplate型として凍結して返します。
   */
  getPanelTemplate(): PanelTemplate {
    return deepFreeze(panelTemplateJson as PanelTemplate);
  }

  /**
   * @ssot design.jsonを読み取り、参照専用で返却します。
   * @accuracy SSOTの数値は±0.3mmを前提にそのまま利用します。
   * @algorithm JSONをDesignLayout型として凍結して返します。
   */
  getDesignLayout(): DesignLayout {
    return deepFreeze(designLayoutJson as DesignLayout);
  }
}
