import React, { useEffect } from "react";

import classes from "./PageOneReclamation.module.scss";

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
import OneReclamationItem from "./OneReclamationItem";

const PageOneReclamation: React.FC = () => {
    const reclamations = useTypedSelector(state => state.reclamations);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);
    const { id } = useParams();
    
    const { fetchAuxEntries, fetchCars, fetchReclamations } = useActions();

    useEffect(() => {
        fetchAuxEntries();
        fetchCars();
        fetchReclamations();
    }, [auxEntries.isReady || auxEntries.loading || reclamations.loading || reclamations.ready]);

    if (!auxEntries.isReady && !auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    if (reclamations.loading || auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    let reclamationId = -1;
    if (id) {
        reclamationId = parseInt(id);
    }

    if (reclamationId === -1) {
        return (
            <div>
                id рекламации не задан
            </div>);
    }

    const reclamation = reclamations.items.filter(item => item.id === reclamationId)[0];    

    if (reclamations.items.length === 0) {
        return (
            <div>
                Нет рекламации с id = {reclamationId}
            </div>);
    }

    const method = SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE;

    return (
        <OneReclamationItem reclamation={reclamation} method={method}/>
    );
}

export default PageOneReclamation;