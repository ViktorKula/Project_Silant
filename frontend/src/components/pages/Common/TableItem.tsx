import React, { ReactElement } from "react";

// import classes from "./CarItem.module.scss";
import commonClasses from "../../../styles/common.module.scss";
import { Link } from "react-router-dom";
import { ChangeSortTypeProc, SortElement, SortMethod, getSortMethod } from "../../../utils/sort";
import SortButton from "../../UI/SortButton/SortButton";
import { PropRecord } from "../../../utils/tables";
import { makeClassName } from "../../../utils/classes";

interface CarItemProps {
    index: number;
    id: number;
    propValues: PropRecord;
    classes: Record<string, string>;
    basePath: string;

    sortElements?: SortElement[],
    changeSortTypeProc?: ChangeSortTypeProc,
}

const TableItem: React.FC<CarItemProps> = ({index, id, propValues, classes, basePath,
    sortElements, changeSortTypeProc,
}) => {

    const isHeader = (index == -1);

    const getSortButton = (propName: string): ReactElement => {
        if (isHeader && sortElements && changeSortTypeProc) {
            const value = getSortMethod(sortElements, propName);
            const setValue = (value: SortMethod): void => {
                changeSortTypeProc(propName, value);
            }
            
            return (
                <SortButton value={value} setValue={(value) => setValue(value)}/>
            ); 

        } else {
            return <></>
        }

    }

    const getCellClassName = (propName: string): string => {
        let res = "";
        
        if (isHeader) {
            res = commonClasses.header;
        } else {
            res = commonClasses.cell;
        }


        if (propName=="") {
            res = makeClassName(res, [classes["id"]]);
        } else {
            res = makeClassName(res, [classes[propName]]);
        }

        return res;
    }

    const getElem = (propName: string, id: number): ReactElement => {
       
        return (
            <div key={propName} className={getCellClassName(propName)}>
                {/* {propValues[propName]} {getSortButton(propName)} */}
                {/* <Link to={`${basePath}/${id}`}>
                    {propValues[propName]} 
                </Link> */}
                {
                    !isHeader 
                ?
                    <Link to={`${basePath}/${id}`}>
                        {propValues[propName]}
                    </Link>
                :
                    propValues[propName]
                }
                {getSortButton(propName)}
            </div>
        );
    }

    // const getElem = (propName: string): ReactElement => {
       
    //     return (
    //         <div key={propName} className={getCellClassName(propName)}>
    //             {/* {propValues[propName]} {getSortButton(propName)} */}
    //             <Link to={`${basePath}/${id}`}>
    //                 {propValues[propName]} 
    //             </Link>
    //             {getSortButton(propName)}
    //         </div>
    //     );
    // }

    const propNames = Object.entries(propValues).map((item => item[0]));

    return (
        <div className={commonClasses.item}>
            <div className={getCellClassName("")}>
                {
                    !isHeader 
                ?
                    <Link to={`${basePath}/${id}`}>
                        {index + 1}
                    </Link>
                :
                    "#"
                }
            </div>
            {propNames.map(item => getElem(item, id))}
            {/* {propNames.map(item => <Link to={`${basePath}/${id}`}>{getElem(item)}</Link>)} */}
        </div>
    );
}

export default TableItem;