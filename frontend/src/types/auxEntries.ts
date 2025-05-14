import { AuxEntry, AuxEntries, Client, ServiceCompany, AuxEntryType, baseApiUrl, defaultMaintenance, defaultReclamation, defaultCar, Car, Reclamation, Maintenance } from "./api";

export interface AuxEntriesState {
    carModels: AuxEntry[];
    engineModels: AuxEntry[];
    transmissionModels: AuxEntry[];
    mainBridgeModels: AuxEntry[];
    steerableBridgeModels: AuxEntry[];
    maintenanceTypes: AuxEntry[];
    failureNodes: AuxEntry[];
    recoveryMethods: AuxEntry[];
    clients: Client[],
    serviceCompanies: ServiceCompany[],
    loading: boolean;
    error: null | string;
    isReady: Boolean;
}

export interface ConcreteAuxEntry {
    type: AuxEntryType;
    value: AuxEntry;
}

export enum AuxEntriesActionTypes {
    FETCH_AUX_ENTRIES = "FETCFETCH_AUX_ENTRIES_CARS",
    FETCH_AUX_ENTRIES_SUCCESS = "FETCH_AUX_ENTRIES_SUCCESS",
    FETCH_AUX_ENTRIES_ERROR = "FETCH_AUX_ENTRIES_ERROR",
    CREATE_AUX_ENTRY = "CREATE_AUX_ENTRY",
    UPDATE_AUX_ENTRY = "UPDATE_AUX_ENTRY",
    DELETE_AUX_ENTRY = "DELETE_AUX_ENTRY",
    RESET_AUX_ENTRIES = "RESET_AUX_ENTRIES",
}

interface AuxEntriesFetchAction {
    type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES;
}

interface AuxEntriesSuccessAction {
    type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_SUCCESS;
    payload: AuxEntries;
}

interface AuxEntriesErrorAction {
    type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_ERROR;
    payload: any;
}

interface AuxEntriesCreateAction {
    type: AuxEntriesActionTypes.CREATE_AUX_ENTRY;
    payload: ConcreteAuxEntry;
}

interface AuxEntriesUpdateAction {
    type: AuxEntriesActionTypes.UPDATE_AUX_ENTRY;
    payload: ConcreteAuxEntry;
}

interface AuxEntriesDeleteAction {
    type: AuxEntriesActionTypes.DELETE_AUX_ENTRY;
    payload: ConcreteAuxEntry;
}

interface AuxEntriesResetAction {
    type: AuxEntriesActionTypes.RESET_AUX_ENTRIES;
}

export type AuxEntriesAction = AuxEntriesFetchAction | AuxEntriesSuccessAction | AuxEntriesErrorAction | 
    AuxEntriesCreateAction | AuxEntriesUpdateAction | AuxEntriesDeleteAction | AuxEntriesResetAction;

// export interface AuxEntryAddData {
    
// }

export const getAuxEntriesListByType = (type: AuxEntryType, state: AuxEntriesState): AuxEntry[] => {
    switch (type) {
        case AuxEntryType.AUX_ENTRY_TYPE_CAR_MODEL:
            return state.carModels;
        case AuxEntryType.AUX_ENTRY_TYPE_ENGINE_MODEL:
            return state.engineModels;
        case AuxEntryType.AUX_ENTRY_TYPE_TRANSMISSION_MODEL:
            return state.transmissionModels;
        case AuxEntryType.AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL:
            return state.mainBridgeModels;
        case AuxEntryType.AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL:
            return state.steerableBridgeModels;
        case AuxEntryType.AUX_ENTRY_TYPE_MAINTENANCE_TYPE:
            return state.maintenanceTypes;
        case AuxEntryType.AUX_ENTRY_TYPE_FAILURE_NODE:
            return state.failureNodes;
        case AuxEntryType.AUX_ENTRY_TYPE_RECOVERY_METHOD:
            return state.recoveryMethods;
        default:
            throw new Error("getAuxEntriesListByType: wrong type!")
    }
}

export const setAuxEntriesListByType = (type: AuxEntryType, state: AuxEntriesState, list: AuxEntry[]): void => {
    switch (type) {
        case AuxEntryType.AUX_ENTRY_TYPE_CAR_MODEL:
            state.carModels = list; break;
        case AuxEntryType.AUX_ENTRY_TYPE_ENGINE_MODEL:
            state.engineModels = list; break;
        case AuxEntryType.AUX_ENTRY_TYPE_TRANSMISSION_MODEL:
            state.transmissionModels = list; break;
        case AuxEntryType.AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL:
            state.mainBridgeModels = list; break;
        case AuxEntryType.AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL:
            state.steerableBridgeModels = list; break;
        case AuxEntryType.AUX_ENTRY_TYPE_MAINTENANCE_TYPE:
            state.maintenanceTypes = list; break;
        case AuxEntryType.AUX_ENTRY_TYPE_FAILURE_NODE:
            state.failureNodes = list; break;
        case AuxEntryType.AUX_ENTRY_TYPE_RECOVERY_METHOD:
            state.recoveryMethods = list; break;
        default:
            throw new Error("setAuxEntriesListByType: wrong type!")
    }
}

export const getAuxEntriesUrlList = (type: AuxEntryType): string => {
    switch (type) {
        case AuxEntryType.AUX_ENTRY_TYPE_CAR_MODEL:
            return `${baseApiUrl}/car_models/`;
        case AuxEntryType.AUX_ENTRY_TYPE_ENGINE_MODEL:
            return `${baseApiUrl}/engine_models/`;
        case AuxEntryType.AUX_ENTRY_TYPE_TRANSMISSION_MODEL:
            return `${baseApiUrl}/transmission_models/`;
        case AuxEntryType.AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL:
            return `${baseApiUrl}/main_bridge_models/`;
        case AuxEntryType.AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL:
            return `${baseApiUrl}/steerable_bridge_models/`;
        case AuxEntryType.AUX_ENTRY_TYPE_MAINTENANCE_TYPE:
            return `${baseApiUrl}/maintenance_types/`;
        case AuxEntryType.AUX_ENTRY_TYPE_FAILURE_NODE:
            return `${baseApiUrl}/failure_nodes/`;
        case AuxEntryType.AUX_ENTRY_TYPE_RECOVERY_METHOD:
            return `${baseApiUrl}/recovery_methods/`;
        default:
            throw new Error("getAuxEntriesUrlList: wrong type!")
    }
}

export const getAuxEntriesUrlSingle = (type: AuxEntryType, id: number): string => {
    switch (type) {
        case AuxEntryType.AUX_ENTRY_TYPE_CAR_MODEL:
            return `${baseApiUrl}/car_models/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_ENGINE_MODEL:
            return `${baseApiUrl}/engine_models/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_TRANSMISSION_MODEL:
            return `${baseApiUrl}/transmission_models/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL:
            return `${baseApiUrl}/main_bridge_models/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL:
            return `${baseApiUrl}/steerable_bridge_models/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_MAINTENANCE_TYPE:
            return `${baseApiUrl}/maintenance_types/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_FAILURE_NODE:
            return `${baseApiUrl}/failure_nodes/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_RECOVERY_METHOD:
            return `${baseApiUrl}/recovery_methods/${id}`;
        default:
            throw new Error("getAuxEntriesUrlSingle: wrong type!")
    }
}

export const getAuxEntriesLinkTable = (type: AuxEntryType): string => {
    switch (type) {
        case AuxEntryType.AUX_ENTRY_TYPE_CAR_MODEL:
            return `/car_models`;
        case AuxEntryType.AUX_ENTRY_TYPE_ENGINE_MODEL:
            return `/engine_models`;
        case AuxEntryType.AUX_ENTRY_TYPE_TRANSMISSION_MODEL:
            return `/transmission_models`;
        case AuxEntryType.AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL:
            return `/main_bridge_models`;
        case AuxEntryType.AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL:
            return `/steerable_bridge_models`;
        case AuxEntryType.AUX_ENTRY_TYPE_MAINTENANCE_TYPE:
            return `/maintenance_types`;
        case AuxEntryType.AUX_ENTRY_TYPE_FAILURE_NODE:
            return `/failure_nodes`;
        case AuxEntryType.AUX_ENTRY_TYPE_RECOVERY_METHOD:
            return `/recovery_methods`;
        default:
            throw new Error("getAuxEntriesLinkTable: wrong type!")
    }
}

export const getAuxEntriesLinkSingle = (type: AuxEntryType, id: number): string => {
    switch (type) {
        case AuxEntryType.AUX_ENTRY_TYPE_CAR_MODEL:
            return `/car_models/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_ENGINE_MODEL:
            return `/engine_models/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_TRANSMISSION_MODEL:
            return `/transmission_models/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL:
            return `/main_bridge_models/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL:
            return `/steerable_bridge_models/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_MAINTENANCE_TYPE:
            return `/maintenance_types/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_FAILURE_NODE:
            return `/failure_nodes/${id}`;
        case AuxEntryType.AUX_ENTRY_TYPE_RECOVERY_METHOD:
            return `/recovery_methods/${id}`;
        default:
            throw new Error("getAuxEntriesLinkSingle: wrong type!")
    }
}


export const getAuxEntriesCaption = (type: AuxEntryType): string => {
    switch (type) {
        case AuxEntryType.AUX_ENTRY_TYPE_CAR_MODEL:
            return "Модель машины";
        case AuxEntryType.AUX_ENTRY_TYPE_ENGINE_MODEL:
            return "Модель двигателя";
        case AuxEntryType.AUX_ENTRY_TYPE_TRANSMISSION_MODEL:
            return "Модель трансмиссии";
        case AuxEntryType.AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL:
            return "Модель главного моста";
        case AuxEntryType.AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL:
            return "Модель управляемого моста";
        case AuxEntryType.AUX_ENTRY_TYPE_MAINTENANCE_TYPE:
            return "Тип ТО";
        case AuxEntryType.AUX_ENTRY_TYPE_FAILURE_NODE:
            return "Узел отказа";
        case AuxEntryType.AUX_ENTRY_TYPE_RECOVERY_METHOD:
            return "Способ ремонта";
        default:
            throw new Error("getAuxEntriesCaption: wrong type!")
    }
}