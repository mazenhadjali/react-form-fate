import React from 'react'

type Props = {
    children?: React.ReactNode
    fieldConfig?: Record<string, any>
}

function Block({ children, fieldConfig }: Props) {
    return (
        <div style={{ marginBottom: "1.5rem", border: "1px solid #ccc", borderRadius: "8px", padding: "1rem" }}>
            {fieldConfig?.title && <h3 className="text-lg font-semibold mb-2">{fieldConfig?.title}</h3>}
            <div className={fieldConfig?.className}>
                {children}
            </div>
        </div>
    )
}

export default Block