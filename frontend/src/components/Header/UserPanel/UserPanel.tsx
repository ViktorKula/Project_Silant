import React, { useState } from "react";

import classes from "./UserPanel.module.scss";
import commonClasses from "../../../styles/common.module.scss";
import MyModal from "../../UI/MyModal/MyModal";
import LoginWindow from "./UserPanelAnonymous/LoginWindow/LoginWindow";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import UserPanelAnonymous from "./UserPanelAnonymous/UserPanelAnonymous";
import UserPanelLogined from "./UserPanelLogined/UserPanelLogined";



const UserPanel: React.FC = () => {
    const [loginWindowVisible, setLoginWindowVisible] = useState(false);

    const account = useTypedSelector(state => state.account);
    const accountInfo = useTypedSelector(state => state.accountInfo);

    if (account.isLogined) {
        return (
            <UserPanelLogined />
        );
    } else {
        return (
            <UserPanelAnonymous />
        );
    }
}

export default UserPanel;