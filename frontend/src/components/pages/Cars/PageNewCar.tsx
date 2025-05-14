import React, { useEffect } from "react";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";

import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import OneCarItem from "./OneCarItem";
import { getDefaultCar } from "../../../utils/defaultObjects";

const PageNewCar: React.FC = () => {
    const cars = useTypedSelector(state => state.cars);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);
    const { id } = useParams();
    
    const { fetchAuxEntries, fetchCars } = useActions();

    useEffect(() => {
        fetchAuxEntries();
        // fetchCars();
    }, [auxEntries.isReady || auxEntries.loading || cars.loading || cars.ready]);

    if (!auxEntries.isReady && !auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    const car = getDefaultCar(auxEntries);
    const method = SingleElemMethod.SINGLE_ELEM_METHOD_CREATE;

    return (<OneCarItem car={car} method={method}/>);
}

export default PageNewCar;