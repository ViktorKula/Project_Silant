import { Car } from "./api";

export interface CarsState {
    items: Car[];
    loading: boolean;
    error: null | string;
    ready: boolean;
}

export enum CarsActionTypes {
    FETCH_CARS = "FETCH_CARS",
    FETCH_CARS_SUCCESS = "FETCH_CARS_SUCCESS",
    FETCH_CARS_ERROR = "FETCH_CARS_ERROR",
    CREATE_CAR = "CREATE_CAR",
    UPDATE_CAR = "UPDATE_CAR",
    DELETE_CAR = "DELETE_CAR",
    RESET_CARS = "RESET_CARS",
}

interface CarsFetchAction {
    type: CarsActionTypes.FETCH_CARS;
}

interface CarsSuccessAction {
    type: CarsActionTypes.FETCH_CARS_SUCCESS;
    payload: Car[];
}

interface CarsErrorAction {
    type: CarsActionTypes.FETCH_CARS_ERROR;
    payload: any;
}

interface CarsCreateAction {
    type: CarsActionTypes.CREATE_CAR;
    payload: Car;
}

interface CarsUpdateAction {
    type: CarsActionTypes.UPDATE_CAR;
    payload: Car;
}

interface CarsDeleteAction {
    type: CarsActionTypes.DELETE_CAR;
}

interface CarsResetAction {
    type: CarsActionTypes.RESET_CARS;
}

export type CarsAction = CarsFetchAction | CarsSuccessAction | CarsErrorAction | CarsCreateAction | CarsUpdateAction | CarsDeleteAction | CarsResetAction;