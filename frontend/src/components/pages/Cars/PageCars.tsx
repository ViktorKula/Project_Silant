import React from "react";

import classes from "./PageCars.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

import CarTable from "../Cars/CarTable/CarTable";

const PageCars: React.FC = () => {
    // const {isLogined, token, loading, error} = useTypedSelector(state => state.account);
    
    return (
        <div className={classes.page}>
            <CarTable/>
        </div>
    );
}

export default PageCars;