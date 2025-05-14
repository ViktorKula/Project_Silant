import React, { useEffect, useState } from "react";

import classes from "./OneAuxEntryItem.module.scss";
import commonClasses from "../../../styles/common.module.scss";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useNavigate, useParams } from "react-router";
import Loader from "../../UI/Loader/Loader";
import MyLabeledInput from "../../UI/MyLabeledInput/MyLabeledInput";
import { AccountType, AuxEntry, AuxEntryType, defaultAuxEntry } from "../../../types/api";
import { useActions } from "../../../hooks/useActions";
import { SingleElemMethod } from "../../../types/common";
import { ModelType, isAllowedChange } from "../../../utils/permissions";
import { getAuxEntriesCaption, getAuxEntriesLinkTable } from "../../../types/auxEntries";
import MyButton from "../../UI/MyButton/MyButton";

interface OneAuxEntryItemProps {
    method: SingleElemMethod,
    type: AuxEntryType,
    auxEntry?: AuxEntry | null,
}

const OneAuxEntryItem: React.FC<OneAuxEntryItemProps> = ({method, type, auxEntry}) => {
    const accountInfo = useTypedSelector(state => state.accountInfo);
    const auxEntries = useTypedSelector(state => state.auxEntries);

    const { createAuxEntry, updateAuxEntry, deleteAuxEntry, resetAuxEntries } = useActions();

    let auxEntryInit = defaultAuxEntry;
    if (auxEntry) {
        auxEntryInit = auxEntry;
    }

    const [usedAuxEntry, setUsedAuxEntry] = useState(auxEntryInit);
    const navigate = useNavigate();

    if (!auxEntries.isReady && !auxEntries.loading) {
        return (
            <Loader/>
        );
    }

    const canWrite = isAllowedChange(ModelType.MODEL_TYPE_AUX_ENTRY, accountInfo.accountType);

    console.log("usedAuxEntry = ", usedAuxEntry);

    const createAuxEntryAndRefresh = (auxEntry: AuxEntry) => {
        resetAuxEntries();
        createAuxEntry({type: type, value: auxEntry});
        navigate(`${getAuxEntriesLinkTable(type)}`);
    }

    const updateAuxEntryAndRefresh = (auxEntry: AuxEntry) => {
        resetAuxEntries();
        updateAuxEntry({type: type, value: auxEntry});
        navigate(`${getAuxEntriesLinkTable(type)}`);
    }

    const deleteAuxEntryAndRefresh = (auxEntry: AuxEntry) => {
        resetAuxEntries();
        deleteAuxEntry({type: type, value: auxEntry});
        navigate(`${getAuxEntriesLinkTable(type)}`);
    }

    console.log("method = ", method);

    return (
        <div className={commonClasses.one_item_form_container}>
            <div className={commonClasses.one_item_form}>
                <h2>Запись - {getAuxEntriesCaption(type)}</h2>
                <div className={classes.aux_entry_form}>
                    <MyLabeledInput 
                        id="one-aux-entry-form__name"
                        type="text"
                        labelCaption="Название" 
                        value={usedAuxEntry.name}
                        setValue={(value) => setUsedAuxEntry({...usedAuxEntry, name: value})} 
                        disabled={!canWrite}
                    />
                    <MyLabeledInput 
                        id="one-aux-entry-form__description"
                        type="text"
                        labelCaption="Описание" 
                        value={usedAuxEntry.description}
                        setValue={(value) => setUsedAuxEntry({...usedAuxEntry, description: value})} 
                        disabled={!canWrite}
                    />
                </div>
                {
                    (method == SingleElemMethod.SINGLE_ELEM_METHOD_CREATE) && canWrite
                ?
                    <MyButton onClick={() => createAuxEntryAndRefresh(usedAuxEntry)}>Создать</MyButton>
                :
                    null
                }
                {
                    (method == SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE) && canWrite
                ?
                    <MyButton onClick={() => updateAuxEntryAndRefresh(usedAuxEntry)}>Обновить</MyButton>
                :
                    null
                }
                {
                    (method == SingleElemMethod.SINGLE_ELEM_METHOD_UPDATE) && canWrite
                ?
                    <MyButton onClick={() => deleteAuxEntryAndRefresh(usedAuxEntry)}>Удалить</MyButton>
                :
                    null
                }
            </div>
        </div>
    );
}

export default OneAuxEntryItem;