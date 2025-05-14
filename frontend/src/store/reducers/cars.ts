import { CarsAction, CarsActionTypes, CarsState } from "../../types/cars";

const initialState: CarsState = {
    items: [],
    loading: false,
    error: null,
    ready: false,
}

export const carsReducer = (state = initialState, action: CarsAction): CarsState => {
    switch (action.type) {
        case CarsActionTypes.FETCH_CARS:
            return { loading: true, error: null, items: [], ready: false, };
        case CarsActionTypes.FETCH_CARS_SUCCESS:
            return { loading: false, error: null, items: action.payload, ready: true, };
        case CarsActionTypes.FETCH_CARS_ERROR:
            return { loading: false, error: action.payload, items: [], ready: false, };
        case CarsActionTypes.CREATE_CAR:
            return { loading: true, error: null, items: [], ready: false, };
        case CarsActionTypes.UPDATE_CAR:
            return { loading: true, error: null, items: [], ready: false, };
        case CarsActionTypes.DELETE_CAR:
            return { loading: true, error: null, items: [], ready: false, };
        case CarsActionTypes.RESET_CARS:
            return {loading: false, error: null, items: [], ready: false, };
        default:
            return state;
    }
}
