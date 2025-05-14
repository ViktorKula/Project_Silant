import { FilterReclamationAction, FilterReclamationActionTypes, FilterReclamationState } from "../../types/filterReclamation";

const initialState: FilterReclamationState = {
    car_num: "",
    service_company__name: "",
    failure_node: null,
    recovery_method: null,
}

export const filterReclamationReducer = (state = initialState, action: FilterReclamationAction): FilterReclamationState => {
    switch (action.type) {
        case FilterReclamationActionTypes.SET_CAR_NUM:
            return {...state, car_num: action.payload};
        case FilterReclamationActionTypes.SET_SERVICE_COMPANY_NAME:
            return {...state, service_company__name: action.payload};
        case FilterReclamationActionTypes.SET_FAILURE_NODE:
            return {...state, failure_node: action.payload};
        case FilterReclamationActionTypes.SET_RECOVERY_METHOD:
            return {...state, recovery_method: action.payload};
        default:
            return state;
    }
}