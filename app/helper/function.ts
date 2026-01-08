import { QRFormData } from "../types/types";

export const validateForm = (mode: string, formData: QRFormData) => {
  if (mode === "single") {
    if (!formData.qrCode) {
      alert("OR Code is required for single QR generation.");
      return false;
    }

    if (!formData.text) {
      alert("Text is required for single QR generation.");
      return false;
    }

    if (!formData.template) {
      alert("Choose Template for single QR generation.");
      return false;
    }

    return true;
  }

  if (mode === "bulk") {
    if (!formData.file) {
      alert("File is required for bulk QR generation.");
      return false;
    }

    return true;
  }

  alert("Invalid mode selected.");
  return false;
};
