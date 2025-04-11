import { Button, ButtonProps } from "@/lib/elements/button";
import { FormProvider } from "react-hook-form";
import { FormDefinition, useFormFate } from "formfatecore";
import { CustomComponents } from "./interfaces";
import { FieldRenderer, FieldRendererProps } from "./fieldRenderer/fieldRenderer";
import React from "react";
import Block from "./elements/block";

export interface FormFateProps {
    formDefinition: FormDefinition;
    onSubmit?: (data: Record<string, unknown>) => void;
    components?: CustomComponents;
}

export function FormFate({ formDefinition, onSubmit, components }: FormFateProps) {
    const form = useFormFate(formDefinition,);
    const { handleSubmit, control, setValue, watch } = form;
    const formValues = watch();


    // Handle form reset by a recurring function
    const handleReset = (props) => {
        Object.entries(props.properties).forEach(([name, field]) => {
            if (field.type === "block" && field.properties) {
                handleReset(field);
            } else {
                // Set default values for each field in the form
                console.log("Setting default value for field:", name);
                setValue(name, field.default || '');
            }
        });
    };

    const defaultOnSubmit = (data: Record<string, unknown>) => {
        console.log("Form Data Submitted:", data);
    };

    const submitHandler = onSubmit || defaultOnSubmit;

    const renderFields = (properties: FormDefinition["properties"]) => {
        return Object.entries(properties).map(([key, fieldConfig]: [string, FormDefinition["properties"]]) => {
            const conditional = fieldConfig.conditional;

            // Handle conditional display
            if (conditional) {
                const { field, equal, notEqual, state } = conditional;
                const fieldValue = formValues[field] ?? null;
                let conditionMet = false;

                if (equal !== undefined) conditionMet = fieldValue === equal;
                else if (notEqual !== undefined) conditionMet = fieldValue !== notEqual;

                if (fieldValue === undefined && (equal !== undefined || notEqual !== undefined)) {
                    conditionMet = false;
                }

                if (conditionMet !== state) return null;
            }

            // Handle "block" type fields
            if (fieldConfig.type === "block" && fieldConfig.properties) {
                return (
                    <Block fieldConfig={fieldConfig} key={key}>
                        {renderFields(fieldConfig.properties)}
                    </Block>
                );
            }

            // Render normal field
            return (
                <FieldRenderer
                    key={key}
                    control={control}
                    name={key}
                    fieldConfig={fieldConfig as FieldRendererProps["fieldConfig"]}
                    components={components}
                />
            );
        });
    };

    return (
        <React.Fragment>
            <FormProvider {...form}>
                {renderFields(formDefinition.properties)}

                <div style={{ display: "flex", gap: "1rem", paddingTop: "1rem" }}>
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
                                ...button.style,
                            }}
                            onClick={
                                button.type === "submit"
                                    ? handleSubmit(submitHandler)
                                    : button.type === "reset"
                                        ? () => handleReset(formDefinition)
                                        : undefined
                            }
                            disabled={button.disabled}
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>
            </FormProvider>
        </React.Fragment>
    );
}
