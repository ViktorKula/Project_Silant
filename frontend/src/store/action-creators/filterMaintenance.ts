import { Dispatch } from "redux"
import { FilterMaintenanceAction, FilterMaintenanceActionTypes } from "../../types/filterMaintenance"


export const setMCarNum = (value: string) => {
    return async (dispatch: Dispatch<FilterMaintenanceAction>) => {
        dispatch({type: FilterMaintenanceActionTypes.SET_CAR_NUM, payload: value});
    }
}

export const setMServiceCompanyName = (value: string) => {
    return async (dispatch: Dispatch<FilterMaintenanceAction>) => {
        dispatch({type: FilterMaintenanceActionTypes.SET_SERVICE_COMPANY_NAME, payload: value});
    }
}

export const setMType = (value: number | null) => {
    return async (dispatch: Dispatch<FilterMaintenanceAction>) => {
        dispatch({type: FilterMaintenanceActionTypes.SET_TYPE, payload: value});
    }
}