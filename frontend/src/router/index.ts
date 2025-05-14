import React from "react";
import { RouteData, SingleElemMethod } from "../types/common";

import PageMain from "../components/pages/PageMain/PageMain";
import PageCars from "../components/pages/Cars/PageCars";
import PageNewCar from "../components/pages/Cars/PageNewCar";
import PageOneCar from "../components/pages/Cars/PageOneCar";
import PageMaintenances from "../components/pages/Maintences/PageMaintenances";
import PageNewMaintenance from "../components/pages/Maintences/PageNewMaintenance";
import PageOneMaintenance from "../components/pages/Maintences/PageOneMaintenance";
import PageReclamations from "../components/pages/Reclamations/PageReclamations";
import PageNewReclamation from "../components/pages/Reclamations/PageNewReclamation";
import PageOneReclamation from "../components/pages/Reclamations/PageOneReclamation";
import { getAuxEntriesCaption, getAuxEntriesLinkTable } from "../types/auxEntries";
import { AuxEntryType } from "../types/api";
import AuxEntryTable from "../components/pages/AuxEntries/AuxEntryTable";
import OneAuxEntryItem from "../components/pages/AuxEntries/OneAuxEntryItem";
import PageOneAuxEntry from "../components/pages/AuxEntries/PageOneAuxEntry";
import PageAuxEntries from "../components/pages/AuxEntries/PageAuxEntries";
import PageOneSimpleCar from "../components/pages/SimpleCars/PageOneSimpleCar";

export const privateRoutes: RouteData[] = [
    {path: "/cars", component: PageCars, caption: "Машины", isVisible: true},
    {path: "/cars/new", component: PageNewCar, caption: "Новая машина", isVisible: false},
    {path: "/cars/:id", component: PageOneCar, caption: "Машина", isVisible: false},
    {path: "/maintenances", component: PageMaintenances, caption: "ТО", isVisible: true},
    {path: "/maintenances/new", component: PageNewMaintenance, caption: "Новое ТО", isVisible: false},
    {path: "/maintenances/:id", component: PageOneMaintenance, caption: "ТО", isVisible: false},
    {path: "/reclamations", component: PageReclamations, caption: "Рекламации", isVisible: true},
    {path: "/reclamations/new", component: PageNewReclamation, caption: "Новая рекламация", isVisible: false},
    {path: "/reclamations/:id", component: PageOneReclamation, caption: "Рекламации", isVisible: false},
]

const makeAuxEntryRouteData = (type: AuxEntryType): RouteData => {
    return {
        path: getAuxEntriesLinkTable(type), 
        component: AuxEntryTable,
        caption: getAuxEntriesCaption(type), 
        isVisible: false, 
        props: {type: type},
    }    
}

const makeAuxEntryRouteDataNew = (type: AuxEntryType): RouteData => {
    return {
        path: `${getAuxEntriesLinkTable(type)}/new`, 
        component: OneAuxEntryItem,
        caption: getAuxEntriesCaption(type), 
        isVisible: false, 
        props: {method: SingleElemMethod.SINGLE_ELEM_METHOD_CREATE, type: type, auxEntry: null,},
    }    
}

const makeAuxEntryRouteDataId = (type: AuxEntryType): RouteData => {
    return {
        path: `${getAuxEntriesLinkTable(type)}/:id`, 
        component: PageOneAuxEntry,
        caption: getAuxEntriesCaption(type), 
        isVisible: false, 
        props: { type: type },
    }    
}

export const auxEntryRoutes: RouteData[] = [
    {path: "/aux_entries", component: PageAuxEntries, caption: "Справочники", isVisible: true},

    makeAuxEntryRouteData(AuxEntryType.AUX_ENTRY_TYPE_CAR_MODEL),
    makeAuxEntryRouteData(AuxEntryType.AUX_ENTRY_TYPE_ENGINE_MODEL),
    makeAuxEntryRouteData(AuxEntryType.AUX_ENTRY_TYPE_TRANSMISSION_MODEL),
    makeAuxEntryRouteData(AuxEntryType.AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL),
    makeAuxEntryRouteData(AuxEntryType.AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL),
    makeAuxEntryRouteData(AuxEntryType.AUX_ENTRY_TYPE_MAINTENANCE_TYPE),
    makeAuxEntryRouteData(AuxEntryType.AUX_ENTRY_TYPE_FAILURE_NODE),
    makeAuxEntryRouteData(AuxEntryType.AUX_ENTRY_TYPE_RECOVERY_METHOD),

    makeAuxEntryRouteDataNew(AuxEntryType.AUX_ENTRY_TYPE_CAR_MODEL),
    makeAuxEntryRouteDataNew(AuxEntryType.AUX_ENTRY_TYPE_ENGINE_MODEL),
    makeAuxEntryRouteDataNew(AuxEntryType.AUX_ENTRY_TYPE_TRANSMISSION_MODEL),
    makeAuxEntryRouteDataNew(AuxEntryType.AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL),
    makeAuxEntryRouteDataNew(AuxEntryType.AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL),
    makeAuxEntryRouteDataNew(AuxEntryType.AUX_ENTRY_TYPE_MAINTENANCE_TYPE),
    makeAuxEntryRouteDataNew(AuxEntryType.AUX_ENTRY_TYPE_FAILURE_NODE),
    makeAuxEntryRouteDataNew(AuxEntryType.AUX_ENTRY_TYPE_RECOVERY_METHOD),

    makeAuxEntryRouteDataId(AuxEntryType.AUX_ENTRY_TYPE_CAR_MODEL),
    makeAuxEntryRouteDataId(AuxEntryType.AUX_ENTRY_TYPE_ENGINE_MODEL),
    makeAuxEntryRouteDataId(AuxEntryType.AUX_ENTRY_TYPE_TRANSMISSION_MODEL),
    makeAuxEntryRouteDataId(AuxEntryType.AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL),
    makeAuxEntryRouteDataId(AuxEntryType.AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL),
    makeAuxEntryRouteDataId(AuxEntryType.AUX_ENTRY_TYPE_MAINTENANCE_TYPE),
    makeAuxEntryRouteDataId(AuxEntryType.AUX_ENTRY_TYPE_FAILURE_NODE),
    makeAuxEntryRouteDataId(AuxEntryType.AUX_ENTRY_TYPE_RECOVERY_METHOD),
]

export const publicRoutes: RouteData[] = [
    // {path: "/", component: PageMain, caption: "Главная", isVisible: false},
    {path: "/simple_cars", component: PageMain, caption: "Главная", isVisible: false},
    {path: "/simple_cars/:id", component: PageOneSimpleCar, caption: "Машина", isVisible: false},
]