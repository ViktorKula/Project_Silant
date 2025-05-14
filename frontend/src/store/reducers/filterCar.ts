import { FilterCarAction, FilterCarActionTypes, FilterCarState } from "../../types/filterCar";

const initialState: FilterCarState = {
    car_num: "",
    car_model: null,
    engine_model: null,
    transmission_model: null,
    main_bridge_model: null,
    steerable_bridge_model: null,
}

export const filterCarReducer = (state = initialState, action: FilterCarAction): FilterCarState => {
    switch (action.type) {
        case FilterCarActionTypes.SET_CAR_NUM:
            return {...state, car_num: action.payload};
        case FilterCarActionTypes.SET_CAR_MODEL:
            return {...state, car_model: action.payload};
        case FilterCarActionTypes.SET_ENGINE_MODEL:
            return {...state, engine_model: action.payload};
        case FilterCarActionTypes.SET_TRANSMISSION_MODEL:
            return {...state, transmission_model: action.payload};
        case FilterCarActionTypes.SET_MAIN_BRIDGE_MODEL:
            return {...state, main_bridge_model: action.payload};
        case FilterCarActionTypes.SET_STEERABLE_BRIDGE_MODEL:
            return {...state, steerable_bridge_model: action.payload};
        default:
            return state;
    }
}