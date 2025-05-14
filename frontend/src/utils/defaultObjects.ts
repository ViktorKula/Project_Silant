import { Car, Maintenance, Reclamation, defaultCar, defaultMaintenance, defaultReclamation } from "../types/api";
import { AuxEntriesState } from "../types/auxEntries";
import { CarsState } from "../types/cars";
import { dateTimeToDate } from "./convert";

export const getDefaultCar = (auxEntries: AuxEntriesState): Car => {
    let res = defaultCar;

    if (auxEntries.isReady) {
        res.car_model = auxEntries.carModels[0].id;
        res.engine_model = auxEntries.engineModels[0].id;
        res.transmission_model = auxEntries.transmissionModels[0].id;
        res.main_bridge_model = auxEntries.mainBridgeModels[0].id;
        res.steerable_bridge_model = auxEntries.steerableBridgeModels[0].id;
        res.client = auxEntries.clients[0].id;
        res.service_company = auxEntries.serviceCompanies[0].id;
    }
    
    res.factory_shipment_date = dateTimeToDate(new Date().toISOString());

    return res;
}

export const getDefaultMaintenance = (auxEntries: AuxEntriesState, cars: CarsState): Maintenance => {
    let res = defaultMaintenance;
    
    if (auxEntries.isReady && cars.ready) {
        console.log("cars = ", cars);
        console.log("auxEntries = ", auxEntries);
        res.car = cars.items[0].id;
        res.type = auxEntries.maintenanceTypes[0].id;
        res.service_company = auxEntries.serviceCompanies[0].id;
    }

    res.maintenance_date = dateTimeToDate(new Date().toISOString());
    res.work_order_date = dateTimeToDate(new Date().toISOString());

    console.log("getDefaultMaintenance: res = ", res);

    return res;
}

export const getDefaultReclamation = (auxEntries: AuxEntriesState, cars: CarsState): Reclamation => {
    let res = defaultReclamation;
    
    if (auxEntries.isReady && cars.ready) {
        res.car = cars.items[0].id;
        res.failure_node = auxEntries.failureNodes[0].id;
        res.recovery_method = auxEntries.recoveryMethods[0].id;
    }

    res.failure_date = dateTimeToDate(new Date().toISOString());
    res.recovery_date = dateTimeToDate(new Date().toISOString());

    return res;
}