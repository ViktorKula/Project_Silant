import React, { SetStateAction, SyntheticEvent, useState } from "react";

import classes from "./LoginWindow.module.scss";

import menuLogoMobile from "../../../img/logo-menu-mobile.module.png";
import { privateRoutes, publicRoutes } from "../../../../../router";
import Navbar, { BeforeNavigateHandler } from "../../../../UI/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { useActions } from "../../../../../hooks/useActions";
import MyLabeledInput from "../../../../UI/MyLabeledInput/MyLabeledInput";
import MyButton from "../../../../UI/MyButton/MyButton";
import Loader from "../../../../UI/Loader/Loader";
// import { logout } from "../../../utils/auth";

interface LoginWindowData {
    setVisible: (value: boolean) => void;
}

const LoginWindow: React.FC<LoginWindowData> = ({setVisible}) => {
    // const isLogined = true;
    const {isLogined, token, loading, error} = useTypedSelector(state => state.account);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const isPrimaryCorrectData = (username: string, password: string) => {
        return (username.length > 0) && (password.length > 0);
    }

    const {loginUser, loginUserReset} = useActions();

    const submit = () => {
        loginUser(username, password, navigate);
        if (isLogined) {
            setVisible(false);
        }
    }

    let isUsernameError = false;
    let isPasswordError = false;
    if (error) {
        isUsernameError = true;
        isPasswordError = true;
    }
    
    const changeErrorState = (value: boolean) => {
        if (!value) {
            loginUserReset();
        }
    }

    const isSubmitEnabled = isPrimaryCorrectData(username, password) && !loading && !(error);
    
    const usernameChangeHandler = (value: string) => {
        setUsername(value);
    }
    const passwordChangeHandler = (value: string) => {
        setPassword(value);
    }

    return (
        <div className={classes.window}>
            <button className={classes.menu_close_btn} onClick={() => setVisible(false)}/>
            <MyLabeledInput 
                id="login-form__username"
                type="text"
                labelCaption="Логин:" 
                // labelType={LabelType.LIGHT}
                // errorCaption="Введите корректные данные" 
                value={username}
                setValue={(value) => usernameChangeHandler(value)} 
                isError={isUsernameError}
                setIsError={(value) => changeErrorState(value)}
                addContainerClassNames={[classes.username_input]}
            />
            <MyLabeledInput 
                id="login-form__password"
                type="password"
                labelCaption="Пароль:" 
                // labelType={LabelType.LIGHT}
                // errorCaption="Неправильный пароль" 
                value={password}
                setValue={(value) => passwordChangeHandler(value)} 
                isError={isPasswordError}
                setIsError={(value) => changeErrorState(value)}
                addContainerClassNames={[classes.password_input]}
            />
            <MyButton 
                // sizeType={ButtonSizeType.LARGE}
                // colorScheme={ButtonColorScheme.BLUE_WHITE}
                addClassNames={[classes.submit_btn]}
                // disabled={!isSubmitEnabled || loading}
                disabled={loading}
                onClick={() => submit()}
            >
                Войти{loading && <span style={{position: "absolute"}}><Loader/></span>}
            </MyButton>
        </div>
    );
}

export default LoginWindow;