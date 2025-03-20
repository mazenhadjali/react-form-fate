import { FormField } from "@/components/ui/form/formField";
import { FormItem } from "@/components/ui/form/formItem";
import { FormLabel } from "@/components/ui/form/formLabel";
import { FormControl } from "@/components/ui/form/formControl";
import { FormMessage } from "@/components/ui/form/formMessage";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CustomComponents } from "./interfaces";

export interface FieldRendererProps {
    control: Control<Record<string, unknown>>;
    name: string;
    fieldConfig: {
        type: string;
        title: string;
        description?: string;
        required?: boolean;
        validator?: (value: any) => string | true;
        default?: string | boolean | number;
        options?: { value: string; label: string }[];
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
        checkbox: components?.checkbox || Checkbox,
        select: components?.select || Select,
        radio: components?.radioGroup || RadioGroup,
    };
    return componentMap[fieldConfig.type as keyof typeof componentMap] || null;
};

const renderComponent = (Component: any, field: any, fieldConfig: FieldRendererProps['fieldConfig']) => {
    if (!Component) return null;

    switch (fieldConfig.type) {
        case "checkbox":
            return (
                <Component
                    description={fieldConfig.description}
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                    ref={field.ref}
                />
            );
        case "select":
            return (
                <Component value={field.value as string} onValueChange={field.onChange}>
                    <SelectTrigger>
                        <SelectValue placeholder={fieldConfig.description} />
                    </SelectTrigger>
                    <SelectContent>
                        {fieldConfig.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Component>
            );
        case "radio":
            return (
                <Component value={field.value as string} onValueChange={field.onChange}>
                    {fieldConfig.options?.map((option) => (
                        <RadioGroupItem key={option.value} value={option.value}>
                            <Label>{option.label}</Label>
                        </RadioGroupItem>
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
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{fieldConfig.title}</FormLabel>
                    <FormControl>{renderComponent(Component, field, fieldConfig)}</FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}