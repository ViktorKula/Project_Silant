import { Dispatch } from "redux"
import { SortReclamationAction, SortReclamationActionTypes } from "../../types/sortReclamation"
import { SortMethod } from "../../utils/sort";


export const sortReclamationChangeSortType = (propName: string, sortMethod: SortMethod) => {
    return async (dispatch: Dispatch<SortReclamationAction>) => {
        dispatch({type: SortReclamationActionTypes.SORT_RECLAMATION_CHANGE_SORT_TYPE, payload: {propName: propName, sortMethod: sortMethod}});
    }
}

export const sortReclamationReset = () => {
    return async (dispatch: Dispatch<SortReclamationAction>) => {
        dispatch({type: SortReclamationActionTypes.SORT_RECLAMATION_RESET});
    }
}