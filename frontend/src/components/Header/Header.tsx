import React, { useState } from "react";
import { Link } from 'react-router-dom';

import classes from "./Header.module.scss";

import imgLogo from "../../img/Header/logo.module.png";
import UserPanel from "./UserPanel/UserPanel";

const Header: React.FC = () => {

    return (
        <div className={classes.header_container}>
            <div className={classes.header}>
                <div className={classes.upper}>
                    <div className={classes.logo_div}>
                        <Link to="/">
                            <img src={imgLogo} alt="Site logo"/>
                        </Link>
                    </div>
                    <div className={classes.header_title}>
                        <h1>+7-8352-20-12-09, telegram</h1>
                        </div>
                    <UserPanel />
                </div>
                <div className={classes.header_sub_title}>
                    <h2>Электронная сервисная книжка "МойСилант"</h2>
                </div>
            </div>
        </div>
    );
}

export default Header;
