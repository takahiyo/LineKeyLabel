import { PDFDocument } from 'pdf-lib';
import type { DesignLayout } from '../../domain/types/designLayout';
import { mmToPoints } from './mmToPoints';

export type BlankPdfResult = {
  bytes: Uint8Array;
  filename: string;
};

/**
 * @ssot SSOTのdesign.jsonにあるページ寸法を参照してPDFを生成します。
 * @accuracy SSOTのmm寸法をポイントへ変換し、±0.3mm要件を維持します。
 * @algorithm pdf-libで空のPDFを生成し、A4横相当のページを追加します。
 */
export const createBlankPdf = async (
  designLayout: DesignLayout
): Promise<BlankPdfResult> => {
  const pdf = await PDFDocument.create();
  const width = mmToPoints(designLayout.page.width_mm);
  const height = mmToPoints(designLayout.page.height_mm);
  pdf.addPage([width, height]);
  const bytes = await pdf.save();
  const filename = `blank-${designLayout.page.size.toLowerCase()}-${designLayout.page.orientation}.pdf`;
  return { bytes, filename };
};
