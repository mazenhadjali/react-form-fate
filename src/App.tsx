import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { FormDefinition, useFormFate } from "./formFateCore";
import { useState } from "react";
import { FieldRenderer } from "@/lib/FieldRenderer";

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
      LinkedIn: { type: "url", title: "LinkedIn", description: "Enter your LinkedIn URL", required: true },
      email: { type: "email", title: "Email", description: "Enter your email address" },
      password: { type: "password", title: "Password", description: "Enter your password" },
      confirmPassword: { type: "password", title: "Confirm Password", description: "Confirm your password" },
      terms: { type: "checkbox", title: "Terms & Conditions", description: "I agree to the terms and conditions" },
    },
    buttons: [
      { type: "submit", label: "Sign Up" },
      { type: "reset", label: "Reset" }
    ]
  });

  const form = useFormFate(signupForm);
  const { handleSubmit, control, formState: { isSubmitting } } = form;

  const onSubmit = async (data) => {
    console.log("Form submitted with:", data);
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {Object.entries(signupForm.properties).map(([key, fieldConfig]) => (
            <FieldRenderer key={key} control={control} name={key} fieldConfig={fieldConfig} />
          ))}
          <div className="space-x-4">
            {signupForm.buttons.map((button, index) => (
              <Button key={index} type={button.type} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : button.label}
              </Button>
            ))}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
