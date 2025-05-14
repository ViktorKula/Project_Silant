import React from "react";

import classes from "./PageReclamations.module.scss";
import ReclamationTable from "./ReclamationTable/ReclamationTable";

const PageReclamations: React.FC = () => {
    // const {isLogined, token, loading, error} = useTypedSelector(state => state.account);
    
    return (
        <div className={classes.page}>
            <ReclamationTable/>
        </div>
    );
}

export default PageReclamations;