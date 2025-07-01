import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { getContextInfo, getLists, selectQueryList, } from '../chrome/chrome-actions';
import { NeutralColors } from '@fluentui/theme'

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

    return <div className='listsWrapper'>
        {allLists.map(l => <div style={{
            backgroundColor: selectedListId === l.Id ? NeutralColors.gray180 : undefined
        }} className='spListElement' onClick={() => {
            selectQueryList(dispatch, context, l.Id);

        }} key={l.Id}>{l.Title}</div>)}
    </div>
}