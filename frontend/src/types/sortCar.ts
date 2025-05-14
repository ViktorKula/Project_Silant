import { SortElement } from "../utils/sort";

export interface SortCarState {
    sortElems: SortElement[],
}

export enum SortCarActionTypes {
    SORT_CAR_CHANGE_SORT_TYPE = "SORT_CAR_CHANGE_SORT_TYPE",
    SORT_CAR_RESET = "SORT_CAR_RESET",
}

interface SortCarActionChangeSortType {
    type: SortCarActionTypes.SORT_CAR_CHANGE_SORT_TYPE;
    payload: SortElement;
}

interface SortCarActionReset {
    type: SortCarActionTypes.SORT_CAR_RESET;
}

export type SortCarAction = 
    SortCarActionChangeSortType | 
    SortCarActionReset;