import { LoginResponseData } from "./api";

export interface AccountState {
    isLogined: boolean;
    token: string;
    // expire: null | string;
    loading: boolean;
    error: null | string;
}

export enum AccountActionTypes {
    LOGIN_USER = "LOGIN_USER",
    LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
    LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
    LOGIN_USER_LOAD = "LOGIN_USER_LOAD",
    LOGIN_USER_LOAD_SUCCESS = "LOGIN_USER_LOAD_SUCCESS",
    LOGIN_USER_LOAD_ERROR = "LOGIN_USER_LOAD_ERROR",
    LOGIN_USER_RESET = "LOGIN_USER_RESET",
}

interface LoginUserAction {
    type: AccountActionTypes.LOGIN_USER;
}

interface LoginUserSuccessAction {
    type: AccountActionTypes.LOGIN_USER_SUCCESS;
    payload: LoginResponseData;
}

interface LoginUserErrorAction {
    type: AccountActionTypes.LOGIN_USER_ERROR;
    payload: string;
}

interface LoginUserResetAction {
    type: AccountActionTypes.LOGIN_USER_RESET;
}

export type AccountAction = LoginUserAction | LoginUserSuccessAction | LoginUserErrorAction | LoginUserResetAction;