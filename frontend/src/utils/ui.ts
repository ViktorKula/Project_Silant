import { SelectOption } from "../components/UI/MyLabeledSelect/MyLabeledSelect";
import { AuxEntry, Car, Client, ServiceCompany } from "../types/api";

const AuxEntryToSelectOption = (auxEntry: AuxEntry): SelectOption => {
    return {
        value: String(auxEntry.id),
        caption: auxEntry.name,
    }
}

const clientToSelectOption = (client: Client): SelectOption => {
    return {
        value: String(client.id),
        caption: client.name,
    }
}

const serviceCompanyToSelectOption = (serviceCompany: ServiceCompany): SelectOption => {
    return {
        value: String(serviceCompany.id),
        caption: serviceCompany.name,
    }
}

const carToSelectOption = (car: Car): SelectOption => {
    return {
        value: String(car.id),
        caption: car.car_num,
    }
}

export const AuxEntriesToSelectOptions = (auxEntries: AuxEntry[], hasEmpty: Boolean): SelectOption[] => {

    let res = auxEntries.map((auxEntry: AuxEntry) => AuxEntryToSelectOption(auxEntry));
    if (hasEmpty) {
        res.unshift({
            value: "",
            caption: "-",
        });
    }
    
    return res;
}

export const clientsToSelectOptions = (clients: Client[], hasEmpty: Boolean): SelectOption[] => {

    let res = clients.map((client: Client) => clientToSelectOption(client));
    if (hasEmpty) {
        res.unshift({
            value: "",
            caption: "-",
        });
    }
    
    return res;
}

export const serviceCompaniesToSelectOptions = (serviceCompanies: ServiceCompany[], hasEmpty: Boolean): SelectOption[] => {

    let res = serviceCompanies.map((serviceCompany: ServiceCompany) => serviceCompanyToSelectOption(serviceCompany));
    if (hasEmpty) {
        res.unshift({
            value: "",
            caption: "-",
        });
    }
    
    return res;
}

export const carsToSelectOptions = (cars: Car[], hasEmpty: Boolean): SelectOption[] => {

    let res = cars.map((car: Car) => carToSelectOption(car));
    if (hasEmpty) {
        res.unshift({
            value: "",
            caption: "-",
        });
    }
    
    return res;
}