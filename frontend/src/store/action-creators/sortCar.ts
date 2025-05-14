import { Dispatch } from "redux"
import { SortCarAction, SortCarActionTypes } from "../../types/sortCar"
import { SortMethod } from "../../utils/sort";


export const sortCarChangeSortType = (propName: string, sortMethod: SortMethod) => {
    return async (dispatch: Dispatch<SortCarAction>) => {
        dispatch({type: SortCarActionTypes.SORT_CAR_CHANGE_SORT_TYPE, payload: {propName: propName, sortMethod: sortMethod}});
    }
}

export const sortCarReset = () => {
    return async (dispatch: Dispatch<SortCarAction>) => {
        dispatch({type: SortCarActionTypes.SORT_CAR_RESET});
    }
}