/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useFormField } from "@/lib/fieldRenderer/formField";
import React, { forwardRef, SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  fieldConfig?: {
    title?: string;
    description?: string;
    options?: { value: string; label: string }[];
    [key: string]: unknown;
  };
  field?: React.Ref<HTMLInputElement> | any; // usually you get this from RHF's `Controller`
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, style, field, fieldConfig }, ref) => {
    const { error } = useFormField();

    return (
      <div style={{ marginBottom: "1rem", width: "100%" }}>
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
          ref={ref}
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
            transition: "border-color 0.2s, box-shadow 0.2s",
            ...style,
          }}
          className={className}
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
  }
);

export default Select;
