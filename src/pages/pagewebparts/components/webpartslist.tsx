import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  ScrollablePane,
  Selection,
  SelectionMode,
  Sticky,
  StickyPositionType,
  IconButton,
  mergeStyles,
} from '@fluentui/react'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setCheckedItems, setPropertiesPanel, setSelectedWebPart } from '../../../store/pagewebparts/actions'
import { IPageWebPart } from '../../../store/pagewebparts/types'
import { getAllPageWebParts } from '../chrome/chrome-actions'

const copyIconClass = mergeStyles({ fontSize: 14, cursor: 'pointer' })

const PageWebPartsList = () => {

  const dispatch = useDispatch()
  const { webparts, searchstring } = useSelector((state: IRootState) => state.pageWebParts)

  useEffect(() => {
    getAllPageWebParts(dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectionRef = useRef(new Selection({
    getKey: (item: IPageWebPart) => item.id,
    onSelectionChanged: () => {
      dispatch(setCheckedItems(selectionRef.current.getSelection() as IPageWebPart[]))
    },
  }))

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }

  const filtered = webparts.filter(
    (wp: IPageWebPart) => {
      const term = searchstring.toLocaleLowerCase()
      return (
        wp.title.toLocaleLowerCase().includes(term) ||
        wp.id.toLocaleLowerCase().includes(term) ||
        wp.webPartId.toLocaleLowerCase().includes(term)
      )
    }
  )

  const columns: IColumn[] = [
    {
      key: 'position',
      name: 'Pos',
      fieldName: 'zoneIndex',
      minWidth: 75,
      maxWidth: 75,
      isResizable: true,
      data: 'number',
      isPadded: true,
      onRender: (item: IPageWebPart) => (
        <span style={{ fontFamily: 'monospace', fontSize: 12 }}
          title={`Zone ${item.zoneIndex}, Column ${item.sectionIndex}, Order ${item.controlIndex}, Width factor ${item.sectionFactor}`}>
          S{item.zoneIndex} C{item.sectionIndex} #{item.controlIndex}
        </span>
      ),
    },
    {
      key: 'title',
      name: 'Title',
      fieldName: 'title',
      minWidth: 120,
      maxWidth: 220,
      isResizable: true,
      isRowHeader: true,
      data: 'string',
      isPadded: true,
    },
    {
      key: 'webPartId',
      name: 'Web Part ID',
      fieldName: 'webPartId',
      minWidth: 260,
      maxWidth: 260,
      isResizable: true,
      data: 'string',
      isPadded: true,
      onRender: (item: IPageWebPart) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{item.webPartId}</span>
          <IconButton
            className={copyIconClass}
            iconProps={{ iconName: 'Copy' }}
            title='Copy Web Part ID'
            ariaLabel='Copy Web Part ID'
            onClick={(e) => { e.stopPropagation(); copyToClipboard(item.webPartId) }}
          />
        </span>
      ),
    },
    {
      key: 'properties',
      name: 'Properties',
      fieldName: 'properties',
      minWidth: 80,
      maxWidth: 100,
      isResizable: false,
      data: 'string',
      onRender: (item: IPageWebPart) => (
        <IconButton
          iconProps={{ iconName: 'OpenPane' }}
          title='View Properties'
          ariaLabel='View Properties'
          onClick={() => {
            dispatch(setSelectedWebPart(item))
            dispatch(setPropertiesPanel(true))
          }}
        />
      ),
    },
  ]

  return (
    <ScrollablePane>
      <Sticky stickyPosition={StickyPositionType.Header}>
        <div style={{ padding: '4px 8px', fontSize: 12, opacity: 0.7 }}>
          {filtered.length} web part{filtered.length === 1 ? '' : 's'} found
        </div>
      </Sticky>
      <DetailsList
        items={filtered}
        columns={columns}
        setKey='set'
        getKey={(item: IPageWebPart) => item.id}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectionMode={SelectionMode.multiple}
        selection={selectionRef.current as unknown as Selection}
        isHeaderVisible={true}
        onItemInvoked={(item: IPageWebPart) => {
          dispatch(setSelectedWebPart(item))
          dispatch(setPropertiesPanel(true))
        }}
        styles={{ root: { cursor: 'pointer' } }}
      />
    </ScrollablePane>
  )
}

export default PageWebPartsList
