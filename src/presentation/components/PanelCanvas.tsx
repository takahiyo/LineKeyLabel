import { useEffect, useRef, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { uiConfig } from '../../config/uiConfig';
import type { PanelTemplate } from '../../domain/types/panelTemplate';

type PanelCanvasProps = {
  panelTemplate: PanelTemplate;
};

/**
 * @ssot SSOT由来のPanelTemplateのみを参照してキャンバスを描画します。
 * @accuracy SSOTのmm寸法は±0.3mm要件を維持するためそのまま利用します。
 * @algorithm ResizeObserverで表示領域を取得し、mm寸法を比率換算して描画します。
 */
const useElementWidth = (element: HTMLDivElement | null): number => {
  const [width, setWidth] = useState(0);

  /**
   * @ssot 表示領域の幅をSSOT描画の比率に反映させます。
   * @accuracy 幅の取得値を直接使用し、SSOT寸法への換算誤差を抑えます。
   * @algorithm ResizeObserverの結果から幅を更新します。
   */
  const handleResize = (entries: ResizeObserverEntry[]) => {
    entries.forEach((entry) => {
      setWidth(entry.contentRect.width);
    });
  };

  /**
   * @ssot 参照専用のSSOT描画に必要な表示幅を監視します。
   * @accuracy リサイズイベントの値をそのまま採用します。
   * @algorithm ResizeObserverを生成し、クリーンアップで解除します。
   */
  const setupObserver = () => {
    if (!element) {
      return undefined;
    }
    const observer = new ResizeObserver(handleResize);
    observer.observe(element);
    return () => observer.disconnect();
  };

  useEffect(setupObserver, [element]);

  return width;
};

/**
 * @ssot SSOTのPanelTemplateだけを参照し、Konvaで矩形を描画します。
 * @accuracy SSOTのmm値から描画比率を算出し、寸法誤差を抑えます。
 * @algorithm コンテナ幅に合わせたスケールを算出し矩形を表示します。
 */
export const PanelCanvas = ({ panelTemplate }: PanelCanvasProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerWidth = useElementWidth(containerRef.current);
  const { width: boundsWidth, height: boundsHeight } = panelTemplate.bounds_mm;
  const scale = containerWidth > 0 ? containerWidth / boundsWidth : 1;
  const stageWidth = boundsWidth * scale;
  const stageHeight = boundsHeight * scale;

  return (
    <div ref={containerRef}>
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={stageWidth}
            height={stageHeight}
            stroke={uiConfig.canvas.borderColor}
            strokeWidth={uiConfig.canvas.borderWidth}
            fill={uiConfig.canvas.backgroundColor}
          />
        </Layer>
      </Stage>
    </div>
  );
};
