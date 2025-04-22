/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { HTMLAttributes } from "react";
import { useFormField } from "./formField";

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> { }

const FormControl: React.FC<FormControlProps> = (props) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
        <div
            id={formItemId}
            aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
            aria-invalid={!!error}
            {...props}
        />
    );
};

FormControl.displayName = "FormControl";

export { FormControl };
