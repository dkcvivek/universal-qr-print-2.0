import { useMemo } from "react";

type UseLabelLayoutProps = {
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
};

export const useLabelLayout = ({ label, qr }: UseLabelLayoutProps) => {
  return useMemo(() => {
    const { width, height } = label;
    const {
      position,
      isLabelVisible,
      isQRTextVisible,
      paddingX,
      paddingY,
    } = qr;

    const contentWidth = Math.max(width - paddingX * 2, 0);
    const contentHeight = Math.max(height - paddingY * 2, 0);

    const qrTextFontSize = Math.min(9, height * 0.15);
    const qrTextHeight = isQRTextVisible ? qrTextFontSize + 4 : 0;

    /* ---------------- LABEL TEXT ---------------- */
    const labelFontSize = Math.min(12, height * 0.3);

    /* ---------------- WIDTH DISTRIBUTION ---------------- */
    const hasLabel = isLabelVisible;

    const qrColumnWidth = hasLabel
      ? contentWidth * 0.4
      : contentWidth;

    /* ---------------- QR SIZE ---------------- */
    const qrSize = Math.max(
      Math.min(qrColumnWidth, contentHeight - qrTextHeight),
      0
    );

    /* ---------------- QR BLOCK CENTERING ---------------- */
    const qrBlockHeight = qrSize + qrTextHeight;
    const qrY = paddingY + (contentHeight - qrBlockHeight) / 2;

    /* ---------------- X POSITIONS ---------------- */
    const qrX =
      position === "qr-left"
        ? paddingX
        : width - paddingX - qrSize;

    const labelX =
      position === "qr-left"
        ? paddingX + qrSize + (hasLabel ? paddingX : 0)
        : paddingX;

    const labelWidth =
      hasLabel
        ? contentWidth - qrSize - paddingX
        : 0;

    /* ---------------- LABEL VERTICAL CENTER ---------------- */
    const labelY = (height - labelFontSize) / 2;

    return {
      qr: {
        x: qrX,
        y: qrY,
        size: qrSize,
        textY: qrY + qrSize + 2,
        textFontSize: qrTextFontSize,
        showText: isQRTextVisible,
      },
      label: {
        x: labelX,
        y: labelY,
        width: labelWidth,
        fontSize: labelFontSize,
        show: isLabelVisible,
      },
      debug: {
        contentWidth,
        contentHeight,
      },
    };
  }, [label, qr]);
};
