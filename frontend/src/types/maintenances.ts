import { Maintenance } from "./api";

export interface MaintenancesState {
    items: Maintenance[];
    loading: boolean;
    error: null | string;
    ready: boolean;
}

export enum MaintenancesActionTypes {
    FETCH_MAINTENANCES = "FETCH_MAINTENANCES",
    FETCH_MAINTENANCES_SUCCESS = "FETCH_MAINTENANCES_SUCCESS",
    FETCH_MAINTENANCES_ERROR = "FETCH_MAINTENANCES_ERROR",
    CREATE_MAINTENANCE = "CREATE_MAINTENANCE",
    UPDATE_MAINTENANCE = "UPDATE_MAINTENANCE",
    DELETE_MAINTENANCE = "DELETE_MAINTENANCE",
    RESET_MAINTENANCES = "RESET_MAINTENANCES",
}

interface MaintenancesFetchAction {
    type: MaintenancesActionTypes.FETCH_MAINTENANCES;
}

interface MaintenancesSuccessAction {
    type: MaintenancesActionTypes.FETCH_MAINTENANCES_SUCCESS;
    payload: Maintenance[];
}

interface MaintenancesErrorAction {
    type: MaintenancesActionTypes.FETCH_MAINTENANCES_ERROR;
    payload: any;
}

interface MaintenancesCreateAction {
    type: MaintenancesActionTypes.CREATE_MAINTENANCE;
    payload: Maintenance;
}

interface MaintenancesUpdateAction {
    type: MaintenancesActionTypes.UPDATE_MAINTENANCE;
    payload: Maintenance;
}

interface MaintenancesDeleteAction {
    type: MaintenancesActionTypes.DELETE_MAINTENANCE;
}


interface MaintenancesResetAction {
    type: MaintenancesActionTypes.RESET_MAINTENANCES;
}

export type MaintenancesAction = MaintenancesFetchAction | MaintenancesSuccessAction | MaintenancesErrorAction | 
    MaintenancesCreateAction | MaintenancesUpdateAction | MaintenancesDeleteAction | MaintenancesResetAction;