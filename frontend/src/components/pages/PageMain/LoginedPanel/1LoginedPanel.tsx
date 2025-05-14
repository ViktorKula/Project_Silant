import React from "react";

import classes from "./LoginedPane.module.scss";
import CarTable from "../../Cars/CarTable/CarTable";
// import commonClasses from "../../../styles/common.module.scss";

const LoginedPanel: React.FC = () => {
    // console.log("items = ", items);
    // console.log("car_num = ", car_num);

    // if (loading) {
    //     return (
    //         <Loader/>
    //     );
    // }

    return (
        <div>
            <CarTable/>
        </div>
    );
}

export default LoginedPanel;