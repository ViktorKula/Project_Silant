import { AccountInfoResponseData, AccountType } from "./api";

export interface AccountInfoState {
    accountType: AccountType;
    name: null | string;
    username: null | string;
    loading: boolean;
    error: null | string;
    ready: boolean;
}

export enum AccountInfoActionTypes {
    FETCH_ACCOUNT_INFO = "FETCH_ACCOUNT_INFO",
    FETCH_ACCOUNT_INFO_SUCCESS = "FETCH_ACCOUNT_INFO_SUCCESS",
    FETCH_ACCOUNT_INFO_ERROR = "FETCH_ACCOUNT_INFO_ERROR",
    RESET_ACCOUNT_INFO = "RESET_ACCOUNT_INFO",
}

interface AccountInfoFetchAction {
    type: AccountInfoActionTypes.FETCH_ACCOUNT_INFO;
}

interface AccountInfoSuccessAction {
    type: AccountInfoActionTypes.FETCH_ACCOUNT_INFO_SUCCESS;
    payload: AccountInfoResponseData;
}

interface AccountInfoErrorAction {
    type: AccountInfoActionTypes.FETCH_ACCOUNT_INFO_ERROR;
    payload: string;
}

interface AccountInfoResetAction {
    type: AccountInfoActionTypes.RESET_ACCOUNT_INFO;
}


export type AccountInfoAction = AccountInfoFetchAction | AccountInfoSuccessAction | AccountInfoErrorAction | AccountInfoResetAction;

export const getAccountTypeCaption = (accountType: AccountType): string => {
    switch (accountType) {
        case AccountType.ACCOUNT_TYPE_ADMIN:
            return "Администратор"; 
        case AccountType.ACCOUNT_TYPE_CLIENT:
            return "Клиент"; 
        case AccountType.ACCOUNT_TYPE_MANAGER:
            return "Менеджер"; 
        case AccountType.ACCOUNT_TYPE_SERVICE_COMPANY:
            return "Сервисная компания"; 
        default:
            return "";
            // throw new Error("getAccountTypeCaption: wrong accountType!")
    }
}