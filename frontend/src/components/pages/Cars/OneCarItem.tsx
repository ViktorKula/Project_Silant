import React, { useEffect, useState } from "react";

import classes from "./OneCarItem.module.scss";
import commonClasses from "../../../styles/common.module.scss";

import CarTable from "../Cars/CarTable/CarTable";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useNavigate, useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";
import { AuxEntriesToSelectOptions as auxEntriesToSelectOptions, clientsToSelectOptions, serviceCompaniesToSelectOptions } from "../../../utils/ui";
import MyLabeledSelect, { SelectOption } from "../../UI/MyLabeledSelect/MyLabeledSelect";
import { numberOrNullToString, stringToNumber, stringToNumberOrNull, stringToNumberListed, dateTimeToDate } from "../../../utils/convert";
import MyLabeledInput from "../../UI/MyLabeledInput/MyLabeledInput";
import { AccountType, Car } from "../../../types/api";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import { ModelType, isAllowedChange } from "../../../utils/permissions";
import MyButton from "../../UI/MyButton/MyButton";
import { getDefaultCar } from "../../../utils/defaultObjects";

interface OneCarItemProps {
    method: SingleElemMethod,
    car?: Car | null,
}

const OneCarItem: React.FC<OneCarItemProps> = ({method, car}) => {
    // const cars = useTypedSelector(state => state.cars);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);

    const { createCar, updateCar, deleteCar } = useActions();

    let carInit = getDefaultCar(auxEntries);
    if (car) {
        carInit = car;
    }

    const [usedCar, setUsedCar] = useState(carInit);
    const navigate = useNavigate();


    if (!auxEntries.isReady && !auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    // const canWrite = [AccountType.ACCOUNT_TYPE_MANAGER, AccountType.ACCOUNT_TYPE_ADMIN].includes(accountInfo.accountType);
    const canWrite = isAllowedChange(ModelType.MODEL_TYPE_CAR, accountInfo.accountType);

    let carModels: SelectOption[] = [{ value: String(usedCar.car_model), caption: usedCar.car_model__name }];
    let engineModels: SelectOption[] = [{ value: String(usedCar.engine_model), caption: usedCar.engine_model__name }];
    let transmissionModels: SelectOption[] = [{ value: String(usedCar.transmission_model), caption: usedCar.transmission_model__name }];
    let mainBridgeModels: SelectOption[] = [{ value: String(usedCar.main_bridge_model), caption: usedCar.main_bridge_model__name }];
    let steerableBridgeModels: SelectOption[] = [{ value: String(usedCar.steerable_bridge_model), caption: usedCar.steerable_bridge_model__name }];
    let clients: SelectOption[] = [{ value: String(usedCar.client), caption: usedCar.client__name }];
    let serviceCompanies: SelectOption[] = [{ value: String(usedCar.service_company), caption: usedCar.service_company__name }];
    if (canWrite) {
        carModels = auxEntriesToSelectOptions(auxEntries.carModels, false);
        engineModels = auxEntriesToSelectOptions(auxEntries.engineModels, false);
        transmissionModels = auxEntriesToSelectOptions(auxEntries.transmissionModels, false);
        mainBridgeModels = auxEntriesToSelectOptions(auxEntries.mainBridgeModels, false);
        steerableBridgeModels = auxEntriesToSelectOptions(auxEntries.steerableBridgeModels, false);
        clients = clientsToSelectOptions(auxEntries.clients, false);
        serviceCompanies = serviceCompaniesToSelectOptions(auxEntries.serviceCompanies, false);
    }

    // console.log("clients = ", clients);
    // console.log("serviceCompanies = ", serviceCompanies);
    // console.log("auxEntries.serviceCompanies = ", auxEntries.serviceCompanies);
    // auxEntries.serviceCompanies

    console.log("usedCar = ", usedCar);

    const createCarAndRefresh = (car: Car) => {
        createCar(car);
        navigate("/cars");
    }

    const updateCarAndRefresh = (car: Car) => {
        updateCar(car);
        navigate("/cars");
    }

    const deleteCarAndRefresh = (car: Car) => {
        deleteCar(car);
        navigate("/cars");
    }

    console.log("method = ", method);

    return (
        // <div className={classes.page}>
        <div className={commonClasses.one_item_form_container}>
            <div className={commonClasses.one_item_form}>
                <h2>Машина</h2>
                <div className={classes.car_form}>
                    <MyLabeledSelect
                        id="one-car-form__car-model"
                        labelCaption="Модель техники"
                        value={numberOrNullToString(usedCar.car_model)}
                        // setValue={(value) => usedCar.car_model = stringToNumber(value)}
                        // setValue={(value) => setUsedCar({...usedCar, car_model: stringToNumber(value)})}
                        setValue={(value) => setUsedCar({...usedCar, car_model: stringToNumberListed(value, carModels)})}
                        options={carModels}
                        disabled={!canWrite}
                        // addContainerClassNames={[]}
                    />
                    <MyLabeledInput 
                        id="one-car-form__car-num"
                        type="text"
                        labelCaption="Номер машины" 
                        value={usedCar.car_num}
                        // setValue={(value) => usedCar.car_num = "value"} 
                        setValue={(value) => setUsedCar({...usedCar, car_num: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledSelect
                        id="one-car-form__engine-model"
                        labelCaption="Модель двигателя"
                        value={numberOrNullToString(usedCar.engine_model)}
                        // setValue={(value) => usedCar.engine_model = stringToNumber(value)}
                        // setValue={(value) => setUsedCar({...usedCar, engine_model: stringToNumber(value)})} 
                        setValue={(value) => setUsedCar({...usedCar, engine_model: stringToNumberListed(value, engineModels)})} 
                        options={engineModels}
                        disabled={!canWrite}
                        // addContainerClassNames={[]}
                    />
                    <MyLabeledInput 
                        id="one-car-form__engine_num"
                        type="text"
                        labelCaption="Номер двигателя" 
                        value={usedCar.engine_num}
                        // setValue={(value) => usedCar.engine_num = value} 
                        setValue={(value) => setUsedCar({...usedCar, engine_num: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledSelect
                        id="one-car-form__transmission-model"
                        labelCaption="Модель трансмиссии (производитель, артикул)"
                        value={numberOrNullToString(usedCar.transmission_model)}
                        // setValue={(value) => usedCar.transmission_model = stringToNumber(value)}
                        // setValue={(value) => setUsedCar({...usedCar, transmission_model: stringToNumber(value)})} 
                        setValue={(value) => setUsedCar({...usedCar, transmission_model: stringToNumberListed(value, transmissionModels)})} 
                        options={transmissionModels}
                        disabled={!canWrite}
                        // addContainerClassNames={[]}
                    />
                    <MyLabeledInput 
                        id="one-car-form__transmission-num"
                        type="text"
                        labelCaption="Номер трансмиссии" 
                        value={usedCar.transmission_num}
                        // setValue={(value) => usedCar.transmission_num = value} 
                        setValue={(value) => setUsedCar({...usedCar, transmission_num: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledSelect
                        id="one-car-form__main-bridge-model"
                        labelCaption="Модель ведущего моста"
                        value={numberOrNullToString(usedCar.main_bridge_model)}
                        // setValue={(value) => usedCar.main_bridge_model = stringToNumber(value)}
                        // setValue={(value) => setUsedCar({...usedCar, main_bridge_model: stringToNumber(value)})} 
                        setValue={(value) => setUsedCar({...usedCar, main_bridge_model: stringToNumberListed(value, mainBridgeModels)})} 
                        options={mainBridgeModels}
                        disabled={!canWrite}
                        // addContainerClassNames={[]}
                    />
                    <MyLabeledInput 
                        id="one-car-form__main-bridge-num"
                        type="text"
                        labelCaption="Номер ведущего моста" 
                        value={usedCar.main_bridge_num}
                        // setValue={(value) => usedCar.main_bridge_num = value} 
                        setValue={(value) => setUsedCar({...usedCar, main_bridge_num: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledSelect
                        id="one-car-form__steerable-bridge-model"
                        labelCaption="Модель управляемого моста"
                        value={numberOrNullToString(usedCar.steerable_bridge_model)}
                        // setValue={(value) => usedCar.steerable_bridge_model = stringToNumber(value)}
                        // setValue={(value) => setUsedCar({...usedCar, steerable_bridge_model: stringToNumber(value)})} 
                        setValue={(value) => setUsedCar({...usedCar, steerable_bridge_model: stringToNumberListed(value, steerableBridgeModels)})} 
                        options={steerableBridgeModels}
                        disabled={!canWrite}
                        // addContainerClassNames={[]}
                    />
                    <MyLabeledInput 
                        id="one-car-form__main-bridge-num"
                        type="text"
                        labelCaption="Номер управляемого моста" 
                        value={usedCar.steerable_bridge_num}
                        // setValue={(value) => usedCar.steerable_bridge_num = value} 
                        setValue={(value) => setUsedCar({...usedCar, steerable_bridge_num: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput 
                        id="one-car-form__main-supply-agreement"
                        type="text"
                        labelCaption="Договор поставки, №" 
                        value={usedCar.supply_agreement}
                        // setValue={(value) => usedCar.supply_agreement = value} 
                        setValue={(value) => setUsedCar({...usedCar, supply_agreement: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput 
                        id="one-car-form__main-factory-shipment-date"
                        type="date"
                        labelCaption="Дата отгрузки с завода"
                        value={dateTimeToDate(usedCar.factory_shipment_date)}
                        // setValue={(value) => usedCar.factory_shipment_date = value} 
                        setValue={(value) => setUsedCar({...usedCar, factory_shipment_date: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput 
                        id="one-car-form__main-consignee"
                        type="text"
                        labelCaption="Грузополучатель (конечный потребитель)" 
                        value={usedCar.consignee}
                        // setValue={(value) => usedCar.consignee = value} 
                        setValue={(value) => setUsedCar({...usedCar, consignee: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput 
                        id="one-car-form__main-shipment-address"
                        type="text"
                        labelCaption="Адрес поставки (эксплуатации)" 
                        value={usedCar.shipment_address}
                        // setValue={(value) => usedCar.shipment_address = value} 
                        setValue={(value) => setUsedCar({...usedCar, shipment_address: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput 
                        id="one-car-form__main-add-options"
                        type="text"
                        labelCaption="Комплектация (доп. опции)" 
                        value={usedCar.add_options}
                        // setValue={(value) => usedCar.add_options = value} 
                        setValue={(value) => setUsedCar({...usedCar, add_options: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledSelect
                        id="one-car-form__service-company"
                        labelCaption="Сервисная компания"
                        value={numberOrNullToString(usedCar.service_company)}
                        // setValue={(value) => usedCar.service_company = stringToNumber(value)}
                        // setValue={(value) => setUsedCar({...usedCar, service_company: stringToNumber(value)})} 
                        setValue={(value) => setUsedCar({...usedCar, service_company: stringToNumberListed(value, serviceCompanies)})} 
                        options={serviceCompanies}
                        disabled={!canWrite}
                        // addContainerClassNames={[]}
                    />
                    <MyLabeledSelect
                        id="one-car-form__client"
                        labelCaption="Клиент"
                        value={numberOrNullToString(usedCar.client)}
                        // setValue={(value) => usedCar.client = stringToNumber(value)}
                        // setValue={(value) => setUsedCar({...usedCar, client: stringToNumber(value)})} 
                        setValue={(value) => setUsedCar({...usedCar, client: stringToNumberListed(value, clients)})} 
                        options={clients}
                        disabled={!canWrite}
                        // addContainerClassNames={[]}
                    />
                </div>
                {
                    (method == SingleElemMethod.SINGLE_ELEM_METHOD_CREATE) && canWrite
                ?
                    // <button onClick={() => createCar(usedCar)}>Создать</button>
                    <MyButton onClick={() => createCarAndRefresh(usedCar)}>Создать</MyButton>
                :
                    null
                }
                {
                    (method == SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE) && canWrite
                ?
                    // <button onClick={() => createCar(usedCar)}>Создать</button>
                    <MyButton onClick={() => updateCarAndRefresh(usedCar)}>Обновить</MyButton>
                :
                    null
                }
                {
                    (method == SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE) && canWrite
                ?
                    // <button onClick={() => createCar(usedCar)}>Создать</button>
                    <MyButton onClick={() => deleteCarAndRefresh(usedCar)}>Удалить</MyButton>
                :
                    null
                }
            </div>
        </div>
    );
}

export default OneCarItem;