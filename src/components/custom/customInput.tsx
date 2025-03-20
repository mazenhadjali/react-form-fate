import { cn } from "@/lib/utils";
import React from "react";

export interface CustomInputProps extends React.ComponentProps<"input"> {
  containerClassName?: string; // Custom class for the container
  leftIcon?: React.ReactNode; // Optional left icon
  rightIcon?: React.ReactNode; // Optional right icon
  error?: boolean; // Indicates if the input is in an error state
  errorMessage?: string; // Error message to display below the input
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    { className, containerClassName, leftIcon, rightIcon, error, errorMessage, ...props },
    ref
  ) => {
    return (
      <div className={cn("relative w-full", containerClassName)}>
        {/* Input Container */}
        <div
          className={cn(
            "group flex items-center rounded-lg border bg-transparent transition-all duration-200",
            {
              "border-gray-300 hover:border-gray-400 focus-within:border-primary": !error, // Default state
              "border-red-500 hover:border-red-600 focus-within:border-red-500": error, // Error state
              "pl-10": leftIcon, // Add padding if left icon is present
              "pr-10": rightIcon, // Add padding if right icon is present
            }
          )}
        >
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-primary">
              {leftIcon}
            </div>
          )}

          {/* Input Field */}
          <input
            type={props.type}
            className={cn(
              "h-11 w-full bg-transparent px-3 py-2 text-base outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 group-focus-within:text-primary">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && errorMessage && (
          <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export { CustomInput };