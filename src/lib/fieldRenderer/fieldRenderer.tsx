import { FormField } from "@/lib/fieldRenderer/formField";
import { FormItem } from "@/lib/fieldRenderer/formItem";
import { Control, ControllerRenderProps } from "react-hook-form";
import { Select } from "@/lib/elements/select";
import { CustomComponents } from "@/lib/interfaces";
import { Input } from "@/lib/elements";
import React from "react";
import RadioItem from "@/lib/elements/radio/radioItem";
import RadioGroup from "../elements/radio/radioGroup";

export interface FieldRendererProps {
    name: string;
    control: Control
    fieldConfig: {
        type: string;
        title: string;
        description?: string;
        required?: boolean;
        validator?: (value: unknown) => string | true;
        default?: string | boolean | number;
        options?: { value: string; label: string }[];
        conditional?: {
            field: string;
            equal?: string;
            notEqual?: string;
            state: boolean;
        }
    };
    components?: CustomComponents;
}

const getComponents = (components?: CustomComponents) => {
    const componentMap = {
        text: Input,
        email: Input,
        password: Input,
        date: Input,
        time: Input,
        url: Input,
        number: Input,
        ...components,
        select: components?.select || Select,
        // selectOption: components?.selectOption || SelectOption,
        radio: components?.radio || RadioGroup,
        radioItem: components?.radioItem || RadioItem,
    };
    // console.log("Component Map:", componentMap);
    return componentMap;
};

const renderComponent = (
    componentMap: Record<string, React.ElementType>,
    field: ControllerRenderProps<Record<string, unknown>, string>,
    fieldConfig: FieldRendererProps['fieldConfig']
) => {
    const Component = componentMap[fieldConfig.type as keyof typeof componentMap];

    if (!Component) return null;

    switch (fieldConfig.type) {
        case "text":
        case "email":
        case "password":
        case "date":
        case "time":
        case "url":
            return (
                <Component
                    type={fieldConfig.type}
                    placeholder={fieldConfig.description}
                    field={field}
                    fieldConfig={fieldConfig}
                    value={field.value as string}
                    ref={field.ref}
                />
            );
        case "select":
            return (
                <Component
                    placeholder={fieldConfig.description}
                    field={field}
                    fieldConfig={fieldConfig}
                    value={field.value as string}
                    ref={field.ref}
                />);
        case "radio":
            return (
                <Component
                    value={field.value as string}
                    ref={field.ref}
                >
                    {fieldConfig.options?.map((option) => (
                        <RadioItem key={option.value} field={field} option={option} />
                    ))}
                </Component>
            );
    }

    return componentMap[fieldConfig.type] ? (
        <Component field={field} fieldConfig={fieldConfig} ref={field.ref} />
    ) : null;
};

export function FieldRenderer({ control, name, fieldConfig, components }: FieldRendererProps) {
    const componentMap = getComponents(components);
    const Component = componentMap[fieldConfig.type as keyof typeof componentMap];
    if (!Component) return;
    return (
        <FormField
            control={control}
            name={name}
            rules={{
                required: fieldConfig.required ? `${fieldConfig.title} is required` : undefined,
                validate: fieldConfig.validator,
            }}
            render={({ field }: { field: ControllerRenderProps<Record<string, unknown>, string> }) => {
                return (

                    <FormItem>
                        {/* <FormLabel>{fieldConfig.title}</FormLabel> */}
                        {/* <FormControl>{renderComponent(componentMap, field, fieldConfig)}</FormControl> */}
                        {renderComponent(componentMap, field, fieldConfig)}
                        {/* <Component field={field} fieldConfig={fieldConfig} ref={field.ref} /> */}
                        {/* <FormMessage /> */}
                    </FormItem>
                )
            }}
        />
    );
}