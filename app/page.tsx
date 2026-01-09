"use client";
import { useState, useEffect } from "react";
import SingleQR from "./components/SingleQR";
import { QRFormData, QRJob } from "./types/types";
import BulkQR from "./components/BulkQR";

export const Home = () => {
  const [formData, setFormData] = useState<QRFormData>({
    qrCode: "",
    text: "",
    template: "",
    file: null as File | null,
  });

  const [isRender, setIsRender] = useState<"single" | "bulk" | null>(null);
  const [jobs, setJobs] = useState<QRJob[]>([]);

  const resetToHome = () => {
    setIsRender(null);
    setFormData({
      qrCode: "",
      text: "",
      template: "",
      file: null,
    });
  };

  useEffect(() => {
    console.log("Updated FormData:", formData);
  }, [formData]);

  useEffect(() => {
    const stored = localStorage.getItem("qr_jobs");
    if (!stored) return;

    const parsed: QRJob[] = JSON.parse(stored);

    const now = Date.now();
    const validJobs = parsed.filter((job) => job.expiresAt > now);

    setJobs(validJobs);
    localStorage.setItem("qr_jobs", JSON.stringify(validJobs));
  }, []);

  return (
    <>
      {isRender === "single" && (
        <SingleQR
          formData={formData}
          setFormData={setFormData}
          onBack={() => setIsRender(null)}
          onSaveComplete={resetToHome}
          setJobs={setJobs}
        />
      )}

      {isRender === "bulk" && (
        <BulkQR
          formData={formData}
          setFormData={setFormData}
          onBack={() => setIsRender(null)}
          onSaveComplete={resetToHome}
          setJobs={setJobs}
        />
      )}

      {isRender === null && (
        <>
          <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-center font-bold mb-8 text-3xl pb-4 border-b-2">
              Universal QR Printing System
            </h1>

            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 md:col-span-5 space-y-4">
                  <button
                    className="bg-gray-500 text-white px-6 py-2 rounded-md"
                    onClick={() => setIsRender("single")}
                  >
                    Generate Single QR
                  </button>
                </div>

                <div className="col-span-12 md:col-span-2 flex items-center justify-center">
                  <span>OR</span>
                </div>

                <div className="col-span-12 md:col-span-5 flex flex-col items-end gap-4">
                  <button
                    className="bg-gray-500 text-white px-6 py-2 rounded-md"
                    onClick={() => setIsRender("bulk")}
                  >
                    Generate Bulk QR
                  </button>
                </div>
              </div>

              {jobs.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-4">
                    Saved Print Jobs
                  </h2>

                  <div className="space-y-3">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        onClick={() => window.open(job.pdfUrl, "_blank")}
                        className="cursor-pointer bg-white border rounded-md p-4 hover:shadow transition"
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="font-semibold">{job.personName}</p>
                            <p className="text-sm text-gray-600">
                              {job.companyName} • {job.purpose}
                            </p>
                          </div>

                          <span className="text-xs text-gray-500">
                            Expires in{" "}
                            {Math.ceil(
                              (job.expiresAt - Date.now()) / (1000 * 60 * 60)
                            )}{" "}
                            hrs
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
