import React, { SetStateAction } from "react";
import { QRFormData } from "../types/types";

type SingleQRProps = {
  formData: QRFormData;
  setFormData: React.Dispatch<SetStateAction<QRFormData>>;
  handleGenerateQR: () => void;
};

const SingleQR = ({
  formData,
  setFormData,
  handleGenerateQR,
}: SingleQRProps) => {
  const handleChange = <K extends keyof QRFormData>(
    key: K,
    value: QRFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">QR Code</label>
        <input
          type="text"
          name="qrCode"
          value={formData.qrCode}
          onChange={(e) => handleChange("qrCode", e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Text</label>
        <input
          type="text"
          name="text"
          value={formData.text}
          onChange={(e) => handleChange("text", e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Choose Template
        </label>
        <select
          name="template"
          value={formData.template}
          onChange={(e) => handleChange("template", e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="">Select template</option>
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
        </select>
      </div>

      <button
        type="button"
        className="bg-blue-600 text-white px-6 py-2 rounded-md"
        onClick={handleGenerateQR}
      >
        Generate QR
      </button>
    </>
  );
};

export default SingleQR;
