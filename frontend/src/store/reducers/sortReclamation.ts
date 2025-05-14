import { SortReclamationAction, SortReclamationActionTypes, SortReclamationState } from "../../types/sortReclamation";

const initialState: SortReclamationState = {
    sortElems: [],
}

export const sortReclamationReducer = (state = initialState, action: SortReclamationAction): SortReclamationState => {
    switch (action.type) {
        case SortReclamationActionTypes.SORT_RECLAMATION_CHANGE_SORT_TYPE:
            let newElems = state.sortElems.filter((elem) => elem.propName !== action.payload.propName);
            return {...state, sortElems: [...newElems, action.payload]};
        case SortReclamationActionTypes.SORT_RECLAMATION_RESET:
            return {sortElems: []};

        default:
            return state;
    }
}