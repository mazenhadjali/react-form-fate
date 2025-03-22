import React from "react"

type FormItemContextValue = { id: string }

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const id = React.useId()

    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                ref={ref}
                className={className}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem"
                }}
                {...props}
            >
                {props.children}
            </div>

        </FormItemContext.Provider>
    )
})

FormItem.displayName = "FormItem"

export { FormItem, FormItemContext }
