import { useEffect, useMemo, useRef, useState } from 'react';
import { Image as KonvaImage, Layer, Rect, Stage } from 'react-konva';
import { uiConfig } from '../../config/uiConfig';
import type { PanelTemplate } from '../../domain/types/panelTemplate';

type PanelCanvasProps = {
  panelTemplate: PanelTemplate;
  bgImageSrc?: string | null;
  bgOpacity?: number;
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
export const PanelCanvas = ({
  panelTemplate,
  bgImageSrc,
  bgOpacity = 0.5,
}: PanelCanvasProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerWidth = useElementWidth(containerRef.current);
  const { width: boundsWidth, height: boundsHeight } = panelTemplate.bounds_mm;
  const scale = containerWidth > 0 ? containerWidth / boundsWidth : 1;
  const stageWidth = boundsWidth * scale;
  const stageHeight = boundsHeight * scale;

  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);
  useEffect(() => {
    if (!bgImageSrc) {
      setImage(undefined);
      return;
    }
    const img = new Image();
    img.src = bgImageSrc;
    img.onload = () => setImage(img);
  }, [bgImageSrc]);

  const backgroundImage = useMemo(() => {
    if (!image) {
      return null;
    }
    const widthRatio = stageWidth / image.width;
    const heightRatio = stageHeight / image.height;
    const imageScale = Math.min(widthRatio, heightRatio);
    const imageWidth = image.width * imageScale;
    const imageHeight = image.height * imageScale;
    return {
      width: imageWidth,
      height: imageHeight,
      x: (stageWidth - imageWidth) / 2,
      y: (stageHeight - imageHeight) / 2,
    };
  }, [image, stageWidth, stageHeight]);

  return (
    <div ref={containerRef}>
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          {image && backgroundImage && (
            <KonvaImage
              image={image}
              x={backgroundImage.x}
              y={backgroundImage.y}
              width={backgroundImage.width}
              height={backgroundImage.height}
              opacity={bgOpacity}
            />
          )}
          <Rect
            x={0}
            y={0}
            width={stageWidth}
            height={stageHeight}
            stroke={uiConfig.canvas.borderColor}
            strokeWidth={uiConfig.canvas.borderWidth}
            fill={image ? undefined : uiConfig.canvas.backgroundColor}
          />
        </Layer>
      </Stage>
    </div>
  );
};
