import { SimpleCar } from "./api";

export interface SimpleCarsState {
    items: SimpleCar[];
    loading: boolean;
    error: null | string;
}

export enum SimpleCarsActionTypes {
    FETCH_SIMPLE_CARS = "FETCH_SIMPLE_CARS",
    FETCH_SIMPLE_CARS_SUCCESS = "FETCH_SIMPLE_CARS_SUCCESS",
    FETCH_SIMPLE_CARS_ERROR = "FETCH_SIMPLE_CARS_ERROR",
    RESET_SIMPLE_CARS = "RESET_SIMPLE_CARS",
}

interface SimpleCarsFetchAction {
    type: SimpleCarsActionTypes.FETCH_SIMPLE_CARS;
}

interface SimpleCarsSuccessAction {
    type: SimpleCarsActionTypes.FETCH_SIMPLE_CARS_SUCCESS;
    payload: SimpleCar[];
}

interface SimpleCarsErrorAction {
    type: SimpleCarsActionTypes.FETCH_SIMPLE_CARS_ERROR;
    payload: any;
}

interface SimpleCarsResetAction {
    type: SimpleCarsActionTypes.RESET_SIMPLE_CARS;
}

export type SimpleCarsAction = SimpleCarsFetchAction | SimpleCarsSuccessAction | SimpleCarsErrorAction | SimpleCarsResetAction;