import { Dispatch } from "redux";
import axios from "axios";
// import { AccountInfoAction, AccountInfoActionTypes } from "../../types/accountInfo";
import { checkAuth } from "../../utils/auth";
import { baseAccUrl } from "../../types/api";
import { AccountInfoAction, AccountInfoActionTypes } from "../../types/accountInfo";
import { RootState } from "../reducers";
import { loginUserReset } from "./account";
// import { Action, BalanceActionTypes } from "../../types/balance";

export const fetchAccountInfo = () => {
    return async (dispatch: Dispatch<AccountInfoAction>, getState: () => RootState) => {
        try {
            // console.log("fetchAccountInfo: start");
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;

            const headers = {
              'Content-type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Token ' + token
            }

            dispatch({type: AccountInfoActionTypes.FETCH_ACCOUNT_INFO})
            // const response = await axios.get('https://gateway.scan-interfax.ru/api/v1/account/info', {headers: headers});
            const response = await axios.get(`${baseAccUrl}/account_info`, {headers: headers});
            
            dispatch({type: AccountInfoActionTypes.FETCH_ACCOUNT_INFO_SUCCESS, payload: response.data})
            // console.log("fetchAccountInfo: success!")
        } catch (e) {
            loginUserReset();
            dispatch({
                type: AccountInfoActionTypes.FETCH_ACCOUNT_INFO_ERROR, 
                payload: <string>(e)
            })
        }
    }
}

export const resetAccountInfo = () => {
    return async (dispatch: Dispatch<AccountInfoAction>, getState: () => RootState) => {
        console.log("resetAccountInfo: start")
        try {
            dispatch({type: AccountInfoActionTypes.RESET_ACCOUNT_INFO, })
        } catch (e) {
            loginUserReset();
            dispatch({
                type: AccountInfoActionTypes.FETCH_ACCOUNT_INFO_ERROR, 
                payload: <string>(e)
            })
        }
    }
}