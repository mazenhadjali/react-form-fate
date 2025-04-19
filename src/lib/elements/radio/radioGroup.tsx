/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useFormField } from "@/lib/fieldRenderer/formField";
import React, { HTMLAttributes } from "react";

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
    fieldConfig?: {
        title?: string;
        description?: string;
        options?: { value: string; label: string }[];
        [key: string]: unknown;
    };
    field?: any; // usually you get this from RHF's `Controller`
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    className,
    style,
    field,
    fieldConfig,
    ...props
}) => {
    const { error } = useFormField();

    return (
        <div
            style={{ marginBottom: "1rem", width: "100%", ...style }}
            className={className}
            {...props}
        >
            {fieldConfig?.title && (
                <label
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

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {fieldConfig?.options?.map((option) => (
                    <label
                        key={option.value}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "14px",
                            color: "#333",
                            cursor: "pointer",
                        }}
                    >
                        <input
                            type="radio"
                            {...field}
                            value={option.value}
                            checked={field.value === option.value}
                            onChange={() => field.onChange(option.value)}
                            name={field?.name}
                            style={{
                                cursor: "pointer",
                            }}

                        />
                        {option.label}
                    </label>
                ))}
            </div>

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

export default RadioGroup;
