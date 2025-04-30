/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useFormField } from "@/lib/fieldRenderer/formField";
import React, { SelectHTMLAttributes } from "react";
import { ControllerRenderProps } from "react-hook-form";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  fieldConfig?: {
    title?: string;
    description?: string;
    options?: { value: string; label: string }[];
    className?: string;
    [key: string]: unknown;
  };
  field?: ControllerRenderProps
}

export const Select: React.FC<SelectProps> = ({ field, fieldConfig }) => {
  const { error } = useFormField();

  return (
    <div className={fieldConfig?.className} style={{ marginBottom: "1rem" }}>
      {fieldConfig?.title && (
        <label
          htmlFor={field?.name}
          style={{
            display: "block",
            marginBottom: "0.4rem",
            fontWeight: 500,
            fontSize: "14px",
            color: "#333",
          }}
        >
          {fieldConfig.title}
        </label>
      )}

      <select
        {...field}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: `1px solid ${error ? "#e74c3c" : "#ccc"}`,
          borderRadius: "8px",
          fontSize: "15px",
          outline: "none",
          backgroundColor: "white",
          cursor: "pointer",
          boxShadow: error ? "0 0 0 2px rgba(231, 76, 60, 0.3)" : "none",
        }}
      >
        <option value="" disabled>
          -- Select an option --
        </option>
        {fieldConfig?.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {fieldConfig?.description && !error && (
        <span
          style={{
            display: "block",
            marginTop: "0.3rem",
            fontSize: "13px",
            color: "#666",
          }}
        >
          {fieldConfig.description}
        </span>
      )}

      {error?.message && (
        <span
          style={{
            display: "block",
            marginTop: "0.3rem",
            color: "#e74c3c",
            fontSize: "13px",
          }}
        >
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Select;
