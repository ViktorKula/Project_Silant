import React, { useEffect } from "react";

import classes from './MyModal.module.css';

const MyModal = ({children, visible, setVisible, contentClassName}) => {
    // console.log(visible);
    const rootClasses = [classes.myModal];
    if (visible) {
        rootClasses.push(classes.active);
    }

    let usedContentClassName = classes.myModalContent;
    if (contentClassName) {
        usedContentClassName = contentClassName;
    }

    const getVisible = () => {
        return visible;
    }

    const handleKeyPress = (event) => {
        // console.log(event);
        // console.log("visible", getVisible)
        // console.log("event.key", event.key)
        if (getVisible && (event.key === 'Escape')) {
            setVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        // console.log("addEventListener");
    }, []);

    useEffect(() => () => {
        document.removeEventListener("keydown", handleKeyPress);
        // console.log("removeEventListener");
    }, []);

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            {/* <div className={rootClasses.join(' ')} onClick={() => setVisible(false)} onKeyDown={(event) => handleKeyPress(event)} tabIndex={0}> */}
            <div className={usedContentClassName} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default MyModal;