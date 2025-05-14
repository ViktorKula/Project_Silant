import { Dispatch } from "redux"
import { FilterReclamationAction, FilterReclamationActionTypes } from "../../types/filterReclamation"


export const setRCarNum = (value: string) => {
    return async (dispatch: Dispatch<FilterReclamationAction>) => {
        dispatch({type: FilterReclamationActionTypes.SET_CAR_NUM, payload: value});
    }
}

export const setRServiceCompanyName = (value: string) => {
    return async (dispatch: Dispatch<FilterReclamationAction>) => {
        dispatch({type: FilterReclamationActionTypes.SET_SERVICE_COMPANY_NAME, payload: value});
    }
}

export const setRFailureNode = (value: number | null) => {
    return async (dispatch: Dispatch<FilterReclamationAction>) => {
        dispatch({type: FilterReclamationActionTypes.SET_FAILURE_NODE, payload: value});
    }
}

export const setRRecoveryMethod = (value: number | null) => {
    return async (dispatch: Dispatch<FilterReclamationAction>) => {
        dispatch({type: FilterReclamationActionTypes.SET_RECOVERY_METHOD, payload: value});
    }
}