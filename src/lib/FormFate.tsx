import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { FieldRenderer } from "@/lib/FieldRenderer";
import { FormDefinition, useFormFate } from "@/formFateCore";

export interface FormFateProps {
    formDefinition: FormDefinition;
    onSubmit: (data: Record<string, unknown>) => void;
}

export default function FormFate({ formDefinition, onSubmit }: FormFateProps) {


    const form = useFormFate(formDefinition);
    const { handleSubmit, control, formState: { isSubmitting } } = form;

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {Object.entries(formDefinition.properties).map(([key, fieldConfig]) => (
                    <FieldRenderer key={key} control={control} name={key} fieldConfig={fieldConfig} />
                ))}
                <div className="space-x-4">
                    {formDefinition.buttons.map((button, index) => (
                        <Button key={index} type={button.type} disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : button.label}
                        </Button>
                    ))}
                </div>
            </form>
        </FormProvider>
    );
}
