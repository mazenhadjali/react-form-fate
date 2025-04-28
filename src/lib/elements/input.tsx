/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useFormField } from "../fieldRenderer/formField";
import { ControllerRenderProps } from "react-hook-form";

export interface InputProps {
    fieldConfig: {
        type: string;
        title?: string;
        placeholder?: string;
        description?: string;
        className?: string;
        [key: string]: unknown;
    };
    field: ControllerRenderProps
}

export const Input: React.FC<InputProps> = ({ field, fieldConfig }) => {
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

            <input
                {...field}
                type={fieldConfig.type}
                placeholder={fieldConfig.placeholder}
                style={{
                    width: "100%",
                    padding: "0.4rem 0.6rem",
                    border: `1px solid ${error ? "#e74c3c" : "#ccc"}`,
                    borderRadius: "8px",
                    fontSize: "15px",
                    boxShadow: error ? "0 0 0 2px rgba(231, 76, 60, 0.3)" : "none",
                    boxSizing: "border-box",
                }}
                className={fieldConfig.className}
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


export default Input;
