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
import OneSimpleCarItem from "./OneSimpleCarItem";

// interface PageOneCarProps {
//     method: SingleElemMethod,
//     car?: Car | null,
// }

const PageOneSimpleCar: React.FC = () => {
    // const cars = useTypedSelector(state => state.cars);
    // const accountInfo = useTypedSelector(state => state.accountInfo);
    // const auxEntries = useTypedSelector(state => state.auxEntries);
    const simpleCars = useTypedSelector(state => state.simpleCars);
    const { id } = useParams();
    
    const { fetchAuxEntries, fetchSimpleCars } = useActions();

    // useEffect(() => {
    //     // fetchAuxEntries();
    //     fetchSimpleCars();
    // }, [auxEntries.isReady || auxEntries.loading || cars.loading || cars.ready]);
    useEffect(() => {
        // fetchAuxEntries();
        fetchSimpleCars();
    }, []);

    // if (!auxEntries.isReady && !auxEntries.loading) {
    //     return (
    //         <Loader/>
    //     );
    // }

    if (simpleCars.loading) {
        return (
            <Loader/>
        );
    }

    let simpleCarId = -1;
    if (id) {
        simpleCarId = parseInt(id);
    }

    if (simpleCarId === -1) {
        return (
            <div>
                id машины не задан
            </div>);
    }

    const simpleCar = simpleCars.items.filter(item => item.id === simpleCarId)[0];    

    if (simpleCars.items.length === 0) {
        return (
            <div>
                Нет машины с id = {simpleCarId}
            </div>);
    }

    const method = SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE;
    return (<OneSimpleCarItem simpleCar={simpleCar} method={method}/>);
}

export default PageOneSimpleCar;