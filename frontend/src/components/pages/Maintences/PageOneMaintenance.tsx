import React, { useEffect } from "react";

import classes from "./PageOneMaintenance.module.scss";

import CarTable from "../Cars/CarTable/CarTable";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";
import { AuxEntriesToSelectOptions } from "../../../utils/ui";
import MyLabeledSelect, { SelectOption } from "../../UI/MyLabeledSelect/MyLabeledSelect";
import { numberOrNullToString, stringToNumber, stringToNumberOrNull } from "../../../utils/convert";
import MyLabeledInput from "../../UI/MyLabeledInput/MyLabeledInput";
import { AccountType, Car } from "../../../types/api";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import OneMaintenanceItem from "./OneMaintenanceItem";

const PageOneMaintenance: React.FC = () => {
    const maintenances = useTypedSelector(state => state.maintenances);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);
    const { id } = useParams();
    
    const { fetchAuxEntries, fetchCars, fetchMaintenances } = useActions();

    useEffect(() => {
        fetchAuxEntries();
        fetchCars();
        fetchMaintenances();
    }, [auxEntries.isReady || auxEntries.loading || maintenances.loading || maintenances.ready]);

    if (!auxEntries.isReady && !auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    if (maintenances.loading || auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    let maintenanceId = -1;
    if (id) {
        maintenanceId = parseInt(id);
    }

    if (maintenanceId === -1) {
        return (
            <div>
                id ТО не задан
            </div>);
    }

    const maintenance = maintenances.items.filter(item => item.id === maintenanceId)[0];    

    if (maintenances.items.length === 0) {
        return (
            <div>
                Нет ТО с id = {maintenanceId}
            </div>);
    }

    const method = SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE;

    return (
        <OneMaintenanceItem maintenance={maintenance} method={method}/>
    );
}

export default PageOneMaintenance;