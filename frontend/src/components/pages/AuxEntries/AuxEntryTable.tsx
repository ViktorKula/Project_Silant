import React, { useEffect } from "react";

// import classes from "./AuxEntryTable.module.scss";
// import commonClasses from "../../../styles/common.module.scss";
// import commonClasses from "../../../../../styles/common.module.scss";
import commonClasses from "../../../styles/common.module.scss";
import auxEntryItemClasses from "./AuxEntryItem/AuxEntryItem.module.scss";

import { Link } from "react-router-dom";
import { AuxEntry, AuxEntryType } from "../../../types/api";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import Loader from "../../UI/Loader/Loader";
import { ModelType, isAllowedChange } from "../../../utils/permissions";
import { ChangeSortTypeProc, SortMethod } from "../../../utils/sort";
// import AuxEntryItem from "./AuxEntryItem/1AuxEntryItem";
import { getAuxEntriesLinkTable, getAuxEntriesListByType } from "../../../types/auxEntries";
import MyButton from "../../UI/MyButton/MyButton";
import TableItem from "../Common/TableItem";
import { auxEntryToPropValues } from "../../../utils/convert";

interface AuxEntryProps {
    type: AuxEntryType;
}

const AuxEntryTable: React.FC<AuxEntryProps> = ({type}) => {

    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);
    const { fetchAccountInfo, fetchAuxEntries } = useActions();

    const fullRefreshAuxEntries = () => {
        // fetchAccountInfo();
        fetchAuxEntries();
    }

    useEffect(() => {
        if (!auxEntries.isReady) {
            fullRefreshAuxEntries();
        }
        // fetchAccountInfo()
        // fetchAuxEntries();
    }, [auxEntries.isReady]);

    // if (auxEntries.loading || accountInfo.loading) {
    if (auxEntries.loading || !auxEntries.isReady) {
        return (
            <Loader/>
        );
    }

    const usedAuxEntries = getAuxEntriesListByType(type, auxEntries);

    console.log("usedAuxEntries=", usedAuxEntries);

    // const changeSortTypeProc: ChangeSortTypeProc = (propName: string, sortMethod: SortMethod): void => {
    //     // sortCarChangeSortType(propName, sortMethod);
    // }

    const canAddNew = isAllowedChange(ModelType.MODEL_TYPE_AUX_ENTRY, accountInfo.accountType);

    return (
        <div>
            <div className={commonClasses.table_container}>
                <div className={commonClasses.table}>
                    <TableItem  
                        index={-1}
                        id={-1} 
                        propValues={{
                            name: "Название",
                            description: "Описание",
                        }}
                        classes={auxEntryItemClasses}
                        basePath={`${getAuxEntriesLinkTable(type)}`}
                        // sortElements={sortElems}
                        // changeSortTypeProc={changeSortTypeProc}
                    />
                    {usedAuxEntries.map((item, index) => 
                        <TableItem key={item.id} {...item} index={index} id={item.id} propValues={auxEntryToPropValues(item)} 
                            classes={auxEntryItemClasses} basePath={`${getAuxEntriesLinkTable(type)}`} />
                    )}
                </div>
            </div>
            <div className={commonClasses.add_new_container}>
                {
                    canAddNew 
                ? 
                    <Link to={`${getAuxEntriesLinkTable(type)}/new`}>
                        <MyButton addClassNames={[commonClasses.add_new]}>Новая запись</MyButton>
                    </Link>
                :
                    null
                }
            </div>
        </div>
    );
}

export default AuxEntryTable;