import React, { useEffect, useState } from "react";

import classes from "./OneReclamationItem.module.scss";
import commonClasses from "../../../styles/common.module.scss";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useNavigate, useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";
import { AuxEntriesToSelectOptions as auxEntriesToSelectOptions, carsToSelectOptions, clientsToSelectOptions, serviceCompaniesToSelectOptions } from "../../../utils/ui";
import MyLabeledSelect, { SelectOption } from "../../UI/MyLabeledSelect/MyLabeledSelect";
import { numberOrNullToString, stringToNumber, stringToNumberOrNull, stringToNumberListed, dateTimeToDate } from "../../../utils/convert";
import MyLabeledInput from "../../UI/MyLabeledInput/MyLabeledInput";
import { Reclamation } from "../../../types/api";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import { ModelType, isAllowedChange } from "../../../utils/permissions";
import MyButton from "../../UI/MyButton/MyButton";
import { getDefaultReclamation } from "../../../utils/defaultObjects";

interface OneReclamationItemProps {
    method: SingleElemMethod,
    reclamation?: Reclamation | null,
}

const OneReclamationItem: React.FC<OneReclamationItemProps> = ({method, reclamation}) => {
    const carsState = useTypedSelector(state => state.cars);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);

    const { createReclamation, updateReclamation, deleteReclamation } = useActions();

    let reclamationInit = getDefaultReclamation(auxEntries, carsState);
    if (reclamation) {
        reclamationInit = reclamation;
    }

    const [usedReclamation, setUsedReclamation] = useState(reclamationInit);
    const navigate = useNavigate();

    // if (!auxEntries.isReady && !auxEntries.loading &&  !carList.ready && !carList.loading) {
    if (!auxEntries.isReady || auxEntries.loading || !carsState.ready || carsState.loading) {
        return (
            <Loader/>
        );
    }

    // const canWrite = [AccountType.ACCOUNT_TYPE_MANAGER, AccountType.ACCOUNT_TYPE_ADMIN].includes(accountInfo.accountType);
    const canWrite = isAllowedChange(ModelType.MODEL_TYPE_RECLAMATION, accountInfo.accountType);

    let cars: SelectOption[] = [{ value: String(usedReclamation.car), caption: usedReclamation.car__num }];
    let failureNodes: SelectOption[] = [{ value: String(usedReclamation.failure_node), caption: usedReclamation.failure_node__name }];
    let recovery_methods: SelectOption[] = [{ value: String(usedReclamation.recovery_method), caption: usedReclamation.recovery_method__name }];
    // let serviceCompanies: SelectOption[] = [{ value: String(usedReclamation.service_company), caption: usedReclamation.service_company__name }];
    if (canWrite) {
        cars = carsToSelectOptions(carsState.items, false).sort((a, b) => a.caption.localeCompare(b.caption));
        failureNodes = auxEntriesToSelectOptions(auxEntries.failureNodes, false);
        recovery_methods = auxEntriesToSelectOptions(auxEntries.recoveryMethods, false);
        // serviceCompanies.unshift({ value: String(-1), caption: "Самостоятельно"});
    }

    // console.log("cars = ", cars)

    console.log("usedReclamation = ", usedReclamation);

    const createMaintenanceAndRefresh = (reclamation: Reclamation) => {
        createReclamation(reclamation);
        navigate("/reclamations");
    }

    const updateMaintenanceAndRefresh = (reclamation: Reclamation) => {
        updateReclamation(reclamation);
        navigate("/reclamations");
    }

    const deleteMaintenanceAndRefresh = (reclamation: Reclamation) => {
        deleteReclamation(reclamation);
        navigate("/reclamations");
    }

    // console.log("method = ", method);

    return (
        <div className={commonClasses.one_item_form_container}>
            <div className={commonClasses.one_item_form}>
                <h2>Рекламация</h2>
                <div className={classes.reclamation_form}>
                    <MyLabeledSelect
                        id="one-reclamation-form__car"
                        labelCaption="Зав. № машины"
                        value={numberOrNullToString(usedReclamation.car)}
                        setValue={(value) => setUsedReclamation({...usedReclamation, car: stringToNumberListed(value, cars)})}
                        options={cars}
                        disabled={!canWrite}
                        // addContainerClassNames={[]}
                    />
                    {/* <MyLabeledInput 
                        id="one-reclamation-form__car__service_company__name"
                        type="text"
                        labelCaption="Организация, проводившая ремонт"
                        value={usedReclamation.car__service_company__name}
                        // setValue={(value) => setUsedReclamation({...usedReclamation, maintenance_date: value})} 
                        disabled={true}
                    />  */}
                    <MyLabeledInput 
                        id="one-reclamation-form__failure_date"
                        type="date"
                        labelCaption="Дата отказа"
                        value={dateTimeToDate(usedReclamation.failure_date)}
                        setValue={(value) => setUsedReclamation({...usedReclamation, failure_date: value})} 
                        disabled={!canWrite}
                    /> 
                    <MyLabeledInput 
                        id="one-reclamation-form__operating-time"
                        type="text"
                        labelCaption="Наработка, м/час"
                        value={usedReclamation.operating_time}
                        setValue={(value) => setUsedReclamation({...usedReclamation, operating_time: stringToNumber(value)})} 
                        disabled={!canWrite}
                    /> 
                    <MyLabeledSelect
                        id="one-reclamation-form__failure-node"
                        labelCaption="Узел отказа"
                        value={numberOrNullToString(usedReclamation.failure_node)}
                        setValue={(value) => setUsedReclamation({...usedReclamation, failure_node: stringToNumberListed(value, failureNodes)})}
                        options={failureNodes}
                        disabled={!canWrite}
                        // addContainerClassNames={[]}
                    />
                    <MyLabeledInput 
                        id="one-reclamation-form__failure_description"
                        type="text"
                        labelCaption="Описание отказа"
                        value={usedReclamation.failure_description}
                        setValue={(value) => setUsedReclamation({...usedReclamation, failure_description: value})} 
                        disabled={!canWrite}
                    /> 
                    <MyLabeledSelect
                        id="one-reclamation-form__recovery-method"
                        labelCaption="Способ восстановления"
                        value={numberOrNullToString(usedReclamation.recovery_method)}
                        setValue={(value) => setUsedReclamation({...usedReclamation, recovery_method: stringToNumberListed(value, recovery_methods)})}
                        options={recovery_methods}
                        disabled={!canWrite}
                        // addContainerClassNames={[]}
                    />
                    <MyLabeledInput 
                        id="one-reclamation-form__recovery-parts"
                        type="text"
                        labelCaption="Используемые запасные части"
                        value={usedReclamation.repair_parts}
                        setValue={(value) => setUsedReclamation({...usedReclamation, repair_parts: value})} 
                        disabled={!canWrite}
                    /> 
                    <MyLabeledInput 
                        id="one-reclamation-form__recovery_date"
                        type="date"
                        labelCaption="Дата восстановления"
                        value={dateTimeToDate(usedReclamation.recovery_date)}
                        setValue={(value) => setUsedReclamation({...usedReclamation, recovery_date: value})} 
                        disabled={!canWrite}
                    /> 
                </div>
                {
                    (method == SingleElemMethod.SINGLE_ELEM_METHOD_CREATE) && canWrite
                ?
                    // <button onClick={() => createCar(usedCar)}>Создать</button>
                    <MyButton onClick={() => createMaintenanceAndRefresh(usedReclamation)}>Создать</MyButton>
                :
                    null
                }
                {
                    (method == SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE) && canWrite
                ?
                    // <button onClick={() => createCar(usedCar)}>Создать</button>
                    <MyButton onClick={() => updateMaintenanceAndRefresh(usedReclamation)}>Обновить</MyButton>
                :
                    null
                }
                {
                    (method == SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE) && canWrite
                ?
                    // <button onClick={() => createCar(usedCar)}>Создать</button>
                    <MyButton onClick={() => deleteMaintenanceAndRefresh(usedReclamation)}>Удалить</MyButton>
                :
                    null
                }
            </div>
        </div>
    );
}

export default OneReclamationItem;