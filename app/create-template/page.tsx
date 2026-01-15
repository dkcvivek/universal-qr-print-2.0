"use client";
import { useEffect, useMemo, useState } from "react";
import TemplateForm from "./components/TemplateForm";
import TemplatePreview from "./components/TemplatePreview";
import { TemplateState } from "./types";
import { validateTemplate } from "./utils/validateTemplate";
import { useDebounceValue } from "./hooks/useDebounceValue";

const CreateTemplatePage = () => {
  const [template, setTemplate] = useState<TemplateState>({
    page: {
      width: 210,
      height: 297,
      orientation: "portrait",
      padding: { top: 10, right: 10, bottom: 10, left: 10 },
    },
    grid: { rows: 3, columns: 2, rowGap: 5, columnGap: 2 },
    label: { width: 50, height: 25 },
    qr: {
      text: "QR123",
      labelName: "Ceila Maxi Dress Dress DressDress",
      position: "qr-right",
      isLabelVisible: true,
      isQRTextVisible: true,
      paddingX: 10,
      paddingY: 10,
    },
  });

  const debouncedTemplate = useDebounceValue(template, 200);

  const validation = useMemo(
    () => validateTemplate(debouncedTemplate),
    [debouncedTemplate]
  );

  useEffect(() => {
    console.log("Updated Template:", template);
  }, [template]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white grid grid-cols-1 md:grid-cols-[minmax(320px,1fr)_1fr] border">
          <TemplateForm
            value={template}
            onChange={setTemplate}
            validation={validation}
          />

          <TemplatePreview
            template={debouncedTemplate}
            disabled={!validation.valid}
          />
        </div>
      </div>
    </>
  );
};

export default CreateTemplatePage;
