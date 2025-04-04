import type { Meta, StoryObj } from "@storybook/react";
import { FormFate } from "./FormFate";

const meta: Meta<typeof FormFate> = {
  title: "Components/FormFate",
  component: FormFate,
};

export default meta;
type Story = StoryObj<typeof FormFate>;

const formDefinition = {
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
    fieldnameexample: {
      type: "mycustomtype",
      title: "my new custom type",
      description: "Enter your esmfiled",
      required: true
    },
  },
  buttons: [
    { type: "submit", label: "Sign Up" },
    { type: "reset", label: "Reset", variant: "destructive" }
  ]
}

const customComponents = {
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
}


export const Default: Story = {
  args: {
    formDefinition,
    onSubmit: (data) => {
      console.log("Form submitted with data:", data);
    },
    components: customComponents,
  },
};
