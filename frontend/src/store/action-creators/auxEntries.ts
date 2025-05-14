import { Dispatch } from "redux";
import { AuxEntriesAction, AuxEntriesActionTypes, ConcreteAuxEntry, getAuxEntriesUrlList, getAuxEntriesUrlSingle, setAuxEntriesListByType } from "../../types/auxEntries";
import { RootState } from "../reducers";
import axios, { AxiosHeaders } from "axios";
import { checkAuth } from "../../utils/auth";
import { AuxEntries, Client, ServiceCompany, baseAccUrl, baseApiUrl } from "../../types/api";

const receiveAuxEntries = async (headers: any): Promise<AuxEntries> => {
    const responseCarModels = await axios.get(`${baseApiUrl}/car_models`, {headers: headers});
    const responseEngineModels = await axios.get(`${baseApiUrl}/engine_models`, {headers: headers});
    const responseTransmissionModels = await axios.get(`${baseApiUrl}/transmission_models`, {headers: headers});
    const responseMainBridgeModels = await axios.get(`${baseApiUrl}/main_bridge_models`, {headers: headers});
    const responseSteerableBridgeModels = await axios.get(`${baseApiUrl}/steerable_bridge_models`, {headers: headers});
    const responseMaintenanceTypes = await axios.get(`${baseApiUrl}/maintenance_types`, {headers: headers});
    const responseFailureNodes = await axios.get(`${baseApiUrl}/failure_nodes`, {headers: headers});
    const responseRecoveryMethods = await axios.get(`${baseApiUrl}/recovery_methods`, {headers: headers});
    
    let dataClients: Client[] = [];
    try {
        const responseClients = await axios.get(`${baseApiUrl}/clients`, {headers: headers});
        dataClients = responseClients.data;
    } catch (e) {
        console.log("fetchAuxEntries: get clients")
    }
    
    let dataServiceCompanies: ServiceCompany[] = [];
    try {
        const responseServiceCompanies = await axios.get(`${baseApiUrl}/service_companies`, {headers: headers});
        dataServiceCompanies = responseServiceCompanies.data;
    } catch (e) {
        console.log("fetchAuxEntries: get service_companies")
    }    

    const entries: AuxEntries = {
        carModels: responseCarModels.data,
        engineModels: responseEngineModels.data,
        transmissionModels: responseTransmissionModels.data,
        mainBridgeModels: responseMainBridgeModels.data,
        steerableBridgeModels: responseSteerableBridgeModels.data,
        maintenanceTypes: responseMaintenanceTypes.data,
        failureNodes: responseFailureNodes.data,
        recoveryMethods: responseRecoveryMethods.data,
        clients: dataClients,
        serviceCompanies: dataServiceCompanies,
    }

    return entries;
}

export const fetchAuxEntries = () => {
    return async (dispatch: Dispatch<AuxEntriesAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterCar = state.filterCar;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES});
            
            const entries = await receiveAuxEntries(headers);

            dispatch({type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_SUCCESS, payload: entries})

            console.log("fetchAuxEntries: end");
            // navigate("/results")
        } catch (e) {
            console.log("fetchAuxEntries Error: ", e)
            dispatch({
                type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_ERROR, 
                payload: (e)
            })
        }
    }
}

export const createAuxEntry = (concreteAuxEntry: ConcreteAuxEntry) => {
    return async (dispatch: Dispatch<AuxEntriesAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            const token = state.account.token;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: AuxEntriesActionTypes.CREATE_AUX_ENTRY, payload: concreteAuxEntry});
            const createResponse = await axios.post(getAuxEntriesUrlList(concreteAuxEntry.type), concreteAuxEntry.value, {headers: headers});

            dispatch({type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES});
            const entries = await receiveAuxEntries(headers);
            dispatch({type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_SUCCESS, payload: entries})

        } catch (e) {
            console.log("createAuxEntry Error: ", e)
            dispatch({
                type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_ERROR, 
                payload: (e)
            })
        }
    }
}

export const updateAuxEntry = (concreteAuxEntry: ConcreteAuxEntry) => {
    return async (dispatch: Dispatch<AuxEntriesAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            const token = state.account.token;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: AuxEntriesActionTypes.UPDATE_AUX_ENTRY, payload: concreteAuxEntry});
            const updateResponse = await axios.put(getAuxEntriesUrlSingle(concreteAuxEntry.type, concreteAuxEntry.value.id), concreteAuxEntry.value, {headers: headers});

            dispatch({type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES});
            const entries = await receiveAuxEntries(headers);
            dispatch({type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_SUCCESS, payload: entries});

        } catch (e) {
            console.log("updateAuxEntry Error: ", e)
            dispatch({
                type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_ERROR, 
                payload: (e)
            })
        }
    }
}

export const deleteAuxEntry = (concreteAuxEntry: ConcreteAuxEntry) => {
    return async (dispatch: Dispatch<AuxEntriesAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            const token = state.account.token;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: AuxEntriesActionTypes.DELETE_AUX_ENTRY, payload: concreteAuxEntry});
            const deleteResponse = await axios.delete(getAuxEntriesUrlSingle(concreteAuxEntry.type, concreteAuxEntry.value.id), {headers: headers});

            dispatch({type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES});
            const entries = await receiveAuxEntries(headers);
            dispatch({type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_SUCCESS, payload: entries})

        } catch (e) {
            console.log("deleteAuxEntry Error: ", e)
            dispatch({
                type: AuxEntriesActionTypes.FETCH_AUX_ENTRIES_ERROR, 
                payload: (e)
            })
        }
    }
}

export const resetAuxEntries = () => {
    return async (dispatch: Dispatch<AuxEntriesAction>, getState: () => RootState) => {
        dispatch({type: AuxEntriesActionTypes.RESET_AUX_ENTRIES});
        console.log("resetAuxEntries: end");
    }
}