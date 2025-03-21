/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { forwardRef, SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { }

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, style, children, ...props }, ref) => {
    return (
        <select
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
                backgroundColor: "white",
                cursor: "pointer",
                ...style, // Allow custom styles via props
            }}
            className={className}
        >
            {children}
        </select>
    );
});

export default Select;
