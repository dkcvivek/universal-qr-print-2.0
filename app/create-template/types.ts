export type Orientation = "portrait" | "landscape";

export interface TemplateState {
  page: {
    width: number;
    height: number;
    orientation: Orientation;
    padding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
  grid: {
    rows: number;
    columns: number;
    rowGap: number;
    columnGap: number;
  };
  label: {
    width: number;
    height: number;
  };
  qr: {
    text: string;
    labelName: string;
    position: "qr-left" | "qr-right";
    isLabelVisible: boolean;
    isQRTextVisible: boolean;
    paddingX: number;
    paddingY: number;
  };
}
