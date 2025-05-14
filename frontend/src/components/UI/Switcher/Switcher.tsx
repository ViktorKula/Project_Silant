import React from "react";
import classes from "./Switcher.module.scss";

export interface SwitcherElem {
    id: number;
    caption: string;
}

interface SwitcherProps {
    elems: SwitcherElem[];
    selectedIndex: number;
    setSelectedIndex: (selectedIndex: number) => void;
}

const Switcher: React.FC<SwitcherProps> = ({elems, selectedIndex, setSelectedIndex}) => {

    const getClassByIndex = (index: number): string =>
        {
            return (index === selectedIndex ? classes.item_selected : classes.item);
        }

    return (
        <div className={classes.list}>
            {elems.map((elem, index) =>
                <div key={elem.id} className={getClassByIndex(index)} onClick={() => setSelectedIndex(index)}>
                    <div className={classes.caption_container}>
                        <div className={classes.caption_wrapper}/>
                        <p>{elem.caption}</p>
                        <div className={classes.caption_wrapper}/>
                    </div>
                    <hr/>
                </div>
            )}
        </div>
    );
}

export default Switcher;