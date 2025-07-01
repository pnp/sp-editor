import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../../store";
import { ComboBox, Dropdown, PrimaryButton, TextField, Text, DefaultButton } from "@fluentui/react";
import { ODataQueryBuilder } from "mgwdev-m365-helpers/lib/utils/queryBuilders/ODataQueryBuilder";
import { CamlQueryBuilder } from "mgwdev-m365-helpers/lib/utils/queryBuilders/CamlQueryBuilder";
import * as actions from "../../../store/queryBuilder/actions";
import { runRestCall } from "../../spshooter/chrome/chrome-actions";
import { setBody, setMethod, setPath } from "../../../store/spshoot/actions";
import { useNavigate } from "react-router";


const oDatacomparers = ['BeginsWith'
    , 'Contains'
    , 'Eq'
    , 'IDEq'
    , 'Geq'
    , 'Gt'
    , 'IsNotNull'
    , 'IsNull'
    , 'Leq'
    , 'Lt'
    , 'Neq']
export default function SPQueryBuilder() {
    const { listFields, configuredQueryFields, selectedListId, context } = useSelector((state: IRootState) => state.queryBuilder);
    const [query, setQuery] = useState("");
    const [camlQuery, setCamlQuery] = useState("");
    const [newFilterVisible, setNewFilterVisible] = useState(true);
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const buildQuery = () => {
        const oDataQueryBuilder = new ODataQueryBuilder();
        const camlQueryBuilder = new CamlQueryBuilder();
        configuredQueryFields.forEach(queryFld => {

            setQuery(oDataQueryBuilder.withFieldQuery({
                name: queryFld.name,
                value: queryFld.value,
                type: listFields.find(fld => fld.InternalName === queryFld.name)?.TypeAsString || "",
                //@ts-ignore
                comparer: queryFld.comparer
            }).build());
            setCamlQuery(camlQueryBuilder.withFieldQuery({
                name: queryFld.name,
                value: queryFld.value,
                type: listFields.find(fld => fld.InternalName === queryFld.name)?.TypeAsString || "",
                //@ts-ignore
                comparer: queryFld.comparer
            }).build())
        })
    }
    useEffect(() => {
        buildQuery();
    }, [configuredQueryFields])

    if (!selectedListId) {
        return <Text>Please select a list from the menu on the left</Text>
    }
    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        marginTop: "5px"
    }}>
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        }}>
            {configuredQueryFields.map((fld, index) => <FieldQueryBuilder
                index={index}
                selectedField={fld.name}
                selectedComparer={fld.comparer}
                value={fld.value}
                key={index}
            />)}
            {newFilterVisible && <FieldQueryBuilder
                index={configuredQueryFields.length}
                key={configuredQueryFields.length}
            />}
        </div>
        <div>
            <div style={{
                display: "flex",
                gap: "5px",
                alignItems: "flex-end"
            }}><TextField label={"Caml Query"} value={camlQuery} onChange={(e, data) => {
                setCamlQuery(data!)
            }} /><PrimaryButton style={{
                height: "min-content"
            }} text="Try" onClick={() => {
                const path = `_api/web/lists/getById(guid'${selectedListId}')/RenderListDataAsStream`;
                const fullCaml = `<View Scope="RecursiveAll"><Query><Where>${camlQuery}</Where></Query></View>`;

                const body = JSON.stringify({
                    parameters: {
                        RenderOptions: 2,
                        ViewXml: fullCaml
                    }
                })
                dispatch(setPath(path ? path : ''))
                dispatch(setBody(body))
                dispatch(setMethod("POST"))
                const fullPath: string = `${context && context.siteAbsoluteUrl ? context.siteAbsoluteUrl : ''}/${path}`
                runRestCall(dispatch, {
                    path: fullPath, method: "POST", headers: JSON.stringify({
                        accept: "application/json",
                        "Content-Type": "application/json"
                    }), body: body
                });
                navigate("/spshooter")
            }} /></div>
            <div style={{
                display: "flex",
                gap: "5px",
                alignItems: "flex-end"
            }}><TextField label={"OData query"} value={query} onChange={(e, data) => {
                setQuery(data!)
            }} /><PrimaryButton style={{
                height: "min-content"
            }} text="Try" onClick={() => {
                const path = `_api/web/lists/getById(guid'${selectedListId}')/items?$filter=${query}`;
                dispatch(setPath(path ? path : ''))
                const fullPath: string = `${context && context.siteAbsoluteUrl ? context.siteAbsoluteUrl : ''}/${path}`
                dispatch(setMethod("GET"))
                dispatch(setBody(""))
                runRestCall(dispatch, {
                    path: fullPath, method: "GET", headers: JSON.stringify({
                        accept: "application/json"
                    }), body: ""
                })
                navigate("/spshooter")
            }} /></div>
        </div>
    </div>
}

function FieldQueryBuilder(props: {
    selectedField?: string;
    selectedComparer?: string;
    value?: string;
    index: number
}) {
    const { listFields, configuredQueryFields } = useSelector((state: IRootState) => state.queryBuilder);
    const [selectedField, setSelectedField] = React.useState(props.selectedField || "");
    const [selectedComparer, setSelectedComparer] = React.useState(props.selectedComparer || "");
    const [value, setValue] = useState(props.value || "");
    const dispatch = useDispatch();

    return <div style={{
        display: "flex",
        gap: "3px"
    }}>
        <ComboBox selectedKey={selectedField} style={{
            width: "200px"
        }} options={listFields.map(o => ({
            key: o.InternalName,
            text: o.InternalName
        }))} onChange={(e, option) => {
            setSelectedField(option?.key?.toString() || "")
        }} />
        <Dropdown selectedKey={selectedComparer} style={{
            width: "100px"
        }} options={oDatacomparers.map(c => ({
            key: c,
            text: c
        }))} onChange={(e, option) => {
            setSelectedComparer(option?.key?.toString() || "")
        }} />
        <TextField value={value} onChange={(e, data) => {
            setValue(data!)
        }} />
        <PrimaryButton text={props.index === configuredQueryFields.length ? "Add to query" : "Update"} onClick={() => {
            if (props.index === configuredQueryFields.length) {
                //@ts-ignore
                dispatch(actions.setConfiguredQueryFields([...configuredQueryFields, {
                    name: selectedField,
                    value: value,
                    type: listFields.find(fld => fld.InternalName === selectedField)?.TypeAsString || "",
                    //@ts-ignore
                    comparer: selectedComparer
                }]))
            }
            else {
                let temp = [...configuredQueryFields];
                temp[props.index] = {
                    name: selectedField,
                    value: value,
                    type: listFields.find(fld => fld.InternalName === selectedField)?.TypeAsString || "",
                    //@ts-ignore
                    comparer: selectedComparer
                }
                dispatch(actions.setConfiguredQueryFields(temp))
            }
        }} />
        {props.index !== configuredQueryFields.length && <DefaultButton text="Remove" onClick={() => {
            let temp = [...configuredQueryFields]
            temp.splice(props.index, 1);
            dispatch(actions.setConfiguredQueryFields(temp))
        }}></DefaultButton>}
    </div>
}