import { Dispatch } from "redux";
import { CarsAction, CarsActionTypes } from "../../types/cars";
import { RootState } from "../reducers";
import axios from "axios";
import { checkAuth } from "../../utils/auth";
import { Car, baseApiUrl } from "../../types/api";
import { deleteEmptyFileds as deleteEmptyFields, excludeCarBadFields } from "../../utils/convert";

export const fetchCars = () => {
    return async (dispatch: Dispatch<CarsAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterCar = state.filterCar;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: CarsActionTypes.FETCH_CARS});

            const response = await axios.get(`${baseApiUrl}/cars`, {headers: headers, params: filterCar});
            dispatch({type: CarsActionTypes.FETCH_CARS_SUCCESS, payload: response.data})
        } catch (e) {
            console.log("fetchCars Error: ", e)
            dispatch({
                type: CarsActionTypes.FETCH_CARS_ERROR, 
                payload: (e)
            })
        }
    }
}

export const createCar = (car: Car) => {
    return async (dispatch: Dispatch<CarsAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterCar = state.filterCar;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: CarsActionTypes.CREATE_CAR, payload: car});
            const createResponse = await axios.post(`${baseApiUrl}/cars/`, excludeCarBadFields(car), {headers: headers});

            dispatch({type: CarsActionTypes.FETCH_CARS});
            const response = await axios.get(`${baseApiUrl}/cars/`, {headers: headers, params: filterCar});
            dispatch({type: CarsActionTypes.FETCH_CARS_SUCCESS, payload: response.data})

        } catch (e) {
            console.log("createCar Error: ", e)
            dispatch({
                type: CarsActionTypes.FETCH_CARS_ERROR, 
                payload: (e)
            })
        }
    }
}

export const updateCar = (car: Car) => {
    return async (dispatch: Dispatch<CarsAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterCar = state.filterCar;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: CarsActionTypes.UPDATE_CAR, payload: car});
            // const createResponse = await axios.post(`${baseApiUrl}/cars/`, car, {headers: headers, params: filterCar});
            // const createResponse = await axios.post(`${baseApiUrl}/cars/`, car, {headers: headers});
            const createResponse = await axios.put(`${baseApiUrl}/cars/${car.id}`, excludeCarBadFields(car), {headers: headers});

            dispatch({type: CarsActionTypes.FETCH_CARS});
            const response = await axios.get(`${baseApiUrl}/cars/`, {headers: headers, params: filterCar});
            dispatch({type: CarsActionTypes.FETCH_CARS_SUCCESS, payload: response.data})

        } catch (e) {
            console.log("updateCar Error: ", e)
            dispatch({
                type: CarsActionTypes.FETCH_CARS_ERROR, 
                payload: (e)
            })
        }
    }
}

export const deleteCar = (car: Car) => {
    return async (dispatch: Dispatch<CarsAction>, getState: () => RootState) => {
        try {
            checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            const token = state.account.token;
            const filterCar = state.filterCar;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }

            dispatch({type: CarsActionTypes.DELETE_CAR});
            // const createResponse = await axios.post(`${baseApiUrl}/cars/`, car, {headers: headers, params: filterCar});
            // const createResponse = await axios.post(`${baseApiUrl}/cars/`, car, {headers: headers});
            const createResponse = await axios.delete(`${baseApiUrl}/cars/${car.id}`, {headers: headers});

            dispatch({type: CarsActionTypes.FETCH_CARS});
            const response = await axios.get(`${baseApiUrl}/cars/`, {headers: headers, params: filterCar});
            dispatch({type: CarsActionTypes.FETCH_CARS_SUCCESS, payload: response.data})

        } catch (e) {
            console.log("deleteCar Error: ", e)
            dispatch({
                type: CarsActionTypes.FETCH_CARS_ERROR, 
                payload: (e)
            })
        }
    }
}

export const resetCars = () => {
    return async (dispatch: Dispatch<CarsAction>, getState: () => RootState) => {
        dispatch({type: CarsActionTypes.RESET_CARS});
    }
}