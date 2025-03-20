import React from "react"
import { useFormField } from "./formField"
import { Label } from "@/components/ui/label"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/lib/utils"

const FormLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField()

    return (
        <Label
            ref={ref}
            className={cn(error && "text-destructive", className)}
            htmlFor={formItemId}
            {...props}
        />
    )
})
FormLabel.displayName = "FormLabel"

export { FormLabel }