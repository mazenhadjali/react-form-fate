/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { forwardRef, HTMLAttributes } from "react";
import { useFormField } from "./formField";

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> { }

const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
    ({ ...props }, ref) => {
        const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

        return (
            <div
                ref={ref}
                id={formItemId}
                aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
                aria-invalid={!!error}
                {...props}
            />
        );
    }
);

FormControl.displayName = "FormControl";

export { FormControl };
