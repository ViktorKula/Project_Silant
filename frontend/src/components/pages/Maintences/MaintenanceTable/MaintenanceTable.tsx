import React, { useEffect } from "react";

// import classes from "./MaintenanceTable.module.scss";
// import commonClasses from "../../../styles/common.module.scss";
import commonClasses from "../../../../styles/common.module.scss";
import maintenanceItemClasses from "./MaintenanceItem/MaintenanceItem.module.scss";

import { Link } from "react-router-dom";
// import MaintenanceItem from "./MaintenanceItem/1MaintenanceItem";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import Loader from "../../../UI/Loader/Loader";
import { ChangeSortTypeProc, SortMethod, sortObjects } from "../../../../utils/sort";
import { Maintenance } from "../../../../types/api";
import { AuxEntriesToSelectOptions } from "../../../../utils/ui";
import MyLabeledInput from "../../../UI/MyLabeledInput/MyLabeledInput";
import { ModelType, isAllowedChange } from "../../../../utils/permissions";
import MyLabeledSelect from "../../../UI/MyLabeledSelect/MyLabeledSelect";
import { dateTimeToDate, maintenanceToPropValues, numberOrNullToString, stringToNumberOrNull } from "../../../../utils/convert";
import MyButton from "../../../UI/MyButton/MyButton";
import TableItem from "../../Common/TableItem";

const MaintenanceTable: React.FC = () => {
   
    const {car_num, service_company__name, type} = useTypedSelector(state => state.filterMaintenance);
    const {setMCarNum, setMServiceCompanyName, setMType, fetchAccountInfo, fetchAuxEntries, fetchMaintenances, sortMaintenanceChangeSortType} = useActions();
    const {sortElems} = useTypedSelector(state => state.sortMaintenance)
    const accountInfo = useTypedSelector(state => state.accountInfo)
    const maintenances = useTypedSelector(state => state.maintenances)
    const auxEntries = useTypedSelector(state => state.auxEntries)    

    const fullRefreshMaintenances = () => {
        // fetchAccountInfo();
        fetchAuxEntries();
        fetchMaintenances();
    }

    useEffect(() => {
        fullRefreshMaintenances();
        // fetchAccountInfo();
        // fetchAuxEntries();
        // fetchMaintenances();
    }, []);

    const propNames: string[] = ["car__num", "type__name", "maintenance_date", 
        "operating_time", "work_order_num",  "work_order_date", "service_company__name",];

    let sortedMaintenances = sortObjects<Maintenance>(maintenances.items, sortElems, propNames);

    if (accountInfo.loading || maintenances.loading || auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    const maintenanceTypes = AuxEntriesToSelectOptions(auxEntries.maintenanceTypes, true);

    // console.log(auxEntries);
    // console.log(carModels);

    const changeSortTypeProc: ChangeSortTypeProc = (propName: string, sortMethod: SortMethod): void => {
        sortMaintenanceChangeSortType(propName, sortMethod);
    }

    const canAddNew = isAllowedChange(ModelType.MODEL_TYPE_MAINTENANCE, accountInfo.accountType);

    return (
        <div>
            <div className={commonClasses.filter_form_container}>
                <div className={commonClasses.filter_form}>
                    <MyLabeledInput 
                        id="filter-maintenance-form__car-num"
                        type="text"
                        labelCaption="Номер машины" 
                        value={car_num}
                        setValue={(value) => setMCarNum(value)} 
                    />
                    <MyLabeledInput 
                        id="filter-maintenance-form__service-company-name"
                        type="text"
                        labelCaption="Сервисная компания" 
                        value={service_company__name}
                        setValue={(value) => setMServiceCompanyName(value)} 
                    />
                    <MyLabeledSelect
                        id="filter-maintenance-form__maintenance-type"
                        labelCaption="Вид ТО"
                        value={numberOrNullToString(type)}
                        setValue={(value) => setMType(stringToNumberOrNull(value))}
                        options={maintenanceTypes}
                        // addContainerClassNames={[]}
                    />
                    <MyButton onClick={() => fullRefreshMaintenances()}>Искать</MyButton>
                </div>
            </div>
            <div className={commonClasses.table_container}>
                <div className={commonClasses.table}>
                    <TableItem  
                        index={-1} 
                        id={-1} 
                        propValues={{
                            car__num: "Зав. № машины",
                            type__name: "Вид ТО",
                            maintenance_date: "Дата проведения ТО",
                            operating_time_s: "Наработка, м/час",
                            work_order_num: "№ заказ-наряда",
                            work_order_date: "дата заказ-наряда",
                            service_company__name: "Организация, проводившая ТО",
                        }}
                        classes={maintenanceItemClasses}
                        basePath={"/maintenances"}
                        sortElements={sortElems}
                        changeSortTypeProc={changeSortTypeProc}
                    />
                    {sortedMaintenances.map((item, index) => 
                        <TableItem key={item.id} {...item} index={index} id={item.id} propValues={maintenanceToPropValues(item)} 
                            classes={maintenanceItemClasses} basePath={"/maintenances"} />
                    )}
                </div>
            </div>
            <div className={commonClasses.add_new_container}>
                {
                    canAddNew 
                ? 
                    <Link to={`/maintenances/new`}>
                        <MyButton addClassNames={[commonClasses.add_new]}>Новое ТО</MyButton>
                    </Link>
                :
                    null
                }
            </div>
        </div>
    );
}

export default MaintenanceTable;