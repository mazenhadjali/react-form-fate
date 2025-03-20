import React, { useState } from "react";

export interface CustomPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
    strengthIndicator?: boolean;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const CustomPassword = React.forwardRef<HTMLInputElement, CustomPasswordProps>(
    ({ className, strengthIndicator = true, onChange, value, ...props }, ref) => {
        const [strength, setStrength] = useState(0);

        const calculateStrength = (value: string) => {
            let score = 0;
            if (value.length >= 8) score += 1;
            if (/[A-Z]/.test(value)) score += 1;
            if (/[0-9]/.test(value)) score += 1;
            if (/[@$!%*?&]/.test(value)) score += 1;
            setStrength(score);
        };

        const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
            calculateStrength(e.target.value);
            if (onChange) {
                onChange(e); // Calls the user's onChange function if provided
            }
        };

        return (
            <div className="relative w-full">
                {/* Password Input */}
                <input
                    ref={ref}
                    type="password" // Always 'password' since there's no visibility toggle
                    className={`w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${className}`}
                    value={value}
                    onChange={handleChange}
                    {...props}
                />

                {/* Strength Indicator */}
                {strengthIndicator && (
                    <div className="mt-2 w-full">
                        <div className="w-full h-1 bg-gray-300 rounded overflow-hidden">
                            <div
                                className={`h-1 transition-all duration-500 ${
                                    strength === 1
                                        ? "w-1/4 bg-red-500"
                                        : strength === 2
                                        ? "w-1/2 bg-yellow-500"
                                        : strength === 3
                                        ? "w-3/4 bg-green-400"
                                        : strength === 4
                                        ? "w-full bg-green-600" // Ensure it reaches full width
                                        : "w-0"
                                }`}
                            ></div>
                        </div>
                        <p className="text-xs mt-1 text-gray-500 text-center">
                            {["Weak", "Fair", "Good", "Strong"][strength] || ""}
                        </p>
                    </div>
                )}
            </div>
        );
    }
);

CustomPassword.displayName = "CustomPassword";
