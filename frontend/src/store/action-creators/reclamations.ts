import { Dispatch } from "redux";
import {ReclamationsAction, ReclamationsActionTypes } from "../../types/reclamations";
import { RootState } from "../reducers";
import axios from "axios";
import { checkAuth } from "../../utils/auth";
import { Reclamation, baseApiUrl } from "../../types/api";
import { excludeReclamationBadFields } from "../../utils/convert";

export const fetchReclamations = () => {
    return async (dispatch: Dispatch<ReclamationsAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterReclamation = state.filterReclamation;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: ReclamationsActionTypes.FETCH_RECLAMATIONS});

            const response = await axios.get(`${baseApiUrl}/reclamations`, {headers: headers, params: filterReclamation});

            dispatch({type: ReclamationsActionTypes.FETCH_RECLAMATIONS_SUCCESS, payload: response.data})
        } catch (e) {
            console.log("fetchReclamations Error: ", e)
            dispatch({
                type: ReclamationsActionTypes.FETCH_RECLAMATIONS_ERROR, 
                payload: (e)
            })
        }
    }
}

export const createReclamation = (reclamation: Reclamation) => {
    return async (dispatch: Dispatch<ReclamationsAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterReclamation = state.filterReclamation;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: ReclamationsActionTypes.CREATE_RECLAMATION, payload: reclamation});
            const createResponse = await axios.post(`${baseApiUrl}/reclamations/`, excludeReclamationBadFields(reclamation), {headers: headers});

            dispatch({type: ReclamationsActionTypes.FETCH_RECLAMATIONS});
            const response = await axios.get(`${baseApiUrl}/reclamations/`, {headers: headers, params: filterReclamation});
            dispatch({type: ReclamationsActionTypes.FETCH_RECLAMATIONS_SUCCESS, payload: response.data})

        } catch (e) {
            console.log("createReclamation Error: ", e)
            dispatch({
                type: ReclamationsActionTypes.FETCH_RECLAMATIONS, 
                payload: (e)
            })
        }
    }
}

export const updateReclamation = (reclamation: Reclamation) => {
    return async (dispatch: Dispatch<ReclamationsAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterReclamation = state.filterReclamation;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: ReclamationsActionTypes.UPDATE_RECLAMATION, payload: reclamation});
            const updateResponse = await axios.put(`${baseApiUrl}/reclamations/${reclamation.id}`, excludeReclamationBadFields(reclamation), {headers: headers});

            dispatch({type: ReclamationsActionTypes.FETCH_RECLAMATIONS});
            const response = await axios.get(`${baseApiUrl}/reclamations/`, {headers: headers, params: filterReclamation});
            dispatch({type: ReclamationsActionTypes.FETCH_RECLAMATIONS_SUCCESS, payload: response.data})

        } catch (e) {
            console.log("updateReclamation Error: ", e)
            dispatch({
                type: ReclamationsActionTypes.FETCH_RECLAMATIONS, 
                payload: (e)
            })
        }
    }
}

export const deleteReclamation = (reclamation: Reclamation) => {
    return async (dispatch: Dispatch<ReclamationsAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterReclamation = state.filterReclamation;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: ReclamationsActionTypes.DELETE_RECLAMATION, payload: reclamation});
            const deleteResponse = await axios.delete(`${baseApiUrl}/reclamations/${reclamation.id}`, {headers: headers});

            dispatch({type: ReclamationsActionTypes.FETCH_RECLAMATIONS});
            const response = await axios.get(`${baseApiUrl}/reclamations/`, {headers: headers, params: filterReclamation});
            dispatch({type: ReclamationsActionTypes.FETCH_RECLAMATIONS_SUCCESS, payload: response.data})

        } catch (e) {
            console.log("deleteReclamation Error: ", e)
            dispatch({
                type: ReclamationsActionTypes.FETCH_RECLAMATIONS, 
                payload: (e)
            })
        }
    }
}

export const resetReclamations = () => {
    return async (dispatch: Dispatch<ReclamationsAction>, getState: () => RootState) => {
        dispatch({type: ReclamationsActionTypes.RESET_RECLAMATIONS});
    }
}