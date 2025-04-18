import React, { useState } from "react";
import { FormDefinition } from "formfatecore";
import { CustomComponents, FormFate } from "./lib";

export default function App() {
  const [signupForm] = useState<FormDefinition>({
    name: "signupForm",
    properties: {
      personalInfo: {
        type: "block",
        title: "Personal Information",
        properties: {
          firstName: {
            type: "text",
            title: "First Name",
            description: "Enter your first name",
            className: "test",
            required: true,
            default: "ssssaedz",
            validator: (value: string) => {
              if (value.length < 3) return "First name must be at least 3 characters long";
              return true;
            },
          },
          lastName: {
            type: "text",
            title: "Last Name",
            description: "Enter your last name",
            required: true,
            default: "",
            disabled: ({ formValues }: { formValues: Record<string, unknown> }) => {
              const firstName = formValues.firstName as string;
              return firstName?.length < 3 || firstName === undefined;
            }
          },
          gender: {
            type: "radio",
            title: "Gender",
            description: "Gender",
            required: true,
            options: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ],
          },
        },
      },

      socialLinks: {
        type: "block",
        title: "Social Media Info",
        properties: {
          social: {
            type: "select",
            title: "Social",
            description: "Select your social media",
            required: true,
            default: "",
            options: [
              { value: "linkedin", label: "LinkedIn" },
              { value: "github", label: "GitHub" },
              { value: "google", label: "Google" },
              { value: "other", label: "Other" },
            ],
          },
          linkedin: {
            type: "text",
            title: "LinkedIn",
            description: "Enter your LinkedIn URL",
            conditional: ({ formValues }: { formValues: Record<string, unknown> }) => {
              const socialValue = formValues.social as string;
              return socialValue === "linkedin";
            },
          },
          github: {
            type: "text",
            title: "GitHub",
            description: "Enter your GitHub URL",
            conditional: { field: "social", equal: "github", state: true },
          },
          google: {
            type: "text",
            title: "Google",
            description: "Enter your Google URL",
            conditional: { field: "social", equal: "google", state: true },
          },
        },
      },

      accountInfo: {
        type: "block",
        title: "Account Credentials",
        properties: {
          email: {
            type: "email",
            title: "Email",
            description: "Enter your email address",
            required: true,
          },
          password: {
            type: "password",
            title: "Password",
            description: "Enter your password",
            required: true,
          },
          confirmPassword: {
            type: "password",
            title: "Confirm Password",
            description: "Confirm your password",
            required: true,
            validator: (value: string, formValues: Record<string, unknown>) => {
              console.log("password", formValues.password);
              if (value !== formValues.password) return "Passwords do not match";

              return true;
            }
          },
        },
      },

      customStuff: {
        type: "block",
        title: "Custom Field",
        properties: {
          fieldnameexample: {
            type: "mycustomtype",
            title: "My New Custom Type",
            description: "Enter your esmfiled",
            required: true,
          },
        },
      },
    },

    buttons: [
      { type: "submit", label: "Sign Up" },
      { type: "reset", label: "Reset", variant: "destructive" },
    ],
  });

  const customComponents: CustomComponents = {
    "mycustomtype": ({ fieldConfig, ...props }) => {
      return (
        <div style={{ marginBottom: "1rem" }}>
          <div>
            <label htmlFor={props.name} style={{ fontSize: "20px", fontWeight: "bold" }}>
              {fieldConfig.description}
            </label>
          </div>
          <label htmlFor={props.name} style={{ fontSize: "20px", fontWeight: "bold" }}>
            {fieldConfig.title}
          </label>
          <input
            type="text"
            {...props}
            style={{
              width: "90%",
              padding: "0.5rem",
              margin: "0 auto",
              display: "block",
              borderRadius: "0.375rem",
              border: "1px solid #ccc",
            }}
            placeholder={props.description}
          />
        </div>
      );
    }
  }

  const onSubmit = (data: Record<string, unknown>) => {
    console.log("passed data", data);
  };



  return (
    <React.Fragment>
      <div style={{ width: "400px", margin: "50px auto" }}>
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>
        <FormFate
          formDefinition={signupForm}
          onSubmit={onSubmit}
          components={customComponents}
        />
      </div>

    </React.Fragment>
  );
}
