/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> { }

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ style, ...props }, ref) => (
    <label
      ref={ref}
      style={{
        fontSize: "0.875rem", // text-sm
        fontWeight: 500, // font-medium
        lineHeight: "1.25rem", // leading-none
        ...style, // Allow custom styles to be merged
      }}
      {...props}
    />
  )
);

Label.displayName = "Label";

export default Label;