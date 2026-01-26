import { SsotRepository } from '../domain/repositories/SsotRepository';
import { loadSsotData } from '../application/usecases/loadSsotData';
import { downloadBlankPdf } from '../application/usecases/downloadBlankPdf';
import { uiText } from '../constants/uiText';
import { PanelCanvas } from './components/PanelCanvas';

/**
 * @ssot SSOTの参照データのみを表示に使用します。
 * @accuracy SSOTの数値は変換や補正を行わず描画に使用します。
 * @algorithm SSOT読込→Konva描画→PDFダウンロード導線を提供します。
 */
export const App = () => {
  const repository = new SsotRepository();
  const { panelTemplate, designLayout } = loadSsotData(repository);

  /**
   * @ssot SSOTのDesignLayoutを参照してPDFを生成します。
   * @accuracy SSOT寸法に対する変換処理のみでPDFを作成します。
   * @algorithm PDF生成ユースケースを実行します。
   */
  const handleDownload = async () => {
    await downloadBlankPdf(designLayout);
  };

  return (
    <div className="app">
      <div className="header">
        <div>
          <h1>{uiText.appTitle}</h1>
          <p>{uiText.appDescription}</p>
        </div>
        <button type="button" onClick={handleDownload}>
          {uiText.downloadButtonLabel}
        </button>
      </div>
      <div className="canvas-wrapper">
        <PanelCanvas panelTemplate={panelTemplate} />
      </div>
    </div>
  );
};
