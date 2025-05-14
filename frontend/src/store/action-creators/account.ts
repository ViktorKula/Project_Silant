import { Dispatch } from "redux";
import { AccountAction, AccountActionTypes } from "../../types/account";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router";
import { LoginResponseData, baseAccUrl, baseApiUrl, localStorageIdToken } from "../../types/api";
import { RootState } from "../reducers";
import { resetAccountInfo } from "./accountInfo";
import { AccountInfoAction, AccountInfoActionTypes } from "../../types/accountInfo";


export const loginUser = (username: string, password: string, navigate: NavigateFunction) => {
    return async (dispatch: Dispatch<AccountAction | AccountInfoAction>) => {
        try {
            const headers = {
              'Content-type': 'application/json',
              'Accept': 'application/json',
            }
            const data = JSON.stringify({username: username, password: password});

            dispatch({type: AccountActionTypes.LOGIN_USER})
            // const response = await axios.post('http://localhost:8000/api/v1/account/login', data, {headers: headers});
            const response = await axios.post(`${baseAccUrl}/login`, data, {headers: headers});
            dispatch({type: AccountActionTypes.LOGIN_USER_SUCCESS, payload: response.data})

            // localStorage.setItem("account_accessToken", response.data.token);
            // localStorage.setItem("account_expire", response.data.expire);
            localStorage.setItem(localStorageIdToken, response.data.token);

            // resetAccountInfo();
            dispatch({ type: AccountInfoActionTypes.RESET_ACCOUNT_INFO });

            // const navigate = useNavigate();
            // console.log("loginUser: before navigate");
            // navigate("/");
        } catch (e) {
            // console.log(e);
            dispatch({
                type: AccountActionTypes.LOGIN_USER_ERROR, 
                // payload: "Проблемы авторизации"
                payload: <string>(e)
            })
        }
    }
}

// export const loginUserByToken = (token: string, expire: string) => {
export const loginUserByToken = (token: string) => {
    return async (dispatch: Dispatch<AccountAction | AccountInfoAction>) => {
        const data: LoginResponseData = {
            // token: token,
            // expire: expire,
            token: token,
        }

        try {
            dispatch({type: AccountActionTypes.LOGIN_USER});
            dispatch({type: AccountActionTypes.LOGIN_USER_SUCCESS, payload: data});

            // await resetAccountInfo();
            dispatch({ type: AccountInfoActionTypes.RESET_ACCOUNT_INFO });
        } catch (e) {
            // console.log(e);
            dispatch({
                type: AccountActionTypes.LOGIN_USER_ERROR, 
                // payload: "Проблемы авторизации"
                payload: <string>(e)
            })
        }
    }
}

export const loginUserReset = () => {
    return async (dispatch: Dispatch<AccountAction | AccountInfoAction>, getState: () => RootState) => {
        dispatch({type: AccountActionTypes.LOGIN_USER_RESET})
        // localStorage.removeItem("account_accessToken");
        // localStorage.removeItem("account_expire");       

        const state = getState();
        // const token = state.account.token;
        const token = localStorage.getItem(localStorageIdToken);
        if (token) {
            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token,
              }

            console.log("before logout with token ", token);
  
            try {
                console.log("loginUserReset: headers = ", headers)
                const response = await axios.post(`${baseAccUrl}/logout`, null, {headers: headers});
            } catch (e) {
                console.log("loginUserReset: Error: ", e);
            }
        }

        localStorage.removeItem(localStorageIdToken);

        // await resetAccountInfo();
        dispatch({ type: AccountInfoActionTypes.RESET_ACCOUNT_INFO });

        // dispatch({type: AccountActionTypes.LOGIN_USER_RESET})
    }
}