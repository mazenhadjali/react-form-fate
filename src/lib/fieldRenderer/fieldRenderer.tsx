import { FormField } from "@/lib/fieldRenderer/formField";
import { FormItem } from "@/lib/fieldRenderer/formItem";
import { Control, ControllerRenderProps } from "react-hook-form";
import { Select } from "@/lib/elements/select";
import { CustomComponents } from "@/lib/interfaces";
import { Input } from "@/lib/elements";
import React from "react";
import RadioItem from "@/lib/elements/radio/radioItem";
import RadioGroup from "../elements/radio/radioGroup";
import { FormDefinition } from "formfatecore";
import { useRemoteData } from "../remoteData/useRemoteData";
import { callDataSource } from "../remoteData/utils";

export interface FieldRendererProps {
    name: string;
    control: Control;
    formValues: Record<string, unknown>;
    fieldConfig: FormDefinition["properties"];
    components?: CustomComponents;
}

const getComponents = (components?: CustomComponents) => {
    return {
        text: Input,
        email: Input,
        password: Input,
        date: Input,
        time: Input,
        url: Input,
        number: Input,
        ...components,
        select: components?.select || Select,
        radio: components?.radio || RadioGroup,
        radioItem: components?.radioItem || RadioItem,
    };
};

const renderComponent = (
    componentMap: Record<string, React.ElementType>,
    field: ControllerRenderProps<Record<string, unknown>, string>,
    fieldConfig: FieldRendererProps["fieldConfig"],
    remoteOptions?: any[] | null
) => {
    const Component = componentMap[fieldConfig.type as keyof typeof componentMap];
    if (!Component) return null;

    const commonProps = {
        field,
        fieldConfig,
        value: field.value as string,
        ref: field.ref,
        placeholder: fieldConfig.description,
    };

    switch (fieldConfig.type) {
        case "text":
        case "email":
        case "password":
        case "date":
        case "time":
        case "url":
        case "number":
            return <Component type={fieldConfig.type} {...commonProps} />;

        case "select": {
            const options = remoteOptions || fieldConfig.options;
            return <Component {...commonProps} options={options} />;
        }

        case "radio": {
            const options = remoteOptions || fieldConfig.options;
            return (
                <Component value={field.value as string} ref={field.ref}>
                    {options?.map((option: { value: string; label: string }) => (
                        <RadioItem key={option.value} field={field} option={option} />
                    ))}
                </Component>
            );
        }

        default:
            return <Component {...commonProps} />;
    }
};

export function FieldRenderer({ control, formValues, name, fieldConfig, components, }: FieldRendererProps) {
    const componentMap = getComponents(components);

    // Only fetch remote options if optionsUrl exists
    const { data: remoteOptions } = useRemoteData(
        name,
        async () => fieldConfig.optionsUrl ? await callDataSource(fieldConfig.optionsUrl) : Promise.resolve(null),
        []
    );

    return (
        <FormField
            control={control}
            name={name}
            rules={{
                required: fieldConfig.required ? `${fieldConfig.title} is required` : undefined,
                validate: fieldConfig.validator,
            }}
            render={({ field }: { field: ControllerRenderProps<Record<string, unknown>, string> }) => {
                const resolvedFieldConfig = {
                    ...fieldConfig,
                    disabled:
                        typeof fieldConfig.disabled === "function"
                            ? fieldConfig.disabled({ formValues })
                            : fieldConfig.disabled,
                };
                field.disabled = resolvedFieldConfig.disabled;

                return (
                    <FormItem>
                        {renderComponent(componentMap, field, resolvedFieldConfig, fieldConfig.optionsUrl?.mapper ? fieldConfig.optionsUrl?.mapper({ response: remoteOptions, formValues }) : remoteOptions)}
                    </FormItem>
                );
            }}
        />
    );
}
