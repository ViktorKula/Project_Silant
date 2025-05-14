import React, { useEffect } from "react";

import classes from "./PageOneCar.module.scss";
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
import { AccountType, Car } from "../../../types/api";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import OneCarItem from "./OneCarItem";

// interface PageOneCarProps {
//     method: SingleElemMethod,
//     car?: Car | null,
// }

const PageOneCar: React.FC = () => {
    const cars = useTypedSelector(state => state.cars);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);
    const { id } = useParams();
    
    const { fetchAuxEntries, fetchCars } = useActions();

    useEffect(() => {
        fetchAuxEntries();
        fetchCars();
    }, [auxEntries.isReady || auxEntries.loading || cars.loading || cars.ready]);

    if (!auxEntries.isReady && !auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    if (cars.loading || auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    let carId = -1;
    if (id) {
        carId = parseInt(id);
    }

    if (carId === -1) {
        return (
            <div>
                id машины не задан
            </div>);
    }

    const car = cars.items.filter(item => item.id === carId)[0];    

    if (cars.items.length === 0) {
        return (
            <div>
                Нет машины с id = {carId}
            </div>);
    }

    const method = SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE;
    return (<OneCarItem car={car} method={method}/>);
}

export default PageOneCar;