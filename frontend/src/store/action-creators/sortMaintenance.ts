import { Dispatch } from "redux"
import { SortMaintenanceAction, SortMaintenanceActionTypes } from "../../types/sortMaintenance"
import { SortMethod } from "../../utils/sort";


export const sortMaintenanceChangeSortType = (propName: string, sortMethod: SortMethod) => {
    return async (dispatch: Dispatch<SortMaintenanceAction>) => {
        dispatch({type: SortMaintenanceActionTypes.SORT_MAINTENANCE_CHANGE_SORT_TYPE, payload: {propName: propName, sortMethod: sortMethod}});
    }
}

export const sortMaintenanceReset = () => {
    return async (dispatch: Dispatch<SortMaintenanceAction>) => {
        dispatch({type: SortMaintenanceActionTypes.SORT_MAINTENANCE_RESET});
    }
}