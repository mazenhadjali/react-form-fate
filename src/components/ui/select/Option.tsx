/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { OptionHTMLAttributes } from "react";

export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> { }

export const Option: React.FC<OptionProps> = ({ children, ...props }) => {
    return <option {...props}>{children}</option>;
};

export default Option;
