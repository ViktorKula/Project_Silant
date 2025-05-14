import React, { useEffect } from "react";

import classes from "./PageOneAuxEntry.module.scss";
// import commonClasses from "../../../styles/common.module.scss";

// import { Link } from "react-router-dom";
// import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CarTable from "../Cars/CarTable/CarTable";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";
import { AuxEntriesToSelectOptions } from "../../../utils/ui";
import MyLabeledSelect, { SelectOption } from "../../UI/MyLabeledSelect/MyLabeledSelect";
import { numberOrNullToString, stringToNumber, stringToNumberOrNull } from "../../../utils/convert";
import MyLabeledInput from "../../UI/MyLabeledInput/MyLabeledInput";
import { AccountType, AuxEntryType, Car } from "../../../types/api";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import OneAuxEntryItem from "./OneAuxEntryItem";
import { getAuxEntriesListByType } from "../../../types/auxEntries";

interface PageOneAuxEntryProps {
    type: AuxEntryType;
}

const PageOneAuxEntry: React.FC<PageOneAuxEntryProps> = ({type}) => {
    // const cars = useTypedSelector(state => state.cars);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);
    const { id } = useParams();
    
    // const { fetchAuxEntries, fetchCars } = useActions();
    const { fetchAuxEntries } = useActions();

    useEffect(() => {
        fetchAuxEntries();
        // fetchCars();
    }, [auxEntries.isReady || auxEntries.loading]);

    if (!auxEntries.isReady && !auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    // if (cars.loading || auxEntries.loading) {
    //     return (
    //         <Loader/>
    //     );
    // }

    let auxEntryId = -1;
    if (id) {
        auxEntryId = parseInt(id);
    }

    if (auxEntryId === -1) {
        return (
            <div>
                id записи не задан
            </div>);
    }

    const auxEntryItems = getAuxEntriesListByType(type, auxEntries).filter(item => item.id === auxEntryId);

    if (auxEntryItems.length === 0) {
        return (
            <div>
                Нет записи с id = {auxEntryId}
            </div>);
    }
    const auxEntry = auxEntryItems[0];

    const method = SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE;
    return (<OneAuxEntryItem type={type} auxEntry={auxEntry} method={method} />);
}

export default PageOneAuxEntry;