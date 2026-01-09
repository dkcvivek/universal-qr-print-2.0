import React, { SetStateAction, useState } from "react";
import { QRFormData, QRJob } from "../types/types";
import Modal from "./Modal";
import { validateForm } from "../helper/function";

type SingleQRProps = {
  formData: QRFormData;
  setFormData: React.Dispatch<SetStateAction<QRFormData>>;
  onBack: () => void;
  onSaveComplete: () => void;
  setJobs: React.Dispatch<SetStateAction<QRJob[]>>;
};

const SingleQR = ({
  formData,
  setFormData,
  onBack,
  onSaveComplete,
  setJobs,
}: SingleQRProps) => {
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>("");

  const handleChange = <K extends keyof QRFormData>(
    key: K,
    value: QRFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerateQR = async () => {
    try {
      const isValid = validateForm("single", formData);
      if (!isValid) return;

      console.log("Single QR generated response:", formData);
      setIsGenerated(true);
      setPdfUrl("https://pdfobject.com/pdf/sample.pdf");
    } catch (error) {
      console.error("Single QR generation error:", error);
    }
  };

  const handleDownload = async () => {
    if (!pdfUrl) return;
    const res = await fetch(pdfUrl);
    const blob = await res.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr_${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            Home
          </button>

          <button onClick={onBack} className="bg-blue-600 text-white px-3 py-1 rounded-md">
            ← Back
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-base font-medium mb-1">QR Code</label>
            <input
              type="text"
              name="qrCode"
              value={formData.qrCode}
              onChange={(e) => handleChange("qrCode", e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-1">Text</label>
            <input
              type="text"
              name="text"
              value={formData.text}
              onChange={(e) => handleChange("text", e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-1">
              Choose Template
            </label>
            <select
              name="template"
              value={formData.template}
              onChange={(e) => handleChange("template", e.target.value)}
              className="w-full border rounded-md p-2 text-xs"
            >
              <option value="" disabled></option>
              <option value="template1">Template 1</option>
              <option value="template2">Template 2</option>
            </select>
          </div>

          <button
            type="button"
            className="bg-blue-600 text-white px-6 py-2 rounded-md mt-2"
            onClick={handleGenerateQR}
          >
            Generate QR
          </button>
        </div>

        {isGenerated && (
          <div className="flex items-center justify-center mt-8">
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-md"
              onClick={() => setIsSaveModalOpen(true)}
            >
              Save for 24 hr
            </button>
          </div>
        )}

        {pdfUrl && (
          <div className="mt-8 space-y-4">
            <div className="flex justify-end">
              <button
                onClick={handleDownload}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Download PDF
              </button>
            </div>

            <embed
              src={pdfUrl}
              width="100%"
              height="600px"
              title="Native PDF Viewer"
            />
          </div>
        )}
      </div>

      {isSaveModalOpen && (
        <Modal
          setter={setIsSaveModalOpen}
          pdfUrl={pdfUrl}
          onSaveComplete={onSaveComplete}
          setJobs={setJobs}
        />
      )}
    </>
  );
};

export default SingleQR;
