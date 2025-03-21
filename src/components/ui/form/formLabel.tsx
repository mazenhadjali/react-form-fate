/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { forwardRef, LabelHTMLAttributes } from "react";
import { useFormField } from "./formField";

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> { }

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
    ({ style, ...props }, ref) => {
        const { error, formItemId } = useFormField();

        return (
            <label
                ref={ref}
                htmlFor={formItemId}
                {...props}
                style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    display: "block",
                    marginBottom: "4px",
                    color: error ? "red" : "inherit",
                    ...style,
                }}
            />
        );
    }
);

FormLabel.displayName = "FormLabel";

export { FormLabel };
