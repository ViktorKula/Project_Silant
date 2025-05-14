import React from "react";

import classes from "./PageMain.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
// import SimpleCarTable from "../SimpleCars/SimpleCarTable/SimpleCarTable";
import LoginedPanel from "./LoginedPanel/1LoginedPanel";
import SimpleCarTable from "../SimpleCars/SimpleCarTable/SimpleCarTable";

const PageMain: React.FC = () => {
    // const {isLogined, token, loading, error} = useTypedSelector(state => state.account);
    
    // console.log("PageMain");

    return (
        <div className={classes.page}>
            {/* {isLogined ? 
                <LoginedPanel/>
            :
                <SimpleCarTable/> 
            } */}
            <SimpleCarTable/>
        </div>
    );
}

export default PageMain;