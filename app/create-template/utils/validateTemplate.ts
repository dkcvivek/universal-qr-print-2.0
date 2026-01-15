import { TemplateState } from "../types";
import { calculateLayout } from "./layoutCalculator";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateTemplate(template: TemplateState): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const { availableWidth, availableHeight, requiredWidth, requiredHeight } =
    calculateLayout(template);

  if (requiredWidth > availableWidth) {
    errors.push(
      `Labels exceed page width. Required: ${requiredWidth}mm, Available: ${availableWidth}mm`
    );
  }

  if (requiredHeight > availableHeight) {
    errors.push(
      `Labels exceed page height. Required: ${requiredHeight}mm, Available: ${availableHeight}mm`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
