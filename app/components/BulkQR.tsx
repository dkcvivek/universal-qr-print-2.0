import React, { useState } from "react";
import { QRFormData } from "../types/types";
import { Icon } from "@iconify/react";

type BulkQRProps = {
  formData: QRFormData;
  setFormData: React.Dispatch<React.SetStateAction<QRFormData>>;
  handleGeneratorBulkQR: () => void;
};

const BulkQR = ({
  formData,
  setFormData,
  handleGeneratorBulkQR,
}: BulkQRProps) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
    if (file) {
      setFileName(file.name);
    }
  };
  return (
    <>
      <label
        htmlFor="file-upload"
        className="flex items-center justify-between border px-6 py-2 rounded-md w-full cursor-pointer bg-white hover:bg-gray-50"
      >
        <span className="text-gray-500 truncate">
          {fileName || "Select a file..."}
        </span>
        <span className="text-blue-600 font-medium">Browse</span>
      </label>

      <input
        id="file-upload"
        type="file"
        accept=".xlsx,.csv,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {formData.file && (
        <div className="w-auto bg-gray-50 flex items-center justify-between gap-4">
          <div>
            <Icon icon="mage:file-2-fill" width="24" height="24" />
          </div>
        </div>
      )}

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-md"
        onClick={handleGeneratorBulkQR}
      >
        Generate Bulk QR
      </button>
    </>
  );
};

export default BulkQR;
