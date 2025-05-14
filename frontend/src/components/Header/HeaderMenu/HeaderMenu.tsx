import React from "react";

import classes from "./HeaderMenu.module.scss";
import { auxEntryRoutes, privateRoutes } from "../../../router";
import Navbar from "../../UI/Navbar/Navbar";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { RouteData } from "../../../types/common";
import { ModelType, isAllowedChange } from "../../../utils/permissions";
import Loader from "../../UI/Loader/Loader";

const HeaderMenu: React.FC = () => {
    const {isLogined} = useTypedSelector(state => state.account);
    const accountInfo = useTypedSelector(state => state.accountInfo);

    if (!isLogined) {
        return null;
    }

    if (accountInfo.loading) {
        return <Loader/>;
    }

    let usedRoutes: RouteData[] = [...privateRoutes];
    if (isAllowedChange(ModelType.MODEL_TYPE_AUX_ENTRY, accountInfo.accountType)) {
        usedRoutes = [...usedRoutes, ...auxEntryRoutes];
    }

    return (
        <div className={classes.menu_container}>
            <Navbar routes={usedRoutes} listClassName={classes.menu} itemClassName={classes.item} />
        </div>
    );
}

export default HeaderMenu;