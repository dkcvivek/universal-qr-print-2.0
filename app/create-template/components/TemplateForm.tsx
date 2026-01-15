"use client";
import { Icon } from "@iconify/react";
import { TemplateState } from "../types";
import { ValidationResult } from "../utils/validateTemplate";

interface Props {
  value: TemplateState;
  onChange: (v: TemplateState) => void;
  validation: ValidationResult;
}

export default function TemplateForm({ value, onChange, validation }: Props) {
  const update = (path: string, val: any) => {
    const clone = structuredClone(value);
    const keys = path.split(".");
    let obj: any = clone;

    keys.slice(0, -1).forEach((k) => (obj = obj[k]));
    obj[keys[keys.length - 1]] = val;

    onChange(clone);
  };

  return (
    <div className="p-4 space-y-6 text-sm">
      <div>
        <h2 className="text-lg font-semibold">Create Label Template</h2>
        <p className="text-gray-500 text-xs">
          Configure page, grid and label layout
        </p>
      </div>

      <Section title="Page Settings">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Width (mm)"
            value={value.page.width}
            onChange={(v) => update("page.width", v)}
          />
          <Input
            label="Height (mm)"
            value={value.page.height}
            onChange={(v) => update("page.height", v)}
          />
        </div>

        <div>
          <label className="block text-xs mb-1">Orientation</label>
          <div className="flex gap-2">
            {(["portrait", "landscape"] as const).map((o) => (
              <button
                key={o}
                onClick={() => update("page.orientation", o)}
                className={`px-3 py-1 rounded border ${
                  value.page.orientation === o
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs mb-2">Page Padding (mm)</label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Top"
              value={value.page.padding.top}
              onChange={(v) => update("page.padding.top", v)}
            />
            <Input
              label="Right"
              value={value.page.padding.right}
              onChange={(v) => update("page.padding.right", v)}
            />
            <Input
              label="Bottom"
              value={value.page.padding.bottom}
              onChange={(v) => update("page.padding.bottom", v)}
            />
            <Input
              label="Left"
              value={value.page.padding.left}
              onChange={(v) => update("page.padding.left", v)}
            />
          </div>
        </div>
      </Section>

      <Section title="Grid Layout">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Rows"
            value={value.grid.rows}
            onChange={(v) => update("grid.rows", v)}
          />
          <Input
            label="Columns"
            value={value.grid.columns}
            onChange={(v) => update("grid.columns", v)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Row Gap (mm)"
            value={value.grid.rowGap}
            onChange={(v) => update("grid.rowGap", v)}
          />
          <Input
            label="Column Gap (mm)"
            value={value.grid.columnGap}
            onChange={(v) => update("grid.columnGap", v)}
          />
        </div>
      </Section>

      <Section title="Label Dimensions">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Label Width (mm)"
            value={value.label.width}
            onChange={(v) => update("label.width", v)}
          />
          <Input
            label="Label Height (mm)"
            value={value.label.height}
            onChange={(v) => update("label.height", v)}
          />
        </div>
      </Section>

      <Section title="Label Content">
        <div className="space-y-2">
          <label className="text-sm mb-2 font-medium text-gray-700 block">
            QR Position
          </label>

          <div className="flex gap-4">
            {[
              { label: "Left", value: "qr-left" },
              { label: "Right", value: "qr-right" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="qr-position"
                  value={option.value}
                  checked={value.qr.position === option.value}
                  onChange={() => update("qr.position", option.value)}
                  className="accent-black"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Horizontal Padding"
            value={value.qr.paddingX}
            onChange={(v) => update("qr.paddingX", v)}
          />
          <Input
            label="Vertical Padding"
            value={value.qr.paddingY}
            onChange={(v) => update("qr.paddingY", v)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="QR Text"
            value={value.qr.text}
            onChange={(v) => update("qr.text", v)}
          />

          <Input
            label="Label Name"
            value={value.qr.labelName}
            onChange={(v) => update("qr.labelName", v)}
          />
        </div>
      </Section>

      {(validation.errors.length > 0 || validation.warnings.length > 0) && (
        <div className="space-y-2">
          {validation.errors.map((err, i) => (
            <div
              key={i}
              className="text-xs bg-red-50 border border-red-300 text-red-700 p-2 rounded flex items-center gap-2"
            >
              <Icon icon="material-symbols:error" width="24" height="24" />{" "}
              {err}
            </div>
          ))}

          {validation.warnings.map((warn, i) => (
            <div
              key={i}
              className="text-xs bg-yellow-50 border border-yellow-300 text-yellow-700 p-2 rounded flex items-center gap-2"
            >
              <Icon icon="fluent-color:warning-16" width="16" height="16" />{" "}
              {warn}
            </div>
          ))}
        </div>
      )}

      <div className="sticky bottom-0 bg-white pt-4 border-t flex gap-2">
        <button className="flex-1 border rounded py-2">Reset</button>
        <button
          disabled={!validation.valid}
          className={`flex-1 rounded py-2 ${
            validation.valid
              ? "bg-black text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Save Template
        </button>
      </div>
    </div>
  );
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white border rounded p-4 space-y-4">
      <h3 className="font-medium">{title}</h3>
      {children}
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | number;
  onChange: (v: string | number) => void;
}) => {
  const isNumber = typeof value === "number";
  return (
    <div>
      <label className="block text-xs mb-1">{label}</label>
      <input
        type={isNumber ? "number" : "text"}
        value={value}
        onChange={(e) => {
          const raw = e.target.value;

          if (isNumber) {
            onChange(raw === "" ? "" : Number(raw));
          } else {
            onChange(raw);
          }
        }}
        className="w-full border rounded px-2 py-1"
      />
    </div>
  );
};
