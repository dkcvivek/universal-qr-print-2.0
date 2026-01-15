"use client";

import { useMemo } from "react";
import { TemplateState } from "../types";
import { mmToPx } from "../utils/unit";
import { calculateLabelPositions } from "../utils/layoutCalculator";
import LabelRenderer from "./LabelRenderer";

interface Props {
  template: TemplateState;
  disabled?: boolean;
}

const TemplatePreview = ({ template, disabled }: Props) => {
  if (disabled) {
    return (
      <div className="text-sm text-gray-500">
        Fix layout issues to preview template
      </div>
    );
  }

  const pageWidthPx = useMemo(
    () => mmToPx(template.page.width),
    [template.page.width]
  );

  const pageHeightPx = useMemo(
    () => mmToPx(template.page.height),
    [template.page.height]
  );

  const labelPositions = useMemo(
    () => calculateLabelPositions(template),
    [template]
  );

  return (
    <div className="bg-gray-300 p-4 flex-1 overflow-auto">
      <div
        className="relative bg-white shadow-lg"
        style={{
          width: pageWidthPx,
          height: pageHeightPx,
        }}
      >
        {labelPositions.map((pos, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{
              left: mmToPx(pos.x),
              top: mmToPx(pos.y),
            }}
          >
            <LabelRenderer template={template}  />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePreview;
