export type PanelTemplate = {
  id: string;
  bounds_mm: {
    width: number;
    height: number;
  };
  holes_mm: Array<{
    x: number;
    y: number;
    diameter: number;
  }>;
};
