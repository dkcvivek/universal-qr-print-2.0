"use client";
import React, { useEffect, useState } from "react";
import { QRJob } from "../types/types";

function page() {
  const [jobs, setjobs] = useState<QRJob[]>([]);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const jobs = localStorage.getItem("qr_jobs");
    setjobs(jobs ? JSON.parse(jobs) : {});
  }, []);

  return (
    <>
      <div className="px-5">
        {jobs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Saved Print Jobs</h2>

            <div className="space-y-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
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

                    <button
                      className="bg-green-600 text-white px-6 py-2 rounded-md"
                      onClick={() => window.open("https://pdfobject.com/pdf/sample.pdf", "_blank")}
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pdfUrl && (
          <iframe
            src={pdfUrl}
            className="w-full h-screen mt-10 border"
          ></iframe>
        )}
      </div>
    </>
  );
}

export default page;
