import { ChangeEvent, useState } from 'react';
import { SsotRepository } from '../domain/repositories/SsotRepository';
import { loadSsotData } from '../application/usecases/loadSsotData';
import { downloadBlankPdf } from '../application/usecases/downloadBlankPdf';
import { uiText } from '../constants/uiText';
import { uploadAcceptTypes, uploadConfig } from '../config/uploadConfig';
import { renderPdfPageToDataUrl } from '../infrastructure/pdf/renderPdfPageToDataUrl';
import { PanelCanvas } from './components/PanelCanvas';
import { useThemeSync } from './hooks/useThemeSync';

/**
 * @ssot SSOTの参照データのみを表示に使用します。
 * @accuracy SSOTの数値は変換や補正を行わず描画に使用します。
 * @algorithm SSOT読込→Konva描画→PDFダウンロード導線を提供します。
 */
export const App = () => {
  useThemeSync();

  const repository = new SsotRepository();
  const { panelTemplate, designLayout } = loadSsotData(repository);
  const [bgImageSrc, setBgImageSrc] = useState<string | null>(null);

  /**
   * @ssot SSOTのDesignLayoutを参照してPDFを生成します。
   * @accuracy SSOT寸法に対する変換処理のみでPDFを作成します。
   * @algorithm PDF生成ユースケースを実行します。
   */
  const handleDownload = async () => {
    await downloadBlankPdf(designLayout);
  };

  /**
   * @ssot アップロード画像をDataURLとして状態に取り込みます。
   * @accuracy 選択画像の内容をそのまま描画用に渡します。
   * @algorithm FileReaderで読み取り、Canvasへ渡すためのstateに格納します。
   */
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.type === uploadConfig.pdfMimeType) {
      const arrayBuffer = await file.arrayBuffer();
      const dataUrl = await renderPdfPageToDataUrl(arrayBuffer, {
        pageNumber: uploadConfig.pdfPageNumber,
        scale: uploadConfig.pdfRenderScale,
      });
      setBgImageSrc(dataUrl);
      return;
    }

    if (uploadConfig.imageMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        setBgImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <div>
          <h1>{uiText.appTitle}</h1>
          <p>{uiText.appDescription}</p>
        </div>
        <div className="header-actions">
          <label className="upload-button">
            {uiText.uploadButtonLabel}
            <input
              type="file"
              accept={uploadAcceptTypes}
              onChange={handleFileChange}
              className="upload-input"
            />
          </label>
          <button type="button" onClick={handleDownload}>
            {uiText.downloadButtonLabel}
          </button>
        </div>
      </div>
      <div className="canvas-wrapper">
        <PanelCanvas panelTemplate={panelTemplate} bgImageSrc={bgImageSrc} />
      </div>
    </div>
  );
};
