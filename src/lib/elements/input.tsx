/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, style, ...props }, ref) => {
    return (
        <input
            ref={ref}
            {...props}
            style={{
                width: "100%",
                padding: "0.5rem 2px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.2s",
                ...style, // Allow custom styles via props
            }}
            className={className}
        />
    );
});

export default Input;
