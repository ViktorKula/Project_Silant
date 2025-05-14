import React, { useEffect, useState } from "react";

import classes from "./OneMaintenanceItem.module.scss";
import commonClasses from "../../../styles/common.module.scss";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useNavigate, useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";
import { AuxEntriesToSelectOptions as auxEntriesToSelectOptions, carsToSelectOptions, clientsToSelectOptions, serviceCompaniesToSelectOptions } from "../../../utils/ui";
import MyLabeledSelect, { SelectOption } from "../../UI/MyLabeledSelect/MyLabeledSelect";
import { numberOrNullToString, stringToNumber, stringToNumberOrNull, stringToNumberListed, dateTimeToDate } from "../../../utils/convert";
import MyLabeledInput from "../../UI/MyLabeledInput/MyLabeledInput";
import { Maintenance } from "../../../types/api";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import { ModelType, isAllowedChange } from "../../../utils/permissions";
import MyButton from "../../UI/MyButton/MyButton";
import { getDefaultMaintenance } from "../../../utils/defaultObjects";

interface OneMaintenanceItemProps {
    method: SingleElemMethod,
    maintenance?: Maintenance | null,
}

const OneMaintenanceItem: React.FC<OneMaintenanceItemProps> = ({method, maintenance}) => {
    const carsState = useTypedSelector(state => state.cars);
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);

    const { createMaintenance, updateMaintenance, deleteMaintenance } = useActions();

    let maintenanceInit = getDefaultMaintenance(auxEntries, carsState);
    if (maintenance) {
        maintenanceInit = maintenance;
    }

    const [usedMaintenance, setUsedMaintenance] = useState(maintenanceInit);
    const navigate = useNavigate();

    if (!auxEntries.isReady || auxEntries.loading || !carsState.ready || carsState.loading) {
        return (
            <Loader/>
        );
    }

    const canWrite = isAllowedChange(ModelType.MODEL_TYPE_MAINTENANCE, accountInfo.accountType);

    let cars: SelectOption[] = [{ value: String(usedMaintenance.car), caption: usedMaintenance.car__num }];
    let types: SelectOption[] = [{ value: String(usedMaintenance.type), caption: usedMaintenance.type__name }];
    let serviceCompanies: SelectOption[] = [{ value: String(usedMaintenance.service_company), caption: usedMaintenance.service_company__name }];
    if (canWrite) {
        cars = carsToSelectOptions(carsState.items, false).sort((a, b) => a.caption.localeCompare(b.caption));
        types = auxEntriesToSelectOptions(auxEntries.maintenanceTypes, false);
        serviceCompanies = serviceCompaniesToSelectOptions(auxEntries.serviceCompanies, false);
        serviceCompanies.unshift({ value: String(-1), caption: "Самостоятельно"});
    }

    console.log("usedMaintenance = ", usedMaintenance);

    const createMaintenanceAndRefresh = (maintenance: Maintenance) => {
        createMaintenance(maintenance);
        navigate("/maintenances");
    }

    const updateMaintenanceAndRefresh = (maintenance: Maintenance) => {
        updateMaintenance(maintenance);
        navigate("/maintenances");
    }

    const deleteMaintenanceAndRefresh = (maintenance: Maintenance) => {
        deleteMaintenance(maintenance);
        navigate("/maintenances");
    }

    return (
        <div className={commonClasses.one_item_form_container}>
            <div className={commonClasses.one_item_form}>
                <h2>ТО</h2>
                <div className={classes.maintenance_form}>
                    <MyLabeledSelect
                        id="one-maintenance-form__car"
                        labelCaption="Зав. № машины"
                        value={numberOrNullToString(usedMaintenance.car)}
                        setValue={(value) => setUsedMaintenance({...usedMaintenance, car: stringToNumberListed(value, cars)})}
                        options={cars}
                        disabled={!canWrite}
                        // addContainerClassNames={[]}
                    />
                    <MyLabeledSelect
                        id="one-maintenance-form__type"
                        labelCaption="Вид ТО"
                        value={numberOrNullToString(usedMaintenance.type)}
                        setValue={(value) => setUsedMaintenance({...usedMaintenance, type: stringToNumberListed(value, types)})}
                        options={types}
                        disabled={!canWrite}
                        // addContainerClassNames={[]}
                    />
                    <MyLabeledInput 
                        id="one-maintenance-form__main-maintenance-date"
                        type="date"
                        labelCaption="Дата проведения ТО"
                        value={dateTimeToDate(usedMaintenance.maintenance_date)}
                        setValue={(value) => setUsedMaintenance({...usedMaintenance, maintenance_date: value})} 
                        disabled={!canWrite}
                    /> 
                    <MyLabeledInput 
                        id="one-maintenance-form__main-operating-time"
                        type="text"
                        labelCaption="Наработка, м/час"
                        value={usedMaintenance.operating_time}
                        setValue={(value) => setUsedMaintenance({...usedMaintenance, operating_time: stringToNumber(value)})} 
                        disabled={!canWrite}
                    /> 
                    <MyLabeledInput 
                        id="one-maintenance-form__work-order-num"
                        type="text"
                        labelCaption="№ заказ-наряда" 
                        value={usedMaintenance.work_order_num}
                        setValue={(value) => setUsedMaintenance({...usedMaintenance, work_order_num: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput 
                        id="one-maintenance-form__main-work-order-date"
                        type="date"
                        labelCaption="дата заказ-наряда"
                        value={dateTimeToDate(usedMaintenance.work_order_date)}
                        setValue={(value) => setUsedMaintenance({...usedMaintenance, work_order_date: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledSelect
                        id="one-maintenance-form__service-company"
                        labelCaption="Организация, проводившая ТО"
                        value={numberOrNullToString(usedMaintenance.service_company)}
                        setValue={(value) => setUsedMaintenance({...usedMaintenance, service_company: stringToNumberListed(value, serviceCompanies)})} 
                        options={serviceCompanies}
                        disabled={!canWrite}
                    />
                </div>
                {
                    (method == SingleElemMethod.SINGLE_ELEM_METHOD_CREATE) && canWrite
                ?
                    // <button onClick={() => createCar(usedCar)}>Создать</button>
                    <MyButton onClick={() => createMaintenanceAndRefresh(usedMaintenance)}>Создать</MyButton>
                :
                    null
                }
                {
                    (method == SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE) && canWrite
                ?
                    // <button onClick={() => createCar(usedCar)}>Создать</button>
                    <MyButton onClick={() => updateMaintenanceAndRefresh(usedMaintenance)}>Обновить</MyButton>
                :
                    null
                }
                {
                    (method == SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE) && canWrite
                ?
                    // <button onClick={() => createCar(usedCar)}>Создать</button>
                    <MyButton onClick={() => deleteMaintenanceAndRefresh(usedMaintenance)}>Удалить</MyButton>
                :
                    null
                }
            </div>
        </div>
    );
}

export default OneMaintenanceItem;