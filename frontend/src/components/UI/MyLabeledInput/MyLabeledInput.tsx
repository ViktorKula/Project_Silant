import React, { ComponentPropsWithoutRef, useEffect, useId, useRef } from "react";

import classes from './MyLabeledInput.module.scss';
import { makeClassName } from "../../../utils/classes";

export enum LabelType {
    LIGHT = "LIGHT",
    NORMAL = "NORMAL",
}

interface MyLabeledInputProps extends ComponentPropsWithoutRef<"input">{
    id: string;
    labelCaption?: string;
    labelType?: LabelType;
    isLabelMarked?: boolean;
    errorCaption?: string;
    errorPlaceholder?: string;
    // value?: string;
    setValue?: (value: string) => void;
    isError?: boolean;
    setIsError?: (value: boolean) => void;
    addContainerClassNames?: string[];
    addLabelClassNames?: string[];
    addInputClassNames?: string[];
    addErrorMsgClassNames?: string[];
}

const MyLabeledInput: React.FC<MyLabeledInputProps> = ({id, type="text", labelCaption = "", labelType = LabelType.NORMAL,isLabelMarked = false, 
    errorCaption = "", errorPlaceholder = "", value = "", setValue = undefined, isError = false, setIsError = undefined, 
    addContainerClassNames = [], addLabelClassNames = [], addInputClassNames = [], addErrorMsgClassNames = [], ...rest}: MyLabeledInputProps) => {

    let labelTypeClassName = classes.label_normal;

    const labelMarkClassNames = [
        classes.label_mark_normal,
        classes.label_mark_error,
    ];

    const inputClassNames = [
        classes.input_normal,
        classes.input_error,
    ];

    const errorMsgClassNames = [
        classes.error_msg_hidden,
        classes.error_msg_visible,
    ];

    const handleInputChange = (value: string) => {
        if (setValue) {
            setValue(value);
        }
        if (setIsError) {
            setIsError(false);
        }
    }

    let placeholder = "";
    if (isError) {
        placeholder = errorPlaceholder;
    }

    return (
        <div className={makeClassName(classes.container, addContainerClassNames)}>
            <div className={classes.label_container}>
                {/* <label htmlFor={id} className={makeClassName(classes.label, addLabelClassNames)}> */}
                <label htmlFor={id} className={makeClassName(labelTypeClassName, addLabelClassNames)}>
                    {labelCaption}
                </label>
                {isLabelMarked 
                    ?
                    <p className={labelMarkClassNames[Number(isError)]}>*</p>
                    :
                    null
                }
            </div>
            <input 
                id={id} 
                type={type} 
                className={makeClassName(inputClassNames[Number(isError)], addInputClassNames)} 
                onChange={(event) => handleInputChange(event.target.value)}
                placeholder={placeholder}
                value={value}
                {...rest}
            />
            <div className={classes.error_msg_container}>
                <p className={makeClassName(errorMsgClassNames[Number(isError)], addErrorMsgClassNames)}>{errorCaption}</p>
            </div>
        </div>
    );
}

export default MyLabeledInput;