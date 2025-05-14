import React, { ComponentPropsWithoutRef } from "react";

import classes from './MyButton.module.scss';

interface MyButtonProps extends ComponentPropsWithoutRef<"button">{
    addClassNames?: string[];
}

const MyButton: React.FC<MyButtonProps> = ({children, addClassNames, ...rest}: MyButtonProps) => { 
    let usedClasses = [classes.btn_common];

    let usedRest = rest;
    if (!usedRest.type) {
        usedRest.type = "button";
    }

    if (addClassNames) {
        usedClasses.push(...addClassNames);
    }

    return (
        <button className={usedClasses.join(" ")} {...usedRest}>{children}</button>
    );
}

export default MyButton;