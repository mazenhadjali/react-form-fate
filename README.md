# FormFate Library Documentation

The `FormFate` library is a powerful and flexible form rendering library that allows you to define forms using a JSON schema. It simplifies form creation and management by providing a declarative way to define form fields, validation, and conditional rendering.

## Installation

To use the `FormFate` library, install the required dependencies:

```bash
npm install formfatecore react-hook-form
```

## Usage

### Importing the Library

To use the `FormFate` component, import it into your React application:

```tsx
import { FormFate } from "./lib/FormFate";
```

### Defining a Form Schema

The form schema is a JSON object that defines the structure, fields, and behavior of the form. Below is an example schema:

```tsx
const signupForm = {
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
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
      description: "Select your gender",
      required: true,
    },
    social: {
      type: "select",
      title: "Social",
      description: "Select your social media",
      options: [
        { value: "", label: "" },
        { value: "linkedin", label: "LinkedIn" },
        { value: "github", label: "GitHub" },
        { value: "google", label: "Google" },
        { value: "other", label: "Other" },
      ],
      required: true,
      default: "",
    },
    linkedin: {
      type: "text",
      title: "LinkedIn",
      description: "Enter your LinkedIn URL",
      conditional: { field: "social", equal: "linkedin", state: true },
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
  },
  buttons: [
    { type: "submit", label: "Sign Up" },
    { type: "reset", label: "Reset", variant: "destructive" },
  ],
};
```

### Rendering the Form

Use the `FormFate` component to render the form based on the schema:

```tsx
import React, { useState } from "react";
import { FormFate } from "./lib/FormFate";

export default function App() {
  const [signupForm] = useState(signupForm);

  const onSubmit = (data: Record<string, unknown>) => {
    console.log("Form Submitted Data:", data);
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      <FormFate formDefinition={signupForm} onSubmit={onSubmit} />
    </div>
  );
}
```

### Conditional Rendering

The `conditional` property in the schema allows fields to be displayed based on the value of another field. For example, the `linkedin` field is only displayed when the `social` field is set to `linkedin`.

```json
"linkedin": {
  "type": "text",
  "title": "LinkedIn",
  "description": "Enter your LinkedIn URL",
  "conditional": { "field": "social", "equal": "linkedin", "state": true }
}
```

### Buttons

The `buttons` array in the schema defines the form's buttons. Each button can have a type (`submit`, `reset`, etc.), a label, and an optional variant.

```json
"buttons": [
  { "type": "submit", "label": "Sign Up" },
  { "type": "reset", "label": "Reset", "variant": "destructive" }
]
```

## Customization

You can customize the form by providing custom components for rendering fields. Refer to the `CustomComponents` interface in the library for more details.

## License

This library is open-source and available under the MIT License.
