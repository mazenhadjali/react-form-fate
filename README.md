# FormFate Library Documentation

`FormFate` is a powerful and flexible form rendering library that allows you to define forms using a JSON schema. It simplifies form creation and management by providing a declarative way to configure form fields, validation, conditional rendering, and custom components.

## Installation

Install the `FormFate` library using npm:

```bash
npm install react-form-fate
```

## Usage

### Importing the Library

Import the `FormFate` component into your React application:

```tsx
import { FormFate } from 'react-form-fate';
```

### Defining a Form Schema

A form schema is a JSON object that defines the structure, fields, behavior, and UI of the form. Here's an example schema:

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
      description: "Select your gender",
      required: true,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ],
    },
    social: {
      type: 'select',
      title: 'Social Media',
      description: 'Select your preferred social media platform',
      required: true,
      default: '',
      options: [
        { value: '', label: '' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'github', label: 'GitHub' },
        { value: 'google', label: 'Google' },
        { value: 'other', label: 'Other' },
      ],
    },
    linkedin: {
      type: 'text',
      title: 'LinkedIn URL',
      description: 'Enter your LinkedIn URL',
      conditional: { field: 'social', equal: 'linkedin', state: true },
    },
    github: {
      type: 'text',
      title: 'GitHub URL',
      description: 'Enter your GitHub URL',
      conditional: { field: 'social', equal: 'github', state: true },
    },
    google: {
      type: 'text',
      title: 'Google URL',
      description: 'Enter your Google URL',
      conditional: { field: 'social', equal: 'google', state: true },
    },
    email: {
      type: "email",
      title: "Email Address",
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
      description: "Re-enter your password",
    },
    fieldnameexample: {
      type: "mycustomtype",
      title: "Custom Field",
      description: "Enter your custom value",
      required: true,
      component: Input,
    },
  },
  buttons: [
    { type: "submit", label: "Sign Up" },
    { type: "reset", label: "Reset", variant: "destructive" },
  ],
};
```

### Custom Components

You can extend `FormFate` with your own custom components by using the `components` prop:

```tsx
const customComponents: CustomComponents = {
  mycustomtype: ({ fieldConfig, ...props }) => (
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
        placeholder={fieldConfig.description}
      />
    </div>
  ),
};
```

### Rendering the Form

Render the form using the `FormFate` component:

```tsx
import React from "react";
import { FormFate } from 'react-form-fate';

export default function App() {
  const onSubmit = (data: Record<string, unknown>) => {
    console.log("Form Submitted Data:", data);
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      <FormFate
        formDefinition={signupForm}
        onSubmit={onSubmit}
        components={customComponents}
      />
    </div>
  );
}
```

### Conditional Rendering

Fields can be conditionally rendered based on other field values using the `conditional` property:

```json
"linkedin": {
  "type": "text",
  "title": "LinkedIn URL",
  "description": "Enter your LinkedIn URL",
  "conditional": {
    "field": "social",
    "equal": "linkedin",
    "state": true
  }
}
```

### Buttons

The `buttons` array in the schema defines the available form buttons, with support for types like `submit`, `reset`, and more:

```json
"buttons": [
  { "type": "submit", "label": "Sign Up" },
  { "type": "reset", "label": "Reset", "variant": "destructive" }
]
```

## Customization

- **Custom Field Types**: Add custom rendering logic via the `components` prop.
- **Custom Validation**: Integrate your own validation logic.



---

Feel free to contribute or report issues on the official [GitHub repository](https://github.com/mazenhadjali/react-form-fate).

