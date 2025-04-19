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
    personalInfo: {
      type: "block",
      title: "Personal Information",
      properties: {
        firstName: {
          type: "text",
          title: "First Name",
          description: "Enter your first name",
          required: true,
          default: "",
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
          },
        },
        gender: {
          type: "radio",
          title: "Gender",
          description: "Select your gender",
          required: true,
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ],
        },
        mentor: {
          type: "select",
          title: "Mentor",
          description: "Select your mentor",
          required: true,
          default: "",
          optionsUrl: {
            url: "https://jsonplaceholder.typicode.com/users",
            method: "GET",
            mapper: ({ response }: { response: any }) => {
              return response.map((user: { id: number; name: string }) => ({
                value: user.id,
                label: user.name,
              }));
            },
          },
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
            return formValues.social === "linkedin";
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
            if (value !== formValues.password) return "Passwords do not match";
            return true;
          },
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
          description: "Enter your custom value",
          required: true,
        },
      },
    },
  },
  buttons: [
    { type: "submit", label: "Sign Up" },
    { type: "reset", label: "Reset", variant: "destructive" },
  ],
};
```

### Data Source for Select and Radio Fields

The `optionsUrl` property allows you to dynamically fetch options for `select` or `radio` fields from a remote data source. This is particularly useful when the options depend on external APIs or dynamic data. Here's how it works:

- **url**: The endpoint to fetch data from.
- **method**: The HTTP method to use (e.g., `GET`, `POST`).
- **mapper**: A function to transform the fetched data into the required format for the field options.

Example:

```tsx
mentor: {
  type: "select",
  title: "Mentor",
  description: "Select your mentor",
  required: true,
  default: "",
  optionsUrl: {
    url: "https://jsonplaceholder.typicode.com/users",
    method: "GET",
    mapper: ({ response }: { response: any }) => {
      return response.map((user: { id: number; name: string }) => ({
        value: user.id,
        label: user.name,
      }));
    },
  },
},
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
    <div style={{ width: "600px", margin: "50px auto" }}>
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

```tsx
linkedin: {
  type: "text",
  title: "LinkedIn URL",
  description: "Enter your LinkedIn URL",
  conditional: ({ formValues }: { formValues: Record<string, unknown> }) => {
    return formValues.social === "linkedin";
  },
},
```

### Buttons

The `buttons` array in the schema defines the available form buttons, with support for types like `submit`, `reset`, and more:

```tsx
buttons: [
  { type: "submit", label: "Sign Up" },
  { type: "reset", label: "Reset", variant: "destructive" },
],
```

## Customization

- **Custom Field Types**: Add custom rendering logic via the `components` prop.
- **Custom Validation**: Integrate your own validation logic.



---

Feel free to contribute or report issues on the official [GitHub repository](https://github.com/mazenhadjali/react-form-fate).

