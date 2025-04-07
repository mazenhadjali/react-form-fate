import { Button, ButtonProps } from "@/lib/elements/button";
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
                    <div key={key} style={{ marginBottom: "1.5rem" }}>
                        {fieldConfig.title && <h3 className="text-lg font-semibold mb-2">{fieldConfig.title}</h3>}
                        <div className={fieldConfig.className} style={fieldConfig.style}>
                            {renderFields(fieldConfig.properties)}
                        </div>
                    </div>
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
                                        ? handleReset
                                        : undefined
                            }
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>
            </FormProvider>
        </React.Fragment>
    );
}
