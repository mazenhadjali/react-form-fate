/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ style, disabled, ...props }, ref) => {
    const defaultStyle: React.CSSProperties = {
      display: "flex",
      minHeight: "60px",
      width: "100%",
      borderRadius: "0.375rem",
      border: "1px solid #d1d5db",
      backgroundColor: "transparent",
      padding: "0.5rem 0.75rem",
      fontSize: "1rem",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      outline: "none",
      cursor: disabled ? "not-allowed" : "auto",
      opacity: disabled ? 0.5 : 1,
    };

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        style={{ ...defaultStyle, ...style }}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
