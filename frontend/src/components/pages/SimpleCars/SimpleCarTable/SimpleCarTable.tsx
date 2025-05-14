import React, { useEffect } from "react";

import classes from "./SimpleCarTable.module.scss";
// import commonClasses from "../../../styles/common.module.scss";
import commonClasses from "../../../../styles/common.module.scss";
import simpleCarItemClasses from "./SimpleCarItem/SimpleCarItem.module.scss";

import { Link } from "react-router-dom";
import MyLabeledInput from "../../../UI/MyLabeledInput/MyLabeledInput";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import Loader from "../../../UI/Loader/Loader";
// import SimpleCarItem from "./SimpleCarItem/1SimpleCarItem";
import { ChangeSortTypeProc, SortMethod, sortObjects } from "../../../../utils/sort";
import { SimpleCar } from "../../../../types/api";
import MyButton from "../../../UI/MyButton/MyButton";
import TableItem from "../../Common/TableItem";
import { simpleCarToPropValues } from "../../../../utils/convert";

const SimpleCarTable: React.FC = () => {
    const {car_num} = useTypedSelector(state => state.filterCar);
    const {setCarNum, fetchSimpleCars, sortSimpleCarChangeSortType} = useActions();
    const {sortElems} = useTypedSelector(state => state.sortSimpleCar)
    // const { items, loading } = useTypedSelector(state => state.simpleCars)
    const simpleCars = useTypedSelector(state => state.simpleCars)

    console.log("simpleCars = ", simpleCars);

    // console.log("items = ", items);
    // console.log("car_num = ", car_num);

    const propNames: string[] = ["car_model__name", "car_num", "engine_model__name", "engine_num", "transmission_model__name", "transmission_num",
        "main_bridge_model__name", "main_bridge_num", "steerable_bridge_model__name", "steerable_bridge_num", ];

    let sortedCars = sortObjects<SimpleCar>(simpleCars.items, sortElems, propNames);

    // if (loading) {
    //     return (
    //         <Loader/>
    //     );
    // }

    useEffect(() => {
        fetchSimpleCars();
        // fetchAccountInfo();
        // fetchAuxEntries();
        // fetchCars();
    }, []);

    if (simpleCars.loading ) {
        return (
            <Loader/>
        );
    }

    const changeSortTypeProc: ChangeSortTypeProc = (propName: string, sortMethod: SortMethod): void => {
        sortSimpleCarChangeSortType(propName, sortMethod);
    }

    return (
        <div>
            <div className={commonClasses.filter_form_container}>
                <div className={commonClasses.filter_form}>Проверьте комплектацию и технические характеристики техники Силант
                    <MyLabeledInput
                        id="filter-car-form__car-num"
                        type="text"
                        labelCaption="Номер:"
                        value={car_num}
                        setValue={(value) => setCarNum(value)}
                    />
                    <MyButton onClick={() => fetchSimpleCars()}>Искать</MyButton>
                </div>
            </div>
            {/* <div className={classes.car_table}>
                <SimpleCarItem  
                    index={-1}
                    id={-1} 
                    car_model__name={"Модель техники"} 
                    car_num={"Зав. № машины"}
                    engine_model__name={"Модель двигателя"}
                    engine_num={"Зав. № двигателя"}
                    transmission_model__name={"Модель трансмиссии (производитель, артикул)"}
                    transmission_num={"Зав. № трансмиссии"}
                    main_bridge_model__name={"Модель ведущего моста"} 
                    main_bridge_num={"Зав. № ведущего моста"} 
                    steerable_bridge_model__name={"Модель управляемого моста"} 
                    steerable_bridge_num={"Зав. № управляемого моста"}
                    sortElements={sortElems}
                    changeSortTypeProc={changeSortTypeProc}
                />
                {sortedCars.map((item, index) => 
                    <SimpleCarItem key={item.id} {...item} index={index} id={item.id} />
                )}
            </div> */}
            <div className={commonClasses.one_item_form_container}>Информация о комплектации и технических характеристиках Вашей техники
            </div>
            <div className={commonClasses.table_container}>
                <div className={commonClasses.table}>
                    <TableItem  
                        index={-1} 
                        id={-1} 
                        propValues={{
                            car_model__name: "Модель техники",
                            car_num: "Зав. № машины",
                            engine_model__name: "Модель двигателя",
                            engine_num: "Зав. № двигателя",
                            transmission_model__name: "Модель трансмиссии (производитель, артикул)",
                            transmission_num: "Зав. № трансмиссии",
                            main_bridge_model__name: "Модель ведущего моста",
                            main_bridge_num: "Зав. № ведущего моста",
                            steerable_bridge_model__name: "Модель управляемого моста",
                            steerable_bridge_num: "Зав. № управляемого моста",
                        }}
                        classes={simpleCarItemClasses}
                        basePath={"/simple_cars"}
                        sortElements={sortElems}
                        changeSortTypeProc={changeSortTypeProc}
                    />
                    {sortedCars.map((item, index) => 
                        <TableItem key={item.id} {...item} index={index} id={item.id} propValues={simpleCarToPropValues(item)} 
                            classes={simpleCarItemClasses} basePath={"/simple_cars"} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SimpleCarTable;
