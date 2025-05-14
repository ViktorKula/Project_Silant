import React, { useState } from "react";

import classes from "./UserPanelAnonymous.module.scss";
import MyModal from "../../../UI/MyModal/MyModal";
import LoginWindow from "./LoginWindow/LoginWindow";


const UserPanelAnonymous: React.FC = () => {
    const [loginWindowVisible, setLoginWindowVisible] = useState(false);

    return (
        <div className={classes.user_panel_anonymous}>
            <div>
                <p className={classes.authorize_link} onClick={() => setLoginWindowVisible(true)}>Авторизация</p>
            </div>
            <MyModal visible={loginWindowVisible} setVisible={setLoginWindowVisible} contentClassName={classes.menu_background}>
                <LoginWindow setVisible={setLoginWindowVisible} />
            </MyModal> 
        </div>
    );
}

export default UserPanelAnonymous;