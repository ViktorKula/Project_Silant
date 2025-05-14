export interface FilterCarState {
    car_num: string;
    car_model: number | null;
    engine_model: number | null;
    transmission_model: number | null;
    main_bridge_model: number | null;
    steerable_bridge_model: number | null;
}

export enum FilterCarActionTypes {
    SET_CAR_NUM = "SET_CAR_NUM",
    SET_CAR_MODEL = "SET_CAR_MODEL",
    SET_ENGINE_MODEL = "SET_ENGINE_MODEL",
    SET_TRANSMISSION_MODEL = "SET_TRANSMISSION_MODEL",
    SET_MAIN_BRIDGE_MODEL = "SET_MAIN_BRIDGE_MODEL",
    SET_STEERABLE_BRIDGE_MODEL = "SET_STEERABLE_BRIDGE_MODEL",
}

interface FilterCarSetCarNumAction {
    type: FilterCarActionTypes.SET_CAR_NUM;
    payload: string;
}

interface FilterCarSetCarModelAction {
    type: FilterCarActionTypes.SET_CAR_MODEL;
    payload: number | null;
}

interface FilterCarSetEngineModelAction {
    type: FilterCarActionTypes.SET_ENGINE_MODEL;
    payload: number | null;
}

interface FilterCarSetTransmissionModelAction {
    type: FilterCarActionTypes.SET_TRANSMISSION_MODEL;
    payload: number | null;
}

interface FilterCarSetMainBridgeModelAction {
    type: FilterCarActionTypes.SET_MAIN_BRIDGE_MODEL;
    payload: number | null;
}

interface FilterCarSteerableBridgeModelAction {
    type: FilterCarActionTypes.SET_STEERABLE_BRIDGE_MODEL;
    payload: number | null;
}

export type FilterCarAction = 
    FilterCarSetCarNumAction | 
    FilterCarSetCarModelAction | 
    FilterCarSetEngineModelAction | 
    FilterCarSetTransmissionModelAction | 
    FilterCarSetMainBridgeModelAction | 
    FilterCarSteerableBridgeModelAction;