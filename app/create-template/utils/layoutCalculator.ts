import { TemplateState } from "../types";

export const calculateLayout = (template: TemplateState) => {
  const { page, grid, label } = template;

  const availableWidth = page.width - (page.padding.left + page.padding.right);
  const availableHeight =
    page.height - (page.padding.top + page.padding.bottom);

  const requiredWidth =
    grid.columns * label.width + (grid.columns - 1) * grid.columnGap;

  const requiredHeight =
    grid.rows * label.height + (grid.rows - 1) * grid.rowGap;

    return {
        availableWidth,
        availableHeight,
        requiredWidth,
        requiredHeight
    }
};

export interface LabelPosition {
  x: number;
  y: number;
}

export function calculateLabelPositions(
  template: TemplateState
): LabelPosition[] {
  const { page, grid, label } = template;

  const positions: LabelPosition[] = [];

  const startX = page.padding.left;
  const startY = page.padding.top;

  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.columns; c++) {
      positions.push({
        x: startX + c * (label.width + Number(grid.columnGap)),
        y: startY + r * (label.height + Number(grid.rowGap)),
      });
    }
  }

  return positions;
}
