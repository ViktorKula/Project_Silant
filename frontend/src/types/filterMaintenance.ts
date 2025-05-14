export interface FilterMaintenanceState {
    car_num: string;
    service_company__name: string;
    type: number | null;
}

export enum FilterMaintenanceActionTypes {
    SET_CAR_NUM = "SET_CAR_NUM",
    SET_SERVICE_COMPANY_NAME = "SET_SERVICE_COMPANY_NAME",
    SET_TYPE = "SET_TYPE",
}

interface FilterMaintenanceSetCarNumAction {
    type: FilterMaintenanceActionTypes.SET_CAR_NUM;
    payload: string;
}

interface FilterMaintenanceSetServiceCompanyNameAction {
    type: FilterMaintenanceActionTypes.SET_SERVICE_COMPANY_NAME;
    payload: string;
}

interface FilterMaintenanceSetTypeAction {
    type: FilterMaintenanceActionTypes.SET_TYPE;
    payload: number | null;
}

export type FilterMaintenanceAction = 
    FilterMaintenanceSetCarNumAction | 
    FilterMaintenanceSetServiceCompanyNameAction | 
    FilterMaintenanceSetTypeAction;