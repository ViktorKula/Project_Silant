import { SortElement } from "../utils/sort";

export interface SortReclamationState {
    sortElems: SortElement[],
}

export enum SortReclamationActionTypes {
    SORT_RECLAMATION_CHANGE_SORT_TYPE = "SORT_RECLAMATION_CHANGE_SORT_TYPE",
    SORT_RECLAMATION_RESET = "SORT_RECLAMATION_RESET",
}

interface SortReclamationActionChangeSortType {
    type: SortReclamationActionTypes.SORT_RECLAMATION_CHANGE_SORT_TYPE;
    payload: SortElement;
}

interface SortReclamationActionReset {
    type: SortReclamationActionTypes.SORT_RECLAMATION_RESET;
}

export type SortReclamationAction = 
    SortReclamationActionChangeSortType | 
    SortReclamationActionReset;