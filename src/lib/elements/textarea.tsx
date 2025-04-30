/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from "react";
import { useFormField } from "../fieldRenderer/formField";
import { ControllerRenderProps } from "react-hook-form";

export interface TextareaProps {
  fieldConfig: {
    title?: string;
    placeholder?: string;
    description?: string;
    className?: string;
    [key: string]: unknown;
  };
  field: ControllerRenderProps;
}

export const Textarea: React.FC<TextareaProps> = ({ field, fieldConfig }) => {
  const { error } = useFormField();

  return (
    <div className={fieldConfig.className}>
      {fieldConfig.title && (
        <label
          htmlFor={field.name}
          style={{
            paddingBottom: "0.4rem",
            fontWeight: 500,
            fontSize: "14px",
            color: "#333",
          }}
        >
          {fieldConfig.title}
        </label>
      )}
      <br />

      <textarea
        {...field}
        id={field.name}
        placeholder={fieldConfig.placeholder}
        style={{
          display: "flex",
          minHeight: "60px",
          width: "100%",
          borderRadius: "8px",
          border: `1px solid ${error ? "#e74c3c" : "#ccc"}`,
          backgroundColor: "transparent",
          padding: "0.5rem 0.75rem",
          fontSize: "1rem",
          boxShadow: error ? "0 0 0 2px rgba(231, 76, 60, 0.3)" : "none",
          outline: "none",
          resize: "vertical",
        }}
        className={fieldConfig.className}
      />

      {fieldConfig.description && (
        <small style={{ color: "#666", fontSize: "12px" }}>
          {fieldConfig.description}
        </small>
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

export default Textarea;
