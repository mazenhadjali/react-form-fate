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
};

export function FieldRenderer({ control, name, fieldConfig }: FieldRendererProps) {
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
                    <FormControl>
                        {fieldConfig.type === "text" || fieldConfig.type === "email" || fieldConfig.type === "password" || fieldConfig.type === "date" || fieldConfig.type === "time" || fieldConfig.type === "url" ? (
                            <Input type={fieldConfig.type} placeholder={fieldConfig.description} {...field} value={field.value as string} ref={field.ref} />
                        ) : fieldConfig.type === "checkbox" ? (
                            <Checkbox
                                description={fieldConfig.description}
                                checked={field.value as boolean}
                                onCheckedChange={(checked) => field.onChange(checked)}
                                ref={field.ref}
                            />
                        ) : fieldConfig.type === "select" ? (
                            <Select value={field.value as string} onValueChange={field.onChange}>
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
                            </Select>
                        ) : fieldConfig.type === "radio" ? (
                            <RadioGroup value={field.value as string} onValueChange={field.onChange}>
                                {fieldConfig.options?.map((option) => (
                                    <RadioGroupItem key={option.value} value={option.value}>
                                        <Label>{option.label}</Label>
                                    </RadioGroupItem>
                                ))}
                            </RadioGroup>
                        ) : null}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
