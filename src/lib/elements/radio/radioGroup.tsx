/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { forwardRef, HTMLAttributes } from "react";

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> { }

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({ children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
            }}
            {...props}
        >
            {children}
        </div>
    );
});

export default RadioGroup;