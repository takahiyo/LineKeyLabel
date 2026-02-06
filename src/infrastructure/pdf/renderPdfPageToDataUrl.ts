import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

type PdfRenderOptions = {
  pageNumber: number;
  scale: number;
};

const workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

GlobalWorkerOptions.workerSrc = workerSrc;

export const renderPdfPageToDataUrl = async (
  data: ArrayBuffer,
  { pageNumber, scale }: PdfRenderOptions,
) => {
  const pdf = await getDocument({ data }).promise;
  try {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas rendering context is unavailable.');
    }
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;
    return canvas.toDataURL('image/png');
  } finally {
    await pdf.destroy();
  }
};
