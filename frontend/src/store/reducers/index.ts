import { combineReducers } from "redux";
import { accountReducer } from "./accountReducer";
import { accountInfoReducer } from "./accountInfoReducer";
import { AuxEntriesReducer } from "./auxEntriesReducer";
import { filterCarReducer } from "./filterCar";
import { filterMaintenanceReducer } from "./filterMaintenance";
import { filterReclamationReducer } from "./filterReclamation";
import { carsReducer } from "./cars";
import { simpleCarsReducer } from "./simpleCars";
import { maintenancesReducer } from "./maintenances";
import { reclamationsReducer } from "./reclamations";
import { sortSimpleCarReducer } from "./sortSimpleCar";
import { sortCarReducer } from "./sortCar";
import { sortMaintenanceReducer } from "./sortMaintenance";
import { sortReclamationReducer } from "./sortReclamation";


export const rootReducer = combineReducers({
    account: accountReducer,
    accountInfo: accountInfoReducer,
    auxEntries: AuxEntriesReducer,
    filterCar: filterCarReducer,
    filterMaintenance: filterMaintenanceReducer,
    filterReclamation: filterReclamationReducer,
    sortSimpleCar: sortSimpleCarReducer,
    sortCar: sortCarReducer,
    sortMaintenance: sortMaintenanceReducer,
    sortReclamation: sortReclamationReducer,
    simpleCars: simpleCarsReducer,
    cars: carsReducer,
    maintenances: maintenancesReducer,
    reclamations: reclamationsReducer,
})

export type RootState = ReturnType<typeof rootReducer>;