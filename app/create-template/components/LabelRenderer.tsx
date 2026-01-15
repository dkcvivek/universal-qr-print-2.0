"use client";

import { TemplateState } from "../types";

export default function LabelRenderer({
  template,
}: {
  template: TemplateState;
}) {
  const { label, qr } = template;

  const isHorizontal = qr.position === "qr-left" || qr.position === "qr-right";
  const hasLabel = qr.isLabelVisible;
  const hasQRText = qr.isQRTextVisible;
  const qrPaddingX = qr.paddingX;
  const qrPaddingY = qr.paddingY;

  const rowDirection =
    qr.position === "qr-right" ? "flex-row-reverse" : "flex-row";

  return (
    <div
      className="border border-black rounded-md bg-white flex overflow-hidden"
      style={{
        width: `${label.width}mm`,
        height: `${label.height}mm`,
      }}
    >
      <div
        className={`flex w-full h-full ${rowDirection} ${
          hasLabel ? "" : "justify-center"
        } items-center gap-0.5`}
        style={{
          padding: `${qrPaddingY}px ${qr.paddingX}px`,
        }}
      >
        <div className="inline-flex flex-col items-center shrink-0 self-start h-full gap-1">
          <div className="flex items-center justify-center h-full">
            <div className="aspect-square h-full max-h-full border border-black flex items-center justify-center">
              QR
            </div>
          </div>

          {qr.isQRTextVisible && (
            <div className="text-[10px] text-gray-600 text-center truncate">
              {qr.text}
            </div>
          )}
        </div>

        {hasLabel && (
          <div className={`flex-1 text-xs wrap-break-word`}>
            {qr.labelName}
          </div>
        )}
      </div>
    </div>
  );
}
