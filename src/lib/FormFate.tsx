import { Button, ButtonProps } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { FieldRenderer, FieldRendererProps } from "@/lib/FieldRenderer";
import { FormDefinition, useFormFate } from "formfatecore";
import { CustomComponents } from "./interfaces";

export interface FormFateProps {
    formDefinition: FormDefinition;
    onSubmit?: (data: Record<string, unknown>) => void; // Make onSubmit optional
    components?: CustomComponents;
}

export function FormFate({ formDefinition, onSubmit, components }: FormFateProps) {
    const form = useFormFate(formDefinition);
    const { handleSubmit, control, setValue, watch } = form;

    const formValues = watch(); // Watch form values to evaluate conditions dynamically

    const handleReset = () => {
        Object.keys(formDefinition.properties).forEach((key) => {
            setValue(key, "");
        });
    };

    // Default onSubmit logic if not provided
    const defaultOnSubmit = (data: Record<string, unknown>) => {
        console.log("Form Data Submitted:", data);
    };

    // Use the provided onSubmit or default one
    const submitHandler = onSubmit || defaultOnSubmit;

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(submitHandler)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {Object.entries(formDefinition.properties).map(([key, fieldConfig]) => {
                    // Check if the field has a conditional logic
                    const conditional = fieldConfig.conditional;
                    if (conditional) {
                        const { field, equal, notEqual, state } = conditional;

                        // Ensure field value exists in the form values
                        const fieldValue = formValues[field];

                        // Default to condition not met if no condition is provided
                        let conditionMet = false;

                        // Evaluate the condition based on the "equal" or "notEqual" operator
                        if (equal !== undefined) {
                            conditionMet = fieldValue === equal;
                        } else if (notEqual !== undefined) {
                            conditionMet = fieldValue !== notEqual;
                        }

                        // If the condition is met, then we compare with the "state"
                        if (conditionMet !== state) {
                            return null; // Skip rendering this field if the condition is not satisfied
                        }
                    }

                    // Render the field if no condition exists or condition is satisfied
                    return (
                        <FieldRenderer
                            key={key}
                            control={control}
                            name={key}
                            fieldConfig={fieldConfig as FieldRendererProps["fieldConfig"]}
                            components={components}
                        />
                    );
                })}

                <div style={{ display: "flex", gap: "1rem" }}>
                    {formDefinition?.buttons?.map((button, index) => (
                        <Button
                            key={index}
                            type={button.type}
                            variant={button.variant as ButtonProps["variant"]}
                            style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "0.375rem",
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "background-color 0.2s",
                            }}
                            onClick={button.type === "reset" ? handleReset : undefined}
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>
            </form>
        </FormProvider>
    );
}
