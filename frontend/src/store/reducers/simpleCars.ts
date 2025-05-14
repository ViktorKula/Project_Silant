import { SimpleCarsAction, SimpleCarsActionTypes, SimpleCarsState } from "../../types/simpleCars";

const initialState: SimpleCarsState = {
    items: [],
    loading: false,
    error: null,
}

export const simpleCarsReducer = (state = initialState, action: SimpleCarsAction): SimpleCarsState => {
    switch (action.type) {
        case SimpleCarsActionTypes.FETCH_SIMPLE_CARS:
            return { loading: true, error: null, items: [] };
        case SimpleCarsActionTypes.FETCH_SIMPLE_CARS_SUCCESS:
            return { loading: false, error: null, items: action.payload };
        case SimpleCarsActionTypes.FETCH_SIMPLE_CARS_ERROR:
            // console.log("FETCH_CARS_ERROR: ", action.payload);
            return { loading: false, error: action.payload, items: [] };
        case SimpleCarsActionTypes.RESET_SIMPLE_CARS:
            return {loading: false, error: null, items: []};            
        default:
            return state;
    }
}
