# 🧠 FormFate Documentation

This repository hosts the **FormFate** documentation site, built with [Docusaurus 2](https://docusaurus.io/), covering both web (`react-form-fate`) and native (`native-form-fate`) form-generation libraries.

![FormFate Logo](static/img/formfate-logo.png)

---

## ✨ Quick Overview

**FormFate** lets you define forms via a JSON/TypeScript schema, providing:

* **Schema-Driven**: Declarative blocks and fields
* **Built-In Logic**: Validation, conditional rendering, disabled state
* **Async Data**: Dynamic options via `optionsUrl` + filtering
* **Custom Components**: Plug in your own React or native inputs
* **Cross-Platform**: Web and React Native support

---

## 📦 Installation

1. **Core Engine** (shared schema logic):

   ```bash
   npm install formfatecore
   # or
   yarn add formfatecore
   ```

2. **Web Starter**:

   ```bash
   npm install react-form-fate
   # or
   yarn add react-form-fate
   ```

3. **React Native Starter**:

   ```bash
   npm install native-form-fate
   # or
   yarn add native-form-fate
   ```

---

## 🚀 Quick Start Example

```tsx
import React from 'react';
import { FormFate } from 'react-form-fate';
import { FormDefinition } from 'formfatecore';
import { customComponents } from './customComponents';

const signupForm: FormDefinition = {
  name: 'signupForm',
  properties: {
    personalInfo: {
      type: 'block',
      title: 'Personal Information',
      properties: {
        firstName: {
          type: 'text',
          title: 'First Name',
          required: true,
          validator: v => v.length >= 3 || 'At least 3 chars',
        },
        gender: {
          type: 'radio',
          title: 'Gender',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ],
          required: true,
        },
      },
    },
  },
  buttons: [
    { type: 'submit', label: 'Sign Up' },
    { type: 'reset',  label: 'Reset', variant: 'destructive' },
  ],
};

export default function App() {
  const handleSubmit = data => console.log('Submitted:', data);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h1>Sign Up</h1>
      <FormFate
        formDefinition={signupForm}
        onSubmit={handleSubmit}
        components={customComponents}
      />
    </div>
  );
}
```

---

## 🔧 Schema Reference

* **Blocks**: group fields
* **Field Types**: `text`, `textarea`, `email`, `password`, `select`, `radio`, `checkbox`, **custom**
* **Props**: `title`, `description`, `required`, `default`, `validator`, `disabled`, `conditional`, `valueCallback`

### Dynamic Options

```ts
optionsUrl: {
  url: 'https://api.example.com/items',
  method: 'GET',
  mapper: ({ response }) => response.map(i => ({ value: i.id, label: i.name })),
},
filterFunction: ({ options, formValues }) =>
  options.filter(o => o.label.includes(formValues.searchTerm || '')), 
```

---

## 🌐 React Native Support

Use the same schema with:

```tsx
import { FormFate as NativeFormFate } from 'native-form-fate';
```

---

## 🎉 Contributing

Issues and PRs welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📄 License

[MIT](LICENSE) © Proxym Group
