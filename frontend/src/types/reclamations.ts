import { Reclamation } from "./api";

export interface ReclamationsState {
    items: Reclamation[];
    loading: boolean;
    error: null | string;
    ready: boolean;
}

export enum ReclamationsActionTypes {
    FETCH_RECLAMATIONS = "FETCH_RECLAMATIONS",
    FETCH_RECLAMATIONS_SUCCESS = "FETCH_RECLAMATIONS_SUCCESS",
    FETCH_RECLAMATIONS_ERROR = "FETCH_RECLAMATIONS_ERROR",
    CREATE_RECLAMATION = "CREATE_RECLAMATION",
    UPDATE_RECLAMATION = "UPDATE_RECLAMATION",
    DELETE_RECLAMATION = "DELETE_RECLAMATION",
    RESET_RECLAMATIONS = "RESET_RECLAMATIONS",
}

interface ReclamationsFetchAction {
    type: ReclamationsActionTypes.FETCH_RECLAMATIONS;
}

interface ReclamationsSuccessAction {
    type: ReclamationsActionTypes.FETCH_RECLAMATIONS_SUCCESS;
    payload: Reclamation[];
}

interface ReclamationsErrorAction {
    type: ReclamationsActionTypes.FETCH_RECLAMATIONS_ERROR;
    payload: any;
}

interface MaintenancesCreateAction {
    type: ReclamationsActionTypes.CREATE_RECLAMATION;
    payload: Reclamation;
}

interface MaintenancesUpdateAction {
    type: ReclamationsActionTypes.UPDATE_RECLAMATION;
    payload: Reclamation;
}

interface MaintenancesDeleteAction {
    type: ReclamationsActionTypes.DELETE_RECLAMATION;
}

interface ReclamationsResetAction {
    type: ReclamationsActionTypes.RESET_RECLAMATIONS;
}

export type ReclamationsAction = ReclamationsFetchAction | ReclamationsSuccessAction | ReclamationsErrorAction | MaintenancesCreateAction | 
    MaintenancesUpdateAction | MaintenancesDeleteAction | ReclamationsResetAction;