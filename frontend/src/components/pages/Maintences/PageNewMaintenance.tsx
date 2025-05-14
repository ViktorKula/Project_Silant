import React, { useEffect } from "react";

import classes from "./PageNewMaintenance.module.scss";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import OneMaintenanceItem from "./OneMaintenanceItem";
import { getDefaultMaintenance } from "../../../utils/defaultObjects";

const PageNewMaintenance: React.FC = () => {
    const maintenances = useTypedSelector(state => state.maintenances);
    const cars = useTypedSelector(state => state.cars);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);
    const { id } = useParams();
    
    const { fetchAuxEntries, fetchCars, fetchMaintenances } = useActions();

    useEffect(() => {
        fetchAuxEntries();
        fetchCars();
    }, [auxEntries.isReady || auxEntries.loading || maintenances.loading || maintenances.ready || cars.loading || cars.ready]);

    if (!auxEntries.isReady && !auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    const maintenance = getDefaultMaintenance(auxEntries, cars);
    const method = SingleElemMethod.SINGLE_ELEM_METHOD_CREATE;

    return (
        <OneMaintenanceItem maintenance={maintenance} method={method}/>
    );
}

export default PageNewMaintenance;