/* eslint-disable @typescript-eslint/no-empty-object-type */
import { forwardRef, InputHTMLAttributes } from "react";
import { useFormField } from "../fieldRenderer/formField";
import { ControllerRenderProps } from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    fieldConfig: {
        type: string;
        title?: string;
        placeholder?: string;
        description?: string;
        [key: string]: unknown;
    };
    field: ControllerRenderProps<Record<string, any>>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, field, fieldConfig, style }, ref) => {
    const { error } = useFormField();

    return (
        <div style={{ marginBottom: "1rem", width: "100%" }}>
            {fieldConfig.title && (
                <label
                    htmlFor={field.name}
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

            <input
                {...field}
                type={fieldConfig.type}
                placeholder={fieldConfig.placeholder}
                style={{
                    // 100% width of parent container and centered
                    width: "90%",
                    margin: "0 auto",
                    display: "block",
                    padding: "0.5rem 0.75rem",
                    border: `1px solid ${error ? "#e74c3c" : "#ccc"}`,
                    borderRadius: "8px",
                    fontSize: "15px",
                    outline: "none",
                    boxShadow: error ? "0 0 0 2px rgba(231, 76, 60, 0.3)" : "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    ...style,
                }}
                className={className}
            />

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

export default Input;
