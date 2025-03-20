import { useState } from "react";
import { FormDefinition } from "formfatecore";
import { FormFate } from "./lib";

export default function App() {
  const [signupForm] = useState<FormDefinition>({
    name: "signupForm",
    properties: {
      firstName: {
        type: "text",
        title: "First Name",
        default: "mazen",
        description: "Enter your first name",
        required: true,
        validator: (value) => value.length < 3 ? "First name must be at least 3 characters" : true
      },
      lastName: {
        type: "text",
        title: "Last Name",
        description: "Enter your last name"
      },
      dateOfBirth: { type: "date", title: "Date of Birth", description: "Enter your date of birth" },
      timeOfBirth: { type: "time", title: "Time of Birth", description: "Enter your time of birth" },
      gender: { type: "radio", title: "Gender", description: "Select your Gender", options: [{ value: "male", label: "Male" }, { value: "Female", label: "Female" }] },
      LinkedIn: { type: "url", title: "LinkedIn", description: "Enter your LinkedIn URL", required: true },
      email: { type: "email", title: "Email", description: "Enter your email address" },
      password: { type: "password", title: "Password", description: "Enter your password" },
      confirmPassword: { type: "password", title: "Confirm Password", description: "Confirm your password" },
      plan: { type: "select", title: "Plan", description: "Choose your plan", options: [{ value: "free", label: "Free" }, { value: "premium", label: "Premium" }] },

      terms: { type: "checkbox", title: "Terms & Conditions", description: "I agree to the terms and conditions" },
    },
    buttons: [
      { type: "submit", label: "Sign Up" },
      { type: "reset", label: "Reset" }
    ]
  });

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
      <FormFate formDefinition={signupForm} onSubmit={(data) => console.log(data)} />
    </div>
  );
}
