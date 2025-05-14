import React, { useEffect, useState } from "react";

import classes from "./OneSimpleCarItem.module.scss";
import commonClasses from "../../../styles/common.module.scss";

import CarTable from "../Cars/CarTable/CarTable";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useNavigate, useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";
import { AuxEntriesToSelectOptions as auxEntriesToSelectOptions, clientsToSelectOptions, serviceCompaniesToSelectOptions } from "../../../utils/ui";
import MyLabeledSelect, { SelectOption } from "../../UI/MyLabeledSelect/MyLabeledSelect";
import { numberOrNullToString, stringToNumber, stringToNumberOrNull, stringToNumberListed, dateTimeToDate } from "../../../utils/convert";
import MyLabeledInput from "../../UI/MyLabeledInput/MyLabeledInput";
import { AccountType, Car, SimpleCar, defaultSimpleCar } from "../../../types/api";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import { ModelType, isAllowedChange } from "../../../utils/permissions";
import MyButton from "../../UI/MyButton/MyButton";

interface OneSimpleCarItemProps {
    method: SingleElemMethod,
    simpleCar?: SimpleCar | null,
}

const OneSimpleCarItem: React.FC<OneSimpleCarItemProps> = ({method, simpleCar}) => {
    // const cars = useTypedSelector(state => state.cars);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    // const auxEntries = useTypedSelector(state => state.auxEntries);

    // const { createCar, updateCar, deleteCar } = useActions();

    let simpleCarInit = defaultSimpleCar;
    if (simpleCar) {
        simpleCarInit = simpleCar;
    }

    const [usedSimpleCar, setUsedSimpleCar] = useState(simpleCarInit);
    // const navigate = useNavigate();

    // if (!auxEntries.isReady && !auxEntries.loading) {
    //     return (
    //         <Loader/>
    //     );
    // }

    // let carModels: SelectOption[] = [{ value: String(usedSimpleCar.car_model), caption: usedSimpleCar.car_model__name }];
    // let engineModels: SelectOption[] = [{ value: String(usedSimpleCar.engine_model), caption: usedSimpleCar.engine_model__name }];
    // let transmissionModels: SelectOption[] = [{ value: String(usedSimpleCar.transmission_model), caption: usedSimpleCar.transmission_model__name }];
    // let mainBridgeModels: SelectOption[] = [{ value: String(usedSimpleCar.main_bridge_model), caption: usedSimpleCar.main_bridge_model__name }];
    // let steerableBridgeModels: SelectOption[] = [{ value: String(usedSimpleCar.steerable_bridge_model), caption: usedSimpleCar.steerable_bridge_model__name }];

    console.log("usedSimpleCar = ", usedSimpleCar);

    // const createCarAndRefresh = (car: Car) => {
    //     createCar(car);
    //     navigate("/cars");
    // }

    // const updateCarAndRefresh = (car: Car) => {
    //     updateCar(car);
    //     // navigate("/cars");
    // }

    // const deleteCarAndRefresh = (car: Car) => {
    //     deleteCar(car);
    //     navigate("/cars");
    // }

    console.log("method = ", method);

    const canWrite = false;

    return (
        // <div className={classes.page}>
        <div className={commonClasses.one_item_form_container}>
            <div className={commonClasses.one_item_form}>
                <h2>Машина</h2>
                <div className={classes.car_form}>
                    <MyLabeledInput
                        id="one-car-form__car-model"
                        labelCaption="Модель техники"
                        value={usedSimpleCar.car_model__name}
                        // setValue={(value) => setUsedSimpleCar({...usedSimpleCar, car_model: stringToNumberListed(value, carModels)})}
                        disabled={!canWrite}
                    />
                    <MyLabeledInput 
                        id="one-car-form__car-num"
                        type="text"
                        labelCaption="Номер машины" 
                        value={usedSimpleCar.car_num}
                        // setValue={(value) => setUsedSimpleCar({...usedSimpleCar, car_num: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput
                        id="one-car-form__engine-model"
                        labelCaption="Модель двигателя"
                        value={usedSimpleCar.engine_model__name}
                        // setValue={(value) => setUsedSimpleCar({...usedSimpleCar, engine_model: stringToNumberListed(value, engineModels)})} 
                        disabled={!canWrite}
                        // addContainerClassNames={[]}
                    />
                    <MyLabeledInput 
                        id="one-car-form__engine_num"
                        type="text"
                        labelCaption="Номер двигателя" 
                        value={usedSimpleCar.engine_num}
                        // setValue={(value) => setUsedSimpleCar({...usedSimpleCar, engine_num: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput
                        id="one-car-form__transmission-model"
                        labelCaption="Модель трансмиссии (производитель, артикул)"
                        value={usedSimpleCar.transmission_model__name}
                        // setValue={(value) => setUsedSimpleCar({...usedSimpleCar, transmission_model: stringToNumberListed(value, transmissionModels)})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput 
                        id="one-car-form__transmission-num"
                        type="text"
                        labelCaption="Номер трансмиссии" 
                        value={usedSimpleCar.transmission_num}
                        // setValue={(value) => setUsedSimpleCar({...usedSimpleCar, transmission_num: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput
                        id="one-car-form__main-bridge-model"
                        labelCaption="Модель ведущего моста"
                        value={usedSimpleCar.main_bridge_model__name}
                        // setValue={(value) => setUsedSimpleCar({...usedSimpleCar, main_bridge_model: stringToNumberListed(value, mainBridgeModels)})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput 
                        id="one-car-form__main-bridge-num"
                        type="text"
                        labelCaption="Номер ведущего моста" 
                        value={usedSimpleCar.main_bridge_num}
                        // setValue={(value) => setUsedSimpleCar({...usedSimpleCar, main_bridge_num: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput
                        id="one-car-form__steerable-bridge-model"
                        labelCaption="Модель управляемого моста"
                        value={usedSimpleCar.steerable_bridge_model__name}
                        // setValue={(value) => setUsedSimpleCar({...usedSimpleCar, steerable_bridge_model: stringToNumberListed(value, steerableBridgeModels)})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput 
                        id="one-car-form__main-bridge-num"
                        type="text"
                        labelCaption="Номер управляемого моста" 
                        value={usedSimpleCar.steerable_bridge_num}
                        disabled={!canWrite}
                    />
                </div>
            </div>
        </div>
    );
}

export default OneSimpleCarItem;