import { SortElement } from "../utils/sort";

export interface SortMaintenanceState {
    sortElems: SortElement[],
}

export enum SortMaintenanceActionTypes {
    SORT_MAINTENANCE_CHANGE_SORT_TYPE = "SORT_MAINTENANCE_CHANGE_SORT_TYPE",
    SORT_MAINTENANCE_RESET = "SORT_MAINTENANCE_RESET",
}

interface SortMaintenanceActionChangeSortType {
    type: SortMaintenanceActionTypes.SORT_MAINTENANCE_CHANGE_SORT_TYPE;
    payload: SortElement;
}

interface SortMaintenanceActionReset {
    type: SortMaintenanceActionTypes.SORT_MAINTENANCE_RESET;
}

export type SortMaintenanceAction = 
    SortMaintenanceActionChangeSortType | 
    SortMaintenanceActionReset;