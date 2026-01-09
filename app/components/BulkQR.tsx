"use client";
import React, { SetStateAction, useState } from "react";
import { QRFormData, QRJob } from "../types/types";
import { Icon } from "@iconify/react";
import Modal from "./Modal";
import { validateForm } from "../helper/function";

type BulkQRProps = {
  formData: QRFormData;
  setFormData: React.Dispatch<React.SetStateAction<QRFormData>>;
  onBack: () => void;
  onSaveComplete: () => void;
  setJobs: React.Dispatch<SetStateAction<QRJob[]>>;
};

const BulkQR = ({
  formData,
  setFormData,
  onBack,
  onSaveComplete,
  setJobs,
}: BulkQRProps) => {
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
    if (file) {
      setFileName(file.name);
    }
  };

  const handleGeneratorBulkQR = async () => {
    try {
      const isValid = validateForm("bulk", formData);
      if (!isValid) return;

      if (formData.file && formData.file.type === "application/pdf") {
        // setPdfUrl(URL.createObjectURL(formData.file));
        setPdfUrl("https://pdfobject.com/pdf/sample.pdf");
      } else {
        setPdfUrl(null);
      }
      console.log("Bulk QR generated response:", formData);
      setIsGenerated(true);
    } catch (error) {
      console.error("Bulk QR generation error:", error);
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

  // useEffect(() => {
  //   return () => {
  //     if (pdfUrl && pdfUrl.startsWith("blob:")) {
  //       URL.revokeObjectURL(pdfUrl);
  //     }
  //   };
  // }, [pdfUrl]);

  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            Home
          </button>

          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-3 py-2 rounded-md"
          >
            ← Back
          </button>
        </div>

        <div className="flex flex-col gap-4">
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
            <div className="w-auto flex items-center justify-center gap-4">
              <Icon icon="mage:file-2-fill" width="24" height="24" />
            </div>
          )}

          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md mt-2"
            onClick={handleGeneratorBulkQR}
          >
            Generate Bulk QR
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

export default BulkQR;
