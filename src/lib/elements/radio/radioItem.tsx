/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { InputHTMLAttributes } from "react";
import { ControllerRenderProps } from "react-hook-form";

export interface RadioItemProps extends InputHTMLAttributes<HTMLInputElement> {
    option?: { value: string; label: string };
    field: ControllerRenderProps<Record<string, unknown>, string>;
}

export const RadioItem: React.FC<RadioItemProps> = ({ option, field, ...props }) => {
    return (
        <label
            style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 8px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
            }}
        >
            <input
                type="radio"
                style={{
                    width: "16px",
                    height: "16px",
                    accentColor: "#4f46e5",
                }}
                {...field}
                {...props}
                value={option?.value}
            />
            <span style={{ fontSize: "14px", color: "#333" }}>
                {option?.label}
            </span>
            <style>{`
        label:hover {
          background-color: #f9f9f9;
        }
      `}</style>
        </label>
    );
};

export default RadioItem;
