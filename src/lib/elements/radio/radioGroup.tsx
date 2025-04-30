/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useFormField } from "@/lib/fieldRenderer/formField";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

export interface RadioGroupProps {
    fieldConfig?: {
        title?: string;
        description?: string;
        options?: { value: string; label: string }[];
        className?: string;
        [key: string]: unknown;
    };
    field?: ControllerRenderProps
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ field, fieldConfig }) => {
    const { error } = useFormField();

    return (
        <div className={fieldConfig?.className} style={{ marginBottom: "1rem" }}>
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

            <div>
                {fieldConfig?.options?.map((option) => (
                    <label
                        key={option.value}
                        style={{
                            display: "flex",
                            gap: "8px",
                            fontSize: "14px",
                            color: "#333",
                            marginBottom: "0.5rem",

                        }}
                    >
                        <input
                            type="radio"
                            {...field}
                            value={option.value}
                            checked={field?.value === option.value}
                            onChange={() => field?.onChange(option.value)}
                            name={field?.name}
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
