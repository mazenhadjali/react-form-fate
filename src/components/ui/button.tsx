import React, { forwardRef, ButtonHTMLAttributes } from "react";

// Define button variants as a style object
const buttonStyles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.2s, opacity 0.2s",
    outline: "none",
    cursor: "pointer",
    border: "none",
  },
  variants: {
    default: { backgroundColor: "#007bff", color: "#fff" },
    destructive: { backgroundColor: "#dc3545", color: "#fff" },
    outline: { backgroundColor: "transparent", border: "1px solid #ccc", color: "#333" },
    secondary: { backgroundColor: "#6c757d", color: "#fff" },
    ghost: { backgroundColor: "transparent", color: "#007bff" },
    link: { backgroundColor: "transparent", color: "#007bff", textDecoration: "underline" },
  },
  sizes: {
    default: { height: "36px", padding: "8px 16px" },
    sm: { height: "32px", padding: "6px 12px", fontSize: "12px" },
    lg: { height: "40px", padding: "10px 20px", fontSize: "16px" },
    icon: { width: "36px", height: "36px", padding: "0" },
  },
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonStyles.variants;
  size?: keyof typeof buttonStyles.sizes;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = "default", size = "default", style, className, ...props }, ref) => {

  return (
    <button
      ref={ref}
      {...props}
      style={{
        ...buttonStyles.base,
        ...(buttonStyles.variants[variant] || {}),
        ...(buttonStyles.sizes[size] || {}),
        ...style, // Allow overriding styles via props
      }}
      className={className}
    />
  );
}
);

Button.displayName = "Button";

export default Button;