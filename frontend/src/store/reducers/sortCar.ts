import { SortCarAction, SortCarActionTypes, SortCarState } from "../../types/sortCar";

const initialState: SortCarState = {
    sortElems: [],
}

export const sortCarReducer = (state = initialState, action: SortCarAction): SortCarState => {
    switch (action.type) {
        case SortCarActionTypes.SORT_CAR_CHANGE_SORT_TYPE:
            let newElems = state.sortElems.filter((elem) => elem.propName !== action.payload.propName);
            return {...state, sortElems: [...newElems, action.payload]};
        case SortCarActionTypes.SORT_CAR_RESET:
            return {sortElems: []};

        default:
            return state;
    }
}