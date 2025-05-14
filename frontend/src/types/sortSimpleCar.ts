import { SortElement } from "../utils/sort";

export interface SortSimpleCarState {
    sortElems: SortElement[],
}

export enum SortSimpleCarActionTypes {
    SORT_SIMPLE_CAR_CHANGE_SORT_TYPE = "SORT_SIMPLE_CAR_CHANGE_SORT_TYPE",
    SORT_SIMPLE_CAR_RESET = "SORT_SIMPLE_CAR_RESET",
}

interface SortSimpleCarActionChangeSortType {
    type: SortSimpleCarActionTypes.SORT_SIMPLE_CAR_CHANGE_SORT_TYPE;
    payload: SortElement;
}

interface SortSimpleCarActionReset {
    type: SortSimpleCarActionTypes.SORT_SIMPLE_CAR_RESET;
}

export type SortSimpleCarAction = 
    SortSimpleCarActionChangeSortType | 
    SortSimpleCarActionReset;