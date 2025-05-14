export interface FilterReclamationState {
    car_num: string;
    service_company__name: string;
    failure_node: number | null;
    recovery_method: number | null;
}

export enum FilterReclamationActionTypes {
    SET_CAR_NUM = "SET_CAR_NUM",
    SET_SERVICE_COMPANY_NAME = "SET_SERVICE_COMPANY_NAME",
    SET_FAILURE_NODE = "SET_FAILURE_NODE",
    SET_RECOVERY_METHOD = "SET_RECOVERY_METHOD",
}

interface FilterReclamationSetCarNumAction {
    type: FilterReclamationActionTypes.SET_CAR_NUM;
    payload: string;
}

interface FilterReclamationSetServiceCompanyNameAction {
    type: FilterReclamationActionTypes.SET_SERVICE_COMPANY_NAME;
    payload: string;
}

interface FilterReclamationSetFailureNodeAction {
    type: FilterReclamationActionTypes.SET_FAILURE_NODE;
    payload: number | null;
}

interface FilterReclamationSetRecoveryMethodAction {
    type: FilterReclamationActionTypes.SET_RECOVERY_METHOD;
    payload: number | null;
}


export type FilterReclamationAction = 
    FilterReclamationSetCarNumAction | 
    FilterReclamationSetServiceCompanyNameAction | 
    FilterReclamationSetFailureNodeAction | 
    FilterReclamationSetRecoveryMethodAction;