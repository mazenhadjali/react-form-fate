/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ButtonProps } from "@/lib/elements/button";
import { FormProvider } from "react-hook-form";
import { extractDefaults, FormDefinition, useFormFate } from "formfatecore";
import { CustomComponents } from "./interfaces";
import { FieldRenderer } from "./fieldRenderer/fieldRenderer";
import React from "react";
import Block from "./elements/block";
import { RemoteDataProvider } from "./remoteData/remoteDataContext";

export interface FormFateProps {
    formDefinition: FormDefinition;
    onSubmit?: (data: Record<string, unknown>) => void;
    components?: CustomComponents;
}

export function FormFate({ formDefinition, onSubmit, components }: FormFateProps) {
    const form = useFormFate(formDefinition,);
    const { handleSubmit, control, watch, reset } = form;
    const formValues = watch();

    const defaultOnSubmit = (data: Record<string, unknown>) => {
        console.log("Form Data Submitted:", data);
    };

    const submitHandler = onSubmit || defaultOnSubmit;

    const renderFields = (properties: FormDefinition["properties"]) => {
        return Object.entries(properties).map(([key, fieldConfig]: [string, FormDefinition["properties"]]) => {
            const conditional = fieldConfig.conditional;

            // Handle conditional display
            if (fieldConfig.conditional) {
                let conditionMet = true;
                if (typeof fieldConfig.conditional === "function") {
                    conditionMet = conditional({ formValues });
                } else {
                    const { field, equal, notEqual, state } = fieldConfig.conditional;
                    const fieldValue = formValues[field] ?? null;
                    if (equal !== undefined) conditionMet = fieldValue === equal;
                    else if (notEqual !== undefined) conditionMet = fieldValue !== notEqual;
                    if (fieldValue === undefined && (equal !== undefined || notEqual !== undefined)) {
                        conditionMet = false;
                    }
                    if (conditionMet !== state) return null;
                }
                if (!conditionMet) return null;
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
                    formValues={formValues}
                    name={key}
                    fieldConfig={fieldConfig}
                    components={components}
                />
            );
        });
    };


    return (
        <React.Fragment>
            <RemoteDataProvider>
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
                                        ? () => {
                                            console.log("Submitting form with data:", formValues);
                                            handleSubmit((data) => {
                                                submitHandler(data);
                                            })();
                                        }
                                        : button.type === "reset"
                                            ? () => { reset(extractDefaults(formDefinition)) }
                                            : undefined
                                }
                                disabled={button.disabled}
                            >
                                {button.label}
                            </Button>
                        ))}
                    </div>
                </FormProvider>
            </RemoteDataProvider>
        </React.Fragment>
    );
}