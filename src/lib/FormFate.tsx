import { Button, ButtonProps } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { FormDefinition, useFormFate } from "formfatecore";
import { CustomComponents } from "./interfaces";
import { FieldRenderer, FieldRendererProps } from "./fieldRenderer/fieldRenderer";
import React from "react";

export interface FormFateProps {
    formDefinition: FormDefinition;
    onSubmit?: (data: Record<string, unknown>) => void;
    components?: CustomComponents;
}

export function FormFate({ formDefinition, onSubmit, components }: FormFateProps) {
    const form = useFormFate(formDefinition);
    const { handleSubmit, control, setValue, watch } = form;

    const formValues = watch();

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
        <React.Fragment>
            <FormProvider {...form}>
                {Object.entries(formDefinition.properties).map(([key, fieldConfig]: [string, any]) => {
                    const conditional = fieldConfig.conditional;

                    if (conditional) {
                        const { field, equal, notEqual, state } = conditional;

                        // Ensure field value exists in the form values, defaulting to null or a safe value
                        const fieldValue = formValues[field] ?? null; // or use an appropriate default based on your case

                        let conditionMet = false;

                        if (equal !== undefined) {
                            conditionMet = fieldValue === equal;
                        } else if (notEqual !== undefined) {
                            conditionMet = fieldValue !== notEqual;
                        }

                        // If fieldValue is undefined and the condition expects a specific value, prevent unintended matches
                        if (fieldValue === undefined && (equal !== undefined || notEqual !== undefined)) {
                            conditionMet = false;
                        }

                        if (conditionMet !== state) {
                            return null;
                        }
                    }

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
                    {formDefinition?.buttons?.map((button: any, index: any) => (
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
                            onClick={button.type === "submit" ? handleSubmit(submitHandler) : button.type === "reset" ? handleReset : undefined}
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>
            </FormProvider>
        </React.Fragment>

    );
}
