export const uploadConfig = {
  imageMimeTypes: [
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/svg+xml',
    'image/gif',
  ],
  pdfMimeType: 'application/pdf',
  pdfPageNumber: 1,
  pdfRenderScale: 2,
} as const;

export const uploadAcceptTypes = [
  ...uploadConfig.imageMimeTypes,
  uploadConfig.pdfMimeType,
].join(',');
