import React, { useState } from "react";
import { FormDefinition } from "formfatecore";
import { FormFate } from "./lib";
import { Input } from "./components/ui";

export default function App() {
  const [signupForm] = useState<FormDefinition>({
    name: "signupForm",
    properties: {
      firstName: {
        type: "text",
        title: "First Name",
        description: "Enter your first name",
        required: true,
        default: "",
      },
      lastName: {
        type: "text",
        title: "Last Name",
        description: "Enter your last name",
        required: true,
        default: "",
      },
      gender: {
        type: "radio",
        title: "Gender",
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ],
        description: "gender",
        required: true,
      },
      social: {
        type: 'select',
        title: 'Social',
        description: 'Select your social media',
        options: [
          { value: '', label: '' },
          { value: 'linkedin', label: 'LinkedIn' },
          { value: 'github', label: 'GitHub' },
          { value: 'google', label: 'Google' },
          { value: 'other', label: 'Other' },
        ],
        required: true,
        default: '',
      },
      linkedin: {
        type: 'text',
        title: 'LinkedIn',
        description: 'Enter your LinkedIn URL',
        conditional: { field: 'social', equal: 'linkedin', state: true },
      },
      github: {
        type: 'text',
        title: 'GitHub',
        description: 'Enter your GitHub URL',
        conditional: { field: 'social', equal: 'github', state: true },
      },
      google: {
        type: 'text',
        title: 'Google',
        description: 'Enter your Google URL',
        conditional: { field: 'social', equal: 'google', state: true },
      },
      email: {
        type: "email",
        title: "Email",
        description: "Enter your email address",
      },
      password: {
        type: "password",
        title: "Password",
        description: "Enter your password",
      },
      confirmPassword: {
        type: "password",
        title: "Confirm Password",
        description: "Confirm your password",
      },
      esmfiled: {
        type: "mycustomtype",
        title: "my new custom type",
        description: "Enter your esmfiled",
        required: true,
        component: Input,
      },
    },
    buttons: [
      { type: "submit", label: "Sign Up" },
      { type: "reset", label: "Reset", variant: "destructive" }
    ]
  });

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
          components={{
            "mycustomtype": ({ fieldConfig, ...props }) => {
              return (
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor={props.name} style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {fieldConfig.title}
                  </label>
                  <input
                    type="text"
                    {...props}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "0.375rem",
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                    placeholder={props.description}
                  />
                </div>
              );
            }
          }}
        />
      </div>

    </React.Fragment>
  );
}