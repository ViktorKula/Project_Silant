import React, { ComponentPropsWithoutRef, useEffect, useId, useRef } from "react";

import classes from './MyLabeledCheckbox.module.scss';
import { makeClassName } from "../../../utils/classes";

interface MyLabeledCheckboxProps extends ComponentPropsWithoutRef<"input">{
    // id: string;
    labelCaption?: string;
    checked?: boolean;
    setChecked?: (checked: boolean) => void;
    addContainerClassNames?: string[];
    addLabelClassNames?: string[];
    addInputClassNames?: string[];
}

const MyLabeledCheckbox: React.FC<MyLabeledCheckboxProps> = ({type="checkbox", labelCaption = "", checked = false, setChecked = undefined, 
    addContainerClassNames = [], addLabelClassNames = [], addInputClassNames = [],  ...rest}: MyLabeledCheckboxProps) => {

    const handleInputChange = (checked: boolean) => {
        if (setChecked) {
            setChecked(checked);
        }
        // if (setIsError) {
        //     setIsError(false);
        // }
    }

    return (
        <div className={classes.main_container}>
            <label className={makeClassName(classes.container, addContainerClassNames)}>
                <input 
                    type={type} 
                    className={makeClassName(classes.checkbox, addInputClassNames)} 
                    onChange={(event) => handleInputChange(event.target.checked)}
                    checked={checked}
                    {...rest}
                />
                <span className={classes.checkmark}/>
                {labelCaption}
            </label>
        </div>
    );
}

export default MyLabeledCheckbox;