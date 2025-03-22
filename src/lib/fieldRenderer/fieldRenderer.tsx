import { FormField } from "@/lib/fieldRenderer/formField";
import { FormItem } from "@/lib/fieldRenderer/formItem";
import { FormLabel } from "@/components/ui/form/formLabel";
import { FormControl } from "@/lib/fieldRenderer/formControl";
import { FormMessage } from "@/components/ui/form/formMessage";
import { Control, ControllerRenderProps } from "react-hook-form";
import { Option, Select } from "@/components/ui/select";
import { CustomComponents } from "@/lib/interfaces";
import { Input } from "@/components/ui";
import React from "react";

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

const getComponent = (fieldConfig: FieldRendererProps['fieldConfig'], components?: CustomComponents) => {
    const componentMap = {
        text: components?.input || Input,
        email: components?.input || Input,
        password: components?.password || Input,
        date: components?.input || Input,
        time: components?.input || Input,
        url: components?.input || Input,
        select: components?.select || Select,
    };

    return componentMap[fieldConfig.type as keyof typeof componentMap] || null;
};

const renderComponent = (Component: React.ElementType, field: ControllerRenderProps<Record<string, unknown>, string>, fieldConfig: FieldRendererProps['fieldConfig']) => {
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
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
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
    const Component = getComponent(fieldConfig, components);

    return (
        <FormField
            control={control}
            name={name}
            rules={{
                required: fieldConfig.required ? `${fieldConfig.title} is required` : undefined,
                validate: fieldConfig.validator,
            }}
            render={({ field }: { field: ControllerRenderProps<Record<string, unknown>, string> }) => (
                <FormItem>
                    <FormLabel>{fieldConfig.title}</FormLabel>
                    <FormControl>{renderComponent(Component, field, fieldConfig)}</FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}