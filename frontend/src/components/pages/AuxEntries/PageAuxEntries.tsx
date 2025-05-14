import React, { ReactElement, useEffect } from "react";

import classes from "./PageAuxEntries.module.scss";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import Loader from "../../UI/Loader/Loader";
import { Link } from "react-router-dom";
import { getAuxEntriesCaption, getAuxEntriesLinkTable } from "../../../types/auxEntries";
import { AuxEntryType } from "../../../types/api";
import { JsxElement } from "typescript";

const PageAuxEntries: React.FC = () => {
    function getLinkForAuxEntry(type: AuxEntryType): ReactElement {
        return (
            <div>
                <Link to={getAuxEntriesLinkTable(type)}>{getAuxEntriesCaption(type)}</Link>
            </div>
        );
        
    }

    return (
        <div className={classes.aux_entries_container}>
            <div className={classes.aux_entries}>
                {getLinkForAuxEntry(AuxEntryType.AUX_ENTRY_TYPE_CAR_MODEL)}
                {getLinkForAuxEntry(AuxEntryType.AUX_ENTRY_TYPE_ENGINE_MODEL)}
                {getLinkForAuxEntry(AuxEntryType.AUX_ENTRY_TYPE_TRANSMISSION_MODEL)}
                {getLinkForAuxEntry(AuxEntryType.AUX_ENTRY_TYPE_MAIN_BRIDGE_MODEL)}
                {getLinkForAuxEntry(AuxEntryType.AUX_ENTRY_TYPE_STEERABLE_BRIDGE_MODEL)}
                {getLinkForAuxEntry(AuxEntryType.AUX_ENTRY_TYPE_MAINTENANCE_TYPE)}
                {getLinkForAuxEntry(AuxEntryType.AUX_ENTRY_TYPE_FAILURE_NODE)}
                {getLinkForAuxEntry(AuxEntryType.AUX_ENTRY_TYPE_RECOVERY_METHOD)}
            </div>
        </div>
    );
}

export default PageAuxEntries;