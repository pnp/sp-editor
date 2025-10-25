import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { getContextInfo, getLists, selectQueryList, } from '../chrome/chrome-actions';
import { Dropdown, IDropdownOption } from '@fluentui/react';

export default function SPListsList() {
    const { context, allLists, selectedListId } = useSelector((state: IRootState) => state.queryBuilder)
    const dispatch = useDispatch();
    
    // load initial data
    useEffect(() => {
        getContextInfo(dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        if (context) {
            getLists(dispatch, context)
        }
    }, [context])

    // Convert lists to dropdown options
    const listOptions: IDropdownOption[] = allLists.map(l => ({
        key: l.Id,
        text: l.Title
    }));

    return (
        <div style={{ marginBottom: '10px' }}>
            <Dropdown
                placeholder="Select a list"
                label="SharePoint List"
                options={listOptions}
                selectedKey={selectedListId}
                onChange={(e, option) => {
                    if (option) {
                        selectQueryList(dispatch, context, option.key as string);
                    }
                }}
                styles={{
                    root: { width: '100%', maxWidth: '400px' },
                    dropdown: { width: '100%' }
                }}
            />
        </div>
    );
}