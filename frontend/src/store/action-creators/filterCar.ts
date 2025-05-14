import { Dispatch } from "redux"
import { FilterCarAction, FilterCarActionTypes } from "../../types/filterCar"


export const setCarNum = (value: string) => {
    return async (dispatch: Dispatch<FilterCarAction>) => {
        dispatch({type: FilterCarActionTypes.SET_CAR_NUM, payload: value});
    }
}

export const setCarModel = (value: number | null) => {
    return async (dispatch: Dispatch<FilterCarAction>) => {
        dispatch({type: FilterCarActionTypes.SET_CAR_MODEL, payload: value});
    }
}

export const setEngineModel = (value: number | null) => {
    return async (dispatch: Dispatch<FilterCarAction>) => {
        dispatch({type: FilterCarActionTypes.SET_ENGINE_MODEL, payload: value});
    }
}

export const setTransmissionModel = (value: number | null) => {
    return async (dispatch: Dispatch<FilterCarAction>) => {
        dispatch({type: FilterCarActionTypes.SET_TRANSMISSION_MODEL, payload: value});
    }
}

export const setMainBridgeModel = (value: number | null) => {
    return async (dispatch: Dispatch<FilterCarAction>) => {
        dispatch({type: FilterCarActionTypes.SET_MAIN_BRIDGE_MODEL, payload: value});
    }
}

export const setSteerableBridgeModel = (value: number | null) => {
    return async (dispatch: Dispatch<FilterCarAction>) => {
        dispatch({type: FilterCarActionTypes.SET_STEERABLE_BRIDGE_MODEL, payload: value});
    }
}