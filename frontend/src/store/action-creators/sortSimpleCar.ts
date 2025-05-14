import { Dispatch } from "redux"
import { SortSimpleCarAction, SortSimpleCarActionTypes } from "../../types/sortSimpleCar"
import { SortMethod } from "../../utils/sort";


export const sortSimpleCarChangeSortType = (propName: string, sortMethod: SortMethod) => {
    return async (dispatch: Dispatch<SortSimpleCarAction>) => {
        dispatch({type: SortSimpleCarActionTypes.SORT_SIMPLE_CAR_CHANGE_SORT_TYPE, payload: {propName: propName, sortMethod: sortMethod}});
    }
}

export const sortSimpleCarReset = () => {
    return async (dispatch: Dispatch<SortSimpleCarAction>) => {
        dispatch({type: SortSimpleCarActionTypes.SORT_SIMPLE_CAR_RESET});
    }
}