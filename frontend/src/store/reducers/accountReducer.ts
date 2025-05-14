// import { Dispatch } from "redux";
// import { UserAction, UserActionTypes, UserState } from "../../types/user";

import { AccountAction, AccountActionTypes, AccountState } from "../../types/account";


const initialState: AccountState = {
    isLogined: false,
    token: "",
    // expire: null,
    // loading: false,
    loading: true,
    error: null,
}

export const accountReducer = (state = initialState, action: AccountAction): AccountState => {
    switch (action.type) {
        case AccountActionTypes.LOGIN_USER:
            return { loading: true, error: null, isLogined: false, token: "" };
        case AccountActionTypes.LOGIN_USER_SUCCESS:
            console.log("LOGIN_USER_SUCCESS: token = ", action.payload.token)
            console.log("LOGIN_USER_SUCCESS: action.payload = ", action.payload)
            return { loading: false, error: null, isLogined: true, token: action.payload.token };
        case AccountActionTypes.LOGIN_USER_ERROR:
            // console.log(action.payload);
            return { loading: false, error: action.payload, isLogined: false, token: "" };
        case AccountActionTypes.LOGIN_USER_RESET:
            return { loading: false, error: null, isLogined: false, token: "" };
        default:
            return state;
    }
}
