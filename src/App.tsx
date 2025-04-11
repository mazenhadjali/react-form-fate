// import React, { useState } from "react";
// import { FormDefinition } from "formfatecore";
// import { CustomComponents, FormFate } from "./lib";

// export default function App() {
//   const [signupForm] = useState<FormDefinition>({
//     name: "signupForm",
//     properties: {
//       personalInfo: {
//         type: "block",
//         title: "Personal Information",
//         properties: {
//           fieldname: {
//             type: "text",
//             title: "First Name",
//             description: "Enter your first name",
//             required: true,
//             default: "ssssaedz",
//             validator: (value: string) => {
//               if (value.length < 3) return "First name must be at least 3 characters long";
//               return true;
//             }
//           },
//           lastName: {
//             type: "text",
//             title: "Last Name",
//             description: "Enter your last name",
//             required: true,
//             default: "",
//           },
//           gender: {
//             type: "radio",
//             title: "Gender",
//             description: "Gender",
//             required: true,
//             options: [
//               { value: "male", label: "Male" },
//               { value: "female", label: "Female" },
//               { value: "other", label: "Other" },
//             ],
//           },
//         },
//       },

//       socialLinks: {
//         type: "block",
//         title: "Social Media Info",
//         properties: {
//           social: {
//             type: "select",
//             title: "Social",
//             description: "Select your social media",
//             required: true,
//             default: "",
//             options: [
//               { value: "", label: "" },
//               { value: "linkedin", label: "LinkedIn" },
//               { value: "github", label: "GitHub" },
//               { value: "google", label: "Google" },
//               { value: "other", label: "Other" },
//             ],
//           },
//           linkedin: {
//             type: "text",
//             title: "LinkedIn",
//             description: "Enter your LinkedIn URL",
//             conditional: { field: "social", equal: "linkedin", state: true },
//           },
//           github: {
//             type: "text",
//             title: "GitHub",
//             description: "Enter your GitHub URL",
//             conditional: { field: "social", equal: "github", state: true },
//           },
//           google: {
//             type: "text",
//             title: "Google",
//             description: "Enter your Google URL",
//             conditional: { field: "social", equal: "google", state: true },
//           },
//         },
//       },

//       accountInfo: {
//         type: "block",
//         title: "Account Credentials",
//         properties: {
//           email: {
//             type: "email",
//             title: "Email",
//             description: "Enter your email address",
//             required: true,
//           },
//           password: {
//             type: "password",
//             title: "Password",
//             description: "Enter your password",
//             required: true,
//           },
//           confirmPassword: {
//             type: "password",
//             title: "Confirm Password",
//             description: "Confirm your password",
//             required: true,
//             validator: (value: string, formValues: Record<string, unknown>) => {
//               console.log("password", formValues.password);
//               if (value !== formValues.password) return "Passwords do not match";

//               return true;
//             }
//           },
//         },
//       },

//       customStuff: {
//         type: "block",
//         title: "Custom Field",
//         properties: {
//           fieldnameexample: {
//             type: "mycustomtype",
//             title: "My New Custom Type",
//             description: "Enter your esmfiled",
//             required: true,
//           },
//         },
//       },
//     },

//     buttons: [
//       { type: "submit", label: "Sign Up" },
//       { type: "reset", label: "Reset", variant: "destructive" },
//     ],
//   }
//   );

//   const customComponents: CustomComponents = {
//     "mycustomtype": ({ fieldConfig, ...props }) => {
//       return (
//         <div style={{ marginBottom: "1rem" }}>
//           <div>
//             <label htmlFor={props.name} style={{ fontSize: "20px", fontWeight: "bold" }}>
//               {fieldConfig.description} 
//             </label>
//           </div>
//           <label htmlFor={props.name} style={{ fontSize: "20px", fontWeight: "bold" }}>
//             {fieldConfig.title} 
//           </label>
//           <input
//             type="text"
//             {...props}
//             style={{
//               width: "90%",
//               padding: "0.5rem",
//               margin:"0 auto",
//               display: "block",
//               borderRadius: "0.375rem",
//               border: "1px solid #ccc",
//             }}
//             placeholder={props.description}
//           />
//         </div>
//       );
//     }
//   }

//   const onSubmit = (data: Record<string, unknown>) => {
//     console.log("passed data", data);
//   };



//   return (
//     <React.Fragment>
//       <div style={{ width: "400px", margin: "50px auto" }}>
//         <h1 style={{ textAlign: "center" }}>Sign Up</h1>
//         <FormFate
//           formDefinition={signupForm}
//           onSubmit={onSubmit}
//           components={customComponents}
//         />
//       </div>

//     </React.Fragment>
//   );
// }

import React, { useState } from "react";
import { FormDefinition } from "formfatecore";
import { FormFate, CustomComponents } from "./lib";

export default function LoanApplicationForm() {
  const [loanForm] = useState<FormDefinition>({
    name: "loanApplication",
    properties: {
      applicantInfo: {
        type: "block",
        title: "Applicant Information",
        properties: {
          fullName: {
            type: "text",
            title: "Full Name",
            required: true,
          },
          age: {
            type: "number",
            title: "Age",
            required: true,
            validator: (value: number) =>
              value >= 18 ? true : "Must be at least 18 years old",
          },
          employmentStatus: {
            type: "select",
            title: "Employment Status",
            required: true,
            options: [
              { value: "employed", label: "Employed" },
              { value: "selfEmployed", label: "Self-Employed" },
              { value: "unemployed", label: "Unemployed" },
              { value: "student", label: "Student" },
            ],
          },
        },
      },

      jobInfo: {
        type: "block",
        title: "Employment Details",
        conditional: { field: "employmentStatus", equal: "unemployed", state: false },
        properties: {
          employerName: {
            type: "text",
            title: "Employer Name",
            required: true,
            conditional: { field: "employmentStatus", equal: "employed", state: true },
          },
          position: {
            type: "text",
            title: "Position",
            required: true,
            conditional: { field: "employmentStatus", equal: "employed", state: true },
          },

          businessName: {
            type: "text",
            title: "Business Name",
            required: true,
            conditional: { field: "employmentStatus", equal: "selfEmployed", state: true },
          },
          businessType: {
            type: "text",
            title: "Type of Business",
            required: true,
            conditional: { field: "employmentStatus", equal: "selfEmployed", state: true },
          },
          yearsOperating: {
            type: "number",
            title: "Years in Operation",
            required: true,
            conditional: { field: "employmentStatus", equal: "selfEmployed", state: true },
          },

          institutionName: {
            type: "text",
            title: "Institution Name",
            required: true,
            conditional: { field: "employmentStatus", equal: "student", state: true },
          },
          fieldOfStudy: {
            type: "text",
            title: "Field of Study",
            conditional: { field: "employmentStatus", equal: "student", state: true },
          },

          monthlyIncome: {
            type: "number",
            title: "Monthly Income (USD)",
            required: true,
            validator: (value: number) => {
              return value >= 1000
                ? true
                : "Income must be at least $1,000 to apply for a loan";
            },
            // always show, optional for student/unemployed
          },
        },
      },


      loanDetails: {
        type: "block",
        title: "Loan Details",
        properties: {
          amountRequested: {
            type: "number",
            title: "Loan Amount (USD)",
            required: true,
            validator: (value, formValues) => {
              const income = Number(formValues.monthlyIncome);
              if (value > income * 10)
                return "Loan amount must not exceed 10x monthly income";
              return true;
            },
          },
          purpose: {
            type: "select",
            title: "Loan Purpose",
            required: true,
            options: [
              { value: "home", label: "Home Purchase" },
              { value: "car", label: "Car Loan" },
              { value: "education", label: "Education" },
              { value: "business", label: "Business Investment" },
              { value: "personal", label: "Personal" },
            ],
          },
          repaymentTerm: {
            type: "select",
            title: "Repayment Term",
            required: true,
            default: "36",
            options: [
              { value: "12", label: "12 months" },
              { value: "24", label: "24 months" },
              { value: "36", label: "36 months" },
              { value: "60", label: "60 months" },
            ],
          },
        },
      },
    },
    buttons: [
      { type: "submit", label: "Apply Now" },
      { type: "reset", label: "Start Over", variant: "ghost" },
    ],
  });

  const customComponents: CustomComponents = {
    // You could define special input renderers here (e.g., masked input, currency input, etc.)
  };

  const onSubmit = (data: Record<string, unknown>) => {
    console.log("Loan Application Submitted:", data);
  };

  return (
    <div style={{ width: "600px", margin: "60px auto" }}>
      <h1 style={{ textAlign: "center" }}>Loan Application</h1>
      <FormFate
        formDefinition={loanForm}
        onSubmit={onSubmit}
        components={customComponents}
      />
    </div>
  );
}
