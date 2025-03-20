import { FormField } from "@/components/ui/form/formField";
import { FormItem } from "@/components/ui/form/formItem";
import { FormLabel } from "@/components/ui/form/formLabel";
import { FormControl } from "@/components/ui/form/formControl";
import { FormMessage } from "@/components/ui/form/formMessage";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";

type FieldRendererProps = {
    control: Control<any>;
    name: string;
    fieldConfig: {
        type: string;
        title: string;
        description?: string;
        required?: boolean;
        validator?: (value: any) => string | false;
        default?: string;
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
                            <Input type={fieldConfig.type} placeholder={fieldConfig.description} {...field} />
                        ) : fieldConfig.type === "checkbox" ? (
                            <Checkbox {...field} checked={field.value || false} />
                        ) : null}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
