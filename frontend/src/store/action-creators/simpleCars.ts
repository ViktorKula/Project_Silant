import { Dispatch } from "redux";
import { SimpleCarsAction, SimpleCarsActionTypes } from "../../types/simpleCars";
import { RootState } from "../reducers";
// import { createHistogramRequestData } from "../../types/api";
import axios from "axios";
import { checkAuth } from "../../utils/auth";
import { baseApiUrl } from "../../types/api";

export const fetchSimpleCars = () => {
    return async (dispatch: Dispatch<SimpleCarsAction>, getState: () => RootState) => {
        try {
            // checkAuth();

            const state = getState();
            // const isLogined = state.account.isLogined;
            // const token = state.account.token;
            const filterCar = state.filterCar;

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }

            dispatch({type: SimpleCarsActionTypes.FETCH_SIMPLE_CARS});

            const response = await axios.get(`${baseApiUrl}/simple_cars`, {headers: headers, params: filterCar});
            dispatch({type: SimpleCarsActionTypes.FETCH_SIMPLE_CARS_SUCCESS, payload: response.data})

            // navigate("/results")
        } catch (e) {
            console.log("fetchSimpleCars Error: ", e)
            dispatch({
                type: SimpleCarsActionTypes.FETCH_SIMPLE_CARS_ERROR, 
                payload: (e)
            })
        }
    }
}

export const resetSimpleCars = () => {
    return async (dispatch: Dispatch<SimpleCarsAction>, getState: () => RootState) => {
        dispatch({type: SimpleCarsActionTypes.RESET_SIMPLE_CARS});
    }
}