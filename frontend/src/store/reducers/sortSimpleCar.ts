import { SortSimpleCarAction, SortSimpleCarActionTypes, SortSimpleCarState } from "../../types/sortSimpleCar";

const initialState: SortSimpleCarState = {
    sortElems: [],
}

export const sortSimpleCarReducer = (state = initialState, action: SortSimpleCarAction): SortSimpleCarState => {
    switch (action.type) {
        case SortSimpleCarActionTypes.SORT_SIMPLE_CAR_CHANGE_SORT_TYPE:
            let newElems = state.sortElems.filter((elem) => elem.propName !== action.payload.propName);
            return {...state, sortElems: [...newElems, action.payload]};
        case SortSimpleCarActionTypes.SORT_SIMPLE_CAR_RESET:
            return {sortElems: []};

        default:
            return state;
    }
}