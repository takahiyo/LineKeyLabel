export type DesignLayout = {
  page: {
    size: string;
    orientation: 'portrait' | 'landscape';
    width_mm: number;
    height_mm: number;
  };
  layout: {
    grid: {
      rows: number;
      cols: number;
      gap_mm: number;
    };
    panel_ref: string;
  };
  fonts: {
    label: {
      family: string;
      style: string;
    };
    code: {
      family: string;
      style: string;
    };
  };
};
