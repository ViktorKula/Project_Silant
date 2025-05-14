import React, { ComponentPropsWithoutRef } from "react";

import classes from './SortButton.module.scss';
import { SortMethod, nextSortMethod } from "../../../utils/sort";

interface SortButtonProps {
    value: SortMethod;
    setValue: (value: SortMethod) => void;

    addClassNames?: string[];
}

const SortButton: React.FC<SortButtonProps> = ({ value, setValue }) => { 

    let symbol = "-";
    if (value == SortMethod.SORT_METHOD_ASC) {
        symbol = "▲";
    } else if (value == SortMethod.SORT_METHOD_DESC) {
        symbol = "▼";
    }

    return (
        <div className={classes.sort_button} onClick={() =>setValue(nextSortMethod(value))}>
            {symbol}
        </div>
        // <button className={usedClasses.join(" ")} {...usedRest}>{children}</button>
    );
}

export default SortButton;