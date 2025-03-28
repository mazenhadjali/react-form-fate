import { FormField } from "@/lib/fieldRenderer/formField";
import { FormItem } from "@/lib/fieldRenderer/formItem";
import { FormLabel } from "@/components/ui/form/formLabel";
import { FormControl } from "@/lib/fieldRenderer/formControl";
import { FormMessage } from "@/components/ui/form/formMessage";
import { Control, ControllerRenderProps } from "react-hook-form";
import { Select, SelectOption } from "@/components/ui/select";
import { CustomComponents } from "@/lib/interfaces";
import { Input } from "@/components/ui";
import React from "react";
import RadioGroup from "@/components/ui/radio/radioGroup";
import RadioItem from "@/components/ui/radio/radioItem";

export interface FieldRendererProps {
    control: Control<Record<string, unknown>>;
    name: string;
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
        text: components?.input || Input,
        email: components?.input || Input,
        password: components?.password || Input,
        date: components?.input || Input,
        time: components?.input || Input,
        url: components?.input || Input,
        select: components?.select || Select,
        selectOption: components?.selectOption || SelectOption,
        radio: components?.radio || RadioGroup,
        radioItem: components?.radioItem || RadioItem,
    };
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
                    {...field}
                    value={field.value as string}
                    ref={field.ref}
                />
            );
        case "select":
            return (
                <Component
                    placeholder={fieldConfig.description}
                    {...field}
                    value={field.value as string}
                    ref={field.ref}
                >
                    {fieldConfig.options?.map((option) => (
                        <SelectOption key={option.value} value={option.value}>
                            {option.label}
                        </SelectOption>
                    ))}
                </Component>
            );
        case "radio":
            return (
                <Component
                    value={field.value as string}
                    ref={field.ref}
                >
                    {fieldConfig.options?.map((option) => (
                        <RadioItem key={option.value} {...field} value={option.value}>
                            {option.label}
                        </RadioItem>
                    ))}
                </Component>
            );
        default:
            return (
                <Component
                    type={fieldConfig.type}
                    placeholder={fieldConfig.description}
                    {...field}
                    value={field.value as string}
                    ref={field.ref}
                />
            );
    }
};

export function FieldRenderer({ control, name, fieldConfig, components }: FieldRendererProps) {
    const componentMap = getComponents(components);
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
                        <FormLabel>{fieldConfig.title}</FormLabel>
                        <FormControl>{renderComponent(componentMap, field, fieldConfig)}</FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    );
}