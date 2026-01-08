export type QRFormData = {
  qrCode: string;
  text: string;
  template: string;
  file: File | null;
};

export type QRJob = {
  id: string;
  pdfUrl: string;
  personName: string;
  purpose: string;
  companyName: string;
  createdAt: number;
  expiresAt: number;
};

export type SaveMeta= {
  personName: string;
  purpose: string;
  companyName: string;
}