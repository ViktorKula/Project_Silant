import { AuxEntryType } from "../../types/api";
import { AuxEntriesAction, AuxEntriesActionTypes, AuxEntriesState, ConcreteAuxEntry } from "../../types/auxEntries";

const initialState: AuxEntriesState = {
    carModels: [],
    engineModels: [],
    transmissionModels: [],
    mainBridgeModels: [],
    steerableBridgeModels: [],
    maintenanceTypes: [],
    failureNodes: [],
    recoveryMethods: [],
    clients: [], 
    serviceCompanies: [],
    loading: false,
    error: null,
    isReady: false,
}

const addAuxEntryState = (state: AuxEntriesState, newAuxEntry: ConcreteAuxEntry): AuxEntriesState => {
    let res = state;

    switch (newAuxEntry.type) {
        case AuxEntryType.AUX_ENTRY_TYPE_CAR_MODEL:
            res.carModels.push(newAuxEntry.value); break;
        case AuxEntryType.AUX_ENTRY_TYPE_ENGINE_MODEL:
            res.engineModels.push(newAuxEntry.value); break;
        case AuxEntryType.AUX_ENTRY_TYPE_TRANSMISSION_MODEL:
            res.transmissionModels.push(newAuxEntry.value); break;
        case AuxEntryType.AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL:
            res.mainBridgeModels.push(newAuxEntry.value); break;
        case AuxEntryType.AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL:
            res.steerableBridgeModels.push(newAuxEntry.value); break;
        case AuxEntryType.AUX_ENTRY_TYPE_MAINTENANCE_TYPE:
            res.maintenanceTypes.push(newAuxEntry.value); break;
        case AuxEntryType.AUX_ENTRY_TYPE_FAILURE_NODE:
            res.failureNodes.push(newAuxEntry.value); break;
        case AuxEntryType.AUX_ENTRY_TYPE_RECOVERY_METHOD:
            res.recoveryMethods.push(newAuxEntry.value); break;
    }

    return res;
}

const deleteAuxEntryState = (state: AuxEntriesState, deletedAuxEntry: ConcreteAuxEntry): AuxEntriesState => {
    let res = state;

    switch (deletedAuxEntry.type) {
        case AuxEntryType.AUX_ENTRY_TYPE_CAR_MODEL:
            res.carModels.filter(item => item.id = deletedAuxEntry.value.id); break;
        case AuxEntryType.AUX_ENTRY_TYPE_ENGINE_MODEL:
            res.engineModels.filter(item => item.id = deletedAuxEntry.value.id); break;
        case AuxEntryType.AUX_ENTRY_TYPE_TRANSMISSION_MODEL:
            res.transmissionModels.filter(item => item.id = deletedAuxEntry.value.id); break;
        case AuxEntryType.AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL:
            res.mainBridgeModels.filter(item => item.id = deletedAuxEntry.value.id); break;
        case AuxEntryType.AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL:
            res.steerableBridgeModels.filter(item => item.id = deletedAuxEntry.value.id); break;
        case AuxEntryType.AUX_ENTRY_TYPE_MAINTENANCE_TYPE:
            res.maintenanceTypes.filter(item => item.id = deletedAuxEntry.value.id); break;
        case AuxEntryType.AUX_ENTRY_TYPE_FAILURE_NODE:
            res.failureNodes.filter(item => item.id = deletedAuxEntry.value.id); break;
        case AuxEntryType.AUX_ENTRY_TYPE_RECOVERY_METHOD:
            res.recoveryMethods.filter(item => item.id = deletedAuxEntry.value.id); break;
    }

    return res;
}

export const AuxEntriesReducer = (state = initialState, action: AuxEntriesAction): AuxEntriesState => {
    switch (action.type) {
        case AuxEntriesActionTypes.FETCH_AUX_ENTRIES:
            return { ...initialState, loading: true, error: null, isReady: false, };
        case AuxEntriesActionTypes.FETCH_AUX_ENTRIES_SUCCESS:
            return { ...action.payload,  loading: false, error: null, isReady: true, };
        case AuxEntriesActionTypes.FETCH_AUX_ENTRIES_ERROR:
            return { ...initialState, loading: false, error: action.payload, isReady: false, };
        case AuxEntriesActionTypes.CREATE_AUX_ENTRY:
            return { ...initialState, loading: true, error: null, isReady: false, };    
            // return addAuxEntryState(state, action.payload);
        case AuxEntriesActionTypes.UPDATE_AUX_ENTRY:
            return { ...initialState, loading: true, error: null, isReady: false, };
            // return addAuxEntryState(
            //     deleteAuxEntryState(state, action.payload), 
            //     action.payload
            // );
        case AuxEntriesActionTypes.DELETE_AUX_ENTRY:
            return { ...initialState, loading: true, error: null, isReady: false, };
            // return deleteAuxEntryState(state, action.payload);
        case AuxEntriesActionTypes.RESET_AUX_ENTRIES:
            return {...initialState };
        default:
            return state;
    }
}
