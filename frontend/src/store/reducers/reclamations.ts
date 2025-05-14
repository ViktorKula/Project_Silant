import { ReclamationsAction, ReclamationsActionTypes, ReclamationsState } from "../../types/reclamations";

const initialState: ReclamationsState = {
    items: [],
    loading: false,
    error: null,
    ready: false,
}

export const reclamationsReducer = (state = initialState, action: ReclamationsAction): ReclamationsState => {
    switch (action.type) {
        case ReclamationsActionTypes.FETCH_RECLAMATIONS:
            return { loading: true, error: null, items: [], ready: false, };
        case ReclamationsActionTypes.FETCH_RECLAMATIONS_SUCCESS:
            return { loading: false, error: null, items: action.payload, ready: true, };
        case ReclamationsActionTypes.FETCH_RECLAMATIONS_ERROR:
            return { loading: false, error: action.payload, items: [], ready: false, };
        case ReclamationsActionTypes.CREATE_RECLAMATION:
            return { loading: true, error: null, items: [], ready: false, };
        case ReclamationsActionTypes.UPDATE_RECLAMATION:
            return { loading: true, error: null, items: [], ready: false, };
        case ReclamationsActionTypes.DELETE_RECLAMATION:
            return { loading: true, error: null, items: [], ready: false, };
        case ReclamationsActionTypes.RESET_RECLAMATIONS:
            return {loading: false, error: null, items: [], ready: false, };
        default:
            return state;
    }
}