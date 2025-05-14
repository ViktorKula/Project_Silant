import { MaintenancesAction, MaintenancesActionTypes, MaintenancesState } from "../../types/maintenances";

const initialState: MaintenancesState = {
    items: [],
    loading: false,
    error: null,
    ready: false,
}

export const maintenancesReducer = (state = initialState, action: MaintenancesAction): MaintenancesState => {
    switch (action.type) {
        case MaintenancesActionTypes.FETCH_MAINTENANCES:
            return { loading: true, error: null, items: [], ready: false,  };
        case MaintenancesActionTypes.FETCH_MAINTENANCES_SUCCESS:
            return { loading: false, error: null, items: action.payload, ready: true,  };
        case MaintenancesActionTypes.FETCH_MAINTENANCES_ERROR:
            return { loading: false, error: action.payload, items: [], ready: false,  };
        case MaintenancesActionTypes.CREATE_MAINTENANCE:
            return { loading: true, error: null, items: [], ready: false, };
        case MaintenancesActionTypes.UPDATE_MAINTENANCE:
            return { loading: true, error: null, items: [], ready: false, };
        case MaintenancesActionTypes.DELETE_MAINTENANCE:
            return { loading: true, error: null, items: [], ready: false, };
        case MaintenancesActionTypes.RESET_MAINTENANCES:
            return {loading: false, error: null, items: [], ready: false, };            
        default:
            return state;
    }
}