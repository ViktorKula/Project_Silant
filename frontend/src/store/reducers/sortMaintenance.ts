import { SortMaintenanceAction, SortMaintenanceActionTypes, SortMaintenanceState } from "../../types/sortMaintenance";

const initialState: SortMaintenanceState = {
    sortElems: [],
}

export const sortMaintenanceReducer = (state = initialState, action: SortMaintenanceAction): SortMaintenanceState => {
    switch (action.type) {
        case SortMaintenanceActionTypes.SORT_MAINTENANCE_CHANGE_SORT_TYPE:
            let newElems = state.sortElems.filter((elem) => elem.propName !== action.payload.propName);
            return {...state, sortElems: [...newElems, action.payload]};
        case SortMaintenanceActionTypes.SORT_MAINTENANCE_RESET:
            return {sortElems: []};

        default:
            return state;
    }
}