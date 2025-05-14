import { SelectOption } from "../components/UI/MyLabeledSelect/MyLabeledSelect";
import { AuxEntry, Car, Maintenance, Reclamation, SimpleCar } from "../types/api";
import { PropRecord } from "./tables";

export const stringToNumberOrNull = (value: string): number | null => {
    try {
        return parseInt(value);
    } catch {
        return null;
    }
}

export const stringToNumber = (value: string): number => {
    return parseInt(value);
}

export const stringToNumberListed = (value: string, selectOptions: SelectOption[]): number => {
    let res = parseInt(value);
    if (selectOptions.filter(item => parseInt(item.value) == res).length > 0) {
        return res;
    } else {
        return parseInt(selectOptions[0].value);
    }
}

export const numberOrNullToString = (value: number | null): string => {
    if (value === null) {
        return "";
    } else {
        return String(value);
    }
}

export const deleteEmptyFileds = (obj: Object): Object => {
    let res = Object.fromEntries(Object.entries(obj).filter(
        ([k, v]) => (v != null) && (String(v).length > 0)
    ));

    return res;
    // let res: Object = obj;
    // for (const [key, value] of Object.entries(obj)) {

    //     res[key] = value;
    // }
}

export const excludeCarBadFields = (car: Car): Object => {
    let res = car;

    res["car_model__name"] = "";
    res["engine_model__name"] = "";
    res["transmission_model__name"] = "";
    res["main_bridge_model__name"] = "";
    res["steerable_bridge_model__name"] = "";
    res["client__name"] = "";
    res["service_company__name"] = "";

    return deleteEmptyFileds(res);
}

export const excludeMaintenanceBadFields = (maintenance: Maintenance): Object => {
    let res = maintenance;

    res["car__num"] = "";
    res["type__name"] = "";
    res["service_company__name"] = "";
    if (res["service_company"] == -1) {
        res["service_company"] = null;
    }

    return deleteEmptyFileds(res);
}

export const excludeReclamationBadFields = (reclamation: Reclamation): Object => {
    let res = reclamation;

    res["car__num"] = "";
    res["car__service_company__name"] = "";
    res["car__service_company__id"] = null;
    res["failure_node__name"] = "";
    res["recovery_method__name"] = "";
    res["downtime"] = null;

    // res["car_model__name"] = "";
    // res["engine_model__name"] = "";
    // res["transmission_model__name"] = "";
    // res["main_bridge_model__name"] = "";
    // res["steerable_bridge_model__name"] = "";
    // res["client__name"] = "";
    // res["service_company__name"] = "";

    return deleteEmptyFileds(res);
}

export const dateTimeToDate = (dateTime: string): string => {
    return dateTime.split("T")[0];
}

export const simpleCarToPropValues = (simpleCar: SimpleCar): PropRecord => {
    return {
        car_model__name: simpleCar.car_model__name,
        car_num: simpleCar.car_num,
        engine_model__name: simpleCar.engine_model__name,
        engine_num: simpleCar.engine_num,
        transmission_model__name: simpleCar.transmission_model__name,
        transmission_num: simpleCar.transmission_num,
        main_bridge_model__name: simpleCar.main_bridge_model__name,
        main_bridge_num: simpleCar.main_bridge_num,
        steerable_bridge_model__name: simpleCar.steerable_bridge_model__name,
        steerable_bridge_num: simpleCar.steerable_bridge_num,
    }
}

export const carToPropValues = (car: Car): PropRecord => {
    return {
        car_model__name: car.car_model__name,
        car_num: car.car_num,
        engine_model__name: car.engine_model__name,
        engine_num: car.engine_num,
        transmission_model__name: car.transmission_model__name,
        transmission_num: car.transmission_num,
        main_bridge_model__name: car.main_bridge_model__name,
        main_bridge_num: car.main_bridge_num,
        steerable_bridge_model__name: car.steerable_bridge_model__name,
        steerable_bridge_num: car.steerable_bridge_num,
        factory_shipment_date: dateTimeToDate(car.factory_shipment_date),
        consignee: car.consignee,
        shipment_address: car.shipment_address,
        add_options: car.add_options,
        client__name: car.client__name,
        service_company__name: car.service_company__name,
    }
}

export const maintenanceToPropValues = (maintenance: Maintenance): PropRecord => {
    return {
        car__num: maintenance.car__num,
        type__name: maintenance.type__name,
        maintenance_date: dateTimeToDate(maintenance.maintenance_date),
        operating_time_s: String(maintenance.operating_time),
        work_order_num: maintenance.work_order_num,
        work_order_date: dateTimeToDate(maintenance.work_order_date),
        service_company__name: maintenance.service_company__name,
    }
}

export const reclamationToPropValues = (reclamation: Reclamation): PropRecord => {
    return {
        car__num: reclamation.car__num,
        car__service_company__name: reclamation.car__service_company__name,
        failure_date: dateTimeToDate(reclamation.failure_date),
        operating_time_s: String(reclamation.operating_time),
        failure_node__name: reclamation.failure_node__name,
        failure_description: reclamation.failure_description,
        recovery_method__name: reclamation.recovery_method__name,
        repair_parts: reclamation.repair_parts,
        recovery_date: dateTimeToDate(reclamation.recovery_date),
        downtime_s: String(reclamation.downtime),
    }
}

export const auxEntryToPropValues = (auxEntry: AuxEntry): PropRecord => {
    return {
        name: auxEntry.name,
        description: auxEntry.description,
    }
}