import { Dispatch } from "redux";
import { MaintenancesAction, MaintenancesActionTypes } from "../../types/maintenances";
import { RootState } from "../reducers";
import axios from "axios";
import { checkAuth } from "../../utils/auth";
import { Maintenance, baseApiUrl } from "../../types/api";
import { excludeMaintenanceBadFields } from "../../utils/convert";

export const fetchMaintenances = () => {
    return async (dispatch: Dispatch<MaintenancesAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterMaintenance = state.filterMaintenance;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: MaintenancesActionTypes.FETCH_MAINTENANCES});

            const response = await axios.get(`${baseApiUrl}/maintenances`, {headers: headers, params: filterMaintenance});

            dispatch({type: MaintenancesActionTypes.FETCH_MAINTENANCES_SUCCESS, payload: response.data})
        } catch (e) {
            console.log("fetchMaintenances Error: ", e)
            dispatch({
                type: MaintenancesActionTypes.FETCH_MAINTENANCES_ERROR, 
                payload: (e)
            })
        }
    }
}

export const createMaintenance = (maintenance: Maintenance) => {
    return async (dispatch: Dispatch<MaintenancesAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterMaintenance = state.filterMaintenance;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: MaintenancesActionTypes.CREATE_MAINTENANCE, payload: maintenance});
            const createResponse = await axios.post(`${baseApiUrl}/maintenances/`, excludeMaintenanceBadFields(maintenance), {headers: headers});

            dispatch({type: MaintenancesActionTypes.FETCH_MAINTENANCES});
            const response = await axios.get(`${baseApiUrl}/maintenances/`, {headers: headers, params: filterMaintenance});
            dispatch({type: MaintenancesActionTypes.FETCH_MAINTENANCES_SUCCESS, payload: response.data})

        } catch (e) {
            console.log("createMaintenance Error: ", e)
            dispatch({
                type: MaintenancesActionTypes.FETCH_MAINTENANCES_ERROR, 
                payload: (e)
            })
        }
    }
}

export const updateMaintenance = (maintenance: Maintenance) => {
    return async (dispatch: Dispatch<MaintenancesAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterMaintenance = state.filterMaintenance;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: MaintenancesActionTypes.UPDATE_MAINTENANCE, payload: maintenance});
            const updateResponse = await axios.put(`${baseApiUrl}/maintenances/${maintenance.id}`, excludeMaintenanceBadFields(maintenance), {headers: headers});

            dispatch({type: MaintenancesActionTypes.FETCH_MAINTENANCES});
            const response = await axios.get(`${baseApiUrl}/maintenances/`, {headers: headers, params: filterMaintenance});
            dispatch({type: MaintenancesActionTypes.FETCH_MAINTENANCES_SUCCESS, payload: response.data})

        } catch (e) {
            console.log("updateMaintenance Error: ", e)
            dispatch({
                type: MaintenancesActionTypes.FETCH_MAINTENANCES_ERROR, 
                payload: (e)
            })
        }
    }
}

export const deleteMaintenance = (maintenance: Maintenance) => {
    return async (dispatch: Dispatch<MaintenancesAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterMaintenance = state.filterMaintenance;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: MaintenancesActionTypes.DELETE_MAINTENANCE, payload: maintenance});
            const deleteResponse = await axios.delete(`${baseApiUrl}/maintenances/${maintenance.id}`, {headers: headers});

            dispatch({type: MaintenancesActionTypes.FETCH_MAINTENANCES});
            const response = await axios.get(`${baseApiUrl}/maintenances/`, {headers: headers, params: filterMaintenance});
            dispatch({type: MaintenancesActionTypes.FETCH_MAINTENANCES_SUCCESS, payload: response.data})

        } catch (e) {
            console.log("deleteMaintenance Error: ", e)
            dispatch({
                type: MaintenancesActionTypes.FETCH_MAINTENANCES_ERROR, 
                payload: (e)
            })
        }
    }
}

export const resetMaintenances = () => {
    return async (dispatch: Dispatch<MaintenancesAction>, getState: () => RootState) => {
        dispatch({type: MaintenancesActionTypes.RESET_MAINTENANCES});
    }
}