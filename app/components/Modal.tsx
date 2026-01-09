import React, { useEffect, useState } from "react";
import { QRJob, SaveMeta } from "../types/types";

type ModalProps = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  pdfUrl: string | null;
  onSaveComplete: () => void;
  setJobs: React.Dispatch<React.SetStateAction<QRJob[]>>;
};

const Modal = ({ setter, pdfUrl, onSaveComplete, setJobs}: ModalProps) => {
  const [saveMeta, setSaveMeta] = useState<SaveMeta>({
    personName: "",
    purpose: "",
    companyName: "",
  });

  const handleSaveMeta = (meta: SaveMeta) => {
    if (!pdfUrl) return;

    const newJob: QRJob = {
      id: crypto.randomUUID(),
      pdfUrl,
      ...meta,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };

    setJobs((prev) => {
      const updated = [newJob, ...prev];
      localStorage.setItem("qr_jobs", JSON.stringify(updated));
      return updated;
    });
    
    setter(false);
    onSaveComplete();
  };

  useEffect(() => {
    console.log("Updated Metadata:", saveMeta);
  }, [saveMeta]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setter(false)}
        />

        <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 z-10">
          <p className="text-center text-red-600 font-semibold mb-6">
            Warning: These products are visible to everyone
          </p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Person Name"
              value={saveMeta.personName}
              onChange={(e) =>
                setSaveMeta((p) => ({ ...p, personName: e.target.value }))
              }
              className="w-full border rounded-md px-3 py-2"
            />

            <input
              type="text"
              placeholder="Purpose"
              value={saveMeta.purpose}
              onChange={(e) =>
                setSaveMeta((p) => ({ ...p, purpose: e.target.value }))
              }
              className="w-full border rounded-md px-3 py-2"
            />

            <input
              type="text"
              placeholder="Company Name"
              value={saveMeta.companyName}
              onChange={(e) =>
                setSaveMeta((p) => ({ ...p, companyName: e.target.value }))
              }
              className="w-full border-2 border-blue-500 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setter(false)}
              className="px-6 py-2 border rounded-md"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => handleSaveMeta(saveMeta)}
              className="bg-green-600 text-white px-8 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
