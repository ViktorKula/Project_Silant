import { FilterMaintenanceAction, FilterMaintenanceActionTypes, FilterMaintenanceState } from "../../types/filterMaintenance";

const initialState: FilterMaintenanceState = {
    car_num: "",
    service_company__name: "",
    type: null,
}

export const filterMaintenanceReducer = (state = initialState, action: FilterMaintenanceAction): FilterMaintenanceState => {
    switch (action.type) {
        case FilterMaintenanceActionTypes.SET_CAR_NUM:
            return {...state, car_num: action.payload};
        case FilterMaintenanceActionTypes.SET_SERVICE_COMPANY_NAME:
            return {...state, service_company__name: action.payload};
        case FilterMaintenanceActionTypes.SET_TYPE:
            return {...state, type: action.payload};
        default:
            return state;
    }
}