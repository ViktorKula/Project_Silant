import { AccountInfoAction, AccountInfoActionTypes, AccountInfoState } from "../../types/accountInfo";
import { AccountType } from "../../types/api";

const initialState: AccountInfoState = {
    accountType: AccountType.ACCOUNT_TYPE_OTHER,
    name: null,
    username: null,
    loading: false,
    error: null,
    ready: false,
}

export const accountInfoReducer = (state = initialState, action: AccountInfoAction): AccountInfoState => {
    switch (action.type) {
        case AccountInfoActionTypes.FETCH_ACCOUNT_INFO:
            return { loading: true, error: null, accountType: AccountType.ACCOUNT_TYPE_OTHER, name: null, username: null, ready: false, };
        case AccountInfoActionTypes.FETCH_ACCOUNT_INFO_SUCCESS:
            return { loading: false, error: null, accountType: action.payload.account_type, name: action.payload.name, username: action.payload.username, ready: true,  };
        case AccountInfoActionTypes.FETCH_ACCOUNT_INFO_ERROR:
            // console.log(action.payload);
            return { loading: false, error: action.payload, accountType: AccountType.ACCOUNT_TYPE_OTHER, name: null, username: null, ready: false,  };
        case AccountInfoActionTypes.RESET_ACCOUNT_INFO:
            // console.log(action.payload);
            return { loading: false, error: null, accountType: AccountType.ACCOUNT_TYPE_OTHER, name: null, username: null, ready: false,  };
        default:
            return state;
    }
}
