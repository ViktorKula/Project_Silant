import React, { ComponentPropsWithoutRef, useEffect, useId, useRef } from "react";

import classes from './MyLabeledSelect.module.scss';
import { makeClassName } from "../../../utils/classes";

export interface SelectOption {
    value: string;
    caption: string;
}

interface MyLabeledSelectProps extends ComponentPropsWithoutRef<"select">{
    id: string;
    labelCaption?: string;
    isLabelMarked?: boolean;
    // value?: string;
    setValue?: (value: string) => void;
    options: SelectOption[];
    addContainerClassNames?: string[];
}

const MyLabeledSelect: React.FC<MyLabeledSelectProps> = ({id, labelCaption = "", isLabelMarked = false, value = "", setValue = undefined, 
    defaultValue = "", options, addContainerClassNames = [], ...rest}: MyLabeledSelectProps) => {

    const handleSelectChange = (value: string) => {
        if (setValue) {
            setValue(value);
        }
        // if (setIsError) {
        //     setIsError(false);
        // }
    }

    return (
        <div className={makeClassName(classes.container, addContainerClassNames)}>
            <div className={classes.label_container}>
                {/* <label htmlFor={id} className={makeClassName(classes.label, addLabelClassNames)}> */}
                <label htmlFor={id} className={classes.label_normal}>
                    {labelCaption}
                </label>
                {isLabelMarked 
                    ?
                    <p className={classes.label_mark_normal}>*</p>
                    :
                    null
                }
            </div>
            <select 
                id={id} 
                className={classes.select_normal} 
                value={value}
                onChange={(event) => handleSelectChange(event.target.value)}
                {...rest}
                // defaultValue={defaultValue}
            >
                {defaultValue 
                    ? 
                    <option disabled value="">
                        {defaultValue}
                    </option> 
                    : 
                    null
                }
                
                {options.map(option =>
                    <option key={option.value} value={option.value}>
                        {option.caption}
                    </option>
                )}
            </select>
        </div>
    );
}

export default MyLabeledSelect;