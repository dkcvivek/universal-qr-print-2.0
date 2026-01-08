"use client";
import { useState, useEffect } from "react";
import SingleQR from "./components/SingleQR";
import { QRFormData, QRJob, SaveMeta } from "./types/types";
import BulkQR from "./components/BulkQR";
import { validateForm } from "./helper/function";
import Modal from "./components/Modal";
import { useRouter } from "next/navigation";

export const Home = () => {
  const router= useRouter();
  const [formData, setFormData] = useState<QRFormData>({
    qrCode: "",
    text: "",
    template: "",
    file: null as File | null,
  });

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [isRender, setIsRender] = useState<"single" | "bulk" | null>(null);

  const [jobs, setJobs] = useState<QRJob[]>([]);

  useEffect(() => {
    console.log("Updated FormData:", formData);
  }, [formData]);

  useEffect(() => {
    return () => {
      if (pdfUrl && pdfUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  useEffect(() => {
    const stored = localStorage.getItem("qr_jobs");
    if (!stored) return;

    const parsed: QRJob[] = JSON.parse(stored);

    const now = Date.now();
    const validJobs = parsed.filter((job) => job.expiresAt > now);

    setJobs(validJobs);
    localStorage.setItem("qr_jobs", JSON.stringify(validJobs));
  }, []);

  const handleGenerateQR = async () => {
    try {
      const isValid = validateForm("single", formData);
      if (!isValid) return;

      console.log("Single QR generated response:", formData);
      setIsGenerated(true);
    } catch (error) {
      console.error("Single QR generation error:", error);
    }
  };

  const handleGeneratorBulkQR = async () => {
    try {
      const isValid = validateForm("bulk", formData);
      if (!isValid) return;

      if (formData.file && formData.file.type === "application/pdf") {
        setPdfUrl(URL.createObjectURL(formData.file));
      } else {
        setPdfUrl(null);
      }
      console.log("Bulk QR generated response:", formData);
      setIsGenerated(true);
    } catch (error) {
      console.error("Bulk QR generation error:", error);
    }
  };

  const handleSaveMeta = (meta: SaveMeta) => {
    if (!pdfUrl) return;

    const newJob: QRJob = {
      id: crypto.randomUUID(),
      pdfUrl,
      ...meta,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };

    const updatedJobs = [newJob, ...jobs];

    setJobs(updatedJobs);
    localStorage.setItem("qr_jobs", JSON.stringify(updatedJobs));
    router.push("/print-jobs")    
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-center font-bold mb-8 text-3xl pb-4 border-b-2">
          Universal QR Printing System
        </h1>

        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 md:col-span-5 space-y-4">
              {isRender === "single" ? (
                <SingleQR
                  formData={formData}
                  setFormData={setFormData}
                  handleGenerateQR={handleGenerateQR}
                />
              ) : (
                <button
                  className="bg-gray-500 text-white px-6 py-2 rounded-md"
                  onClick={() => setIsRender("single")}
                >
                  Generate Single QR
                </button>
              )}
            </div>

            <div className="col-span-12 md:col-span-2 flex items-center justify-center">
              <span>OR</span>
            </div>

            <div className="col-span-12 md:col-span-5 flex flex-col items-center gap-4">
              {isRender === "bulk" ? (
                <BulkQR
                  formData={formData}
                  setFormData={setFormData}
                  handleGeneratorBulkQR={handleGeneratorBulkQR}
                />
              ) : (
                <button
                  className="bg-gray-500 text-white px-6 py-2 rounded-md"
                  onClick={() => setIsRender("bulk")}
                >
                  Generate Bulk QR
                </button>
              )}
            </div>
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
                <a
                  href={pdfUrl}
                  download={`qr_${Date.now()}.pdf`}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Download PDF
                </a>
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
      </div>

      {isSaveModalOpen && (
        <Modal setter={setIsSaveModalOpen} onSave={handleSaveMeta} />
      )}
    </>
  );
};

export default Home;
