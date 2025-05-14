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

            const response = await axios.post(`${baseAccUrl}/login`, data, {headers: headers});
            dispatch({type: AccountActionTypes.LOGIN_USER_SUCCESS, payload: response.data})

            localStorage.setItem(localStorageIdToken, response.data.token);

            dispatch({ type: AccountInfoActionTypes.RESET_ACCOUNT_INFO });

        } catch (e) {
            dispatch({
                type: AccountActionTypes.LOGIN_USER_ERROR,
                payload: <string>(e)
            })
        }
    }
}

export const loginUserByToken = (token: string) => {
    return async (dispatch: Dispatch<AccountAction | AccountInfoAction>) => {
        const data: LoginResponseData = {
            token: token,
        }

        try {
            dispatch({type: AccountActionTypes.LOGIN_USER});
            dispatch({type: AccountActionTypes.LOGIN_USER_SUCCESS, payload: data});
            dispatch({type: AccountInfoActionTypes.RESET_ACCOUNT_INFO });
        } catch (e) {
            dispatch({
                type: AccountActionTypes.LOGIN_USER_ERROR,
                payload: <string>(e)
            })
        }
    }
}

export const loginUserReset = () => {
    return async (dispatch: Dispatch<AccountAction | AccountInfoAction>, getState: () => RootState) => {
        dispatch({type: AccountActionTypes.LOGIN_USER_RESET})

        const state = getState();

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

        dispatch({ type: AccountInfoActionTypes.RESET_ACCOUNT_INFO });
    }
}
