import React, { forwardRef, HTMLAttributes } from "react";
import { useFormField } from "./formField";

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ style, children, ...props }, ref) => {
        const { error, formMessageId } = useFormField();
        const body = error ? String(error?.message ?? "") : children;

        if (!body) {
            return null;
        }

        return (
            <p
                ref={ref}
                id={formMessageId}
                style={{
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    color: "red",
                    ...style,
                }}
                {...props}
            >
                {body}
            </p>
        );
    }
);

FormMessage.displayName = "FormMessage";

export { FormMessage };
