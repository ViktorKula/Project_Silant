import React from "react";

import classes from "./PageMaintenances.module.scss";

import MaintenanceTable from "./MaintenanceTable/MaintenanceTable";

const PageMaintenances: React.FC = () => {
    // const {isLogined, token, loading, error} = useTypedSelector(state => state.account);
    
    return (
        <div className={classes.page}>
            <MaintenanceTable/>
        </div>
    );
}

export default PageMaintenances;