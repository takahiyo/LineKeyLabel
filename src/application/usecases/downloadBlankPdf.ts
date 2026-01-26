import type { DesignLayout } from '../../domain/types/designLayout';
import { createBlankPdf } from '../../infrastructure/pdf/createBlankPdf';

/**
 * @ssot SSOT由来のDesignLayoutのみを参照してPDFを生成しダウンロードします。
 * @accuracy SSOTの数値精度を維持し、描画精度に影響する加工は行いません。
 * @algorithm PDF生成後にBlob化し、一時リンクをクリックして保存します。
 */
export const downloadBlankPdf = async (
  designLayout: DesignLayout
): Promise<void> => {
  const { bytes, filename } = await createBlankPdf(designLayout);
  // TS2322対応: 型定義の不整合を回避するため as any でキャストします
  const blob = new Blob([bytes as any], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
