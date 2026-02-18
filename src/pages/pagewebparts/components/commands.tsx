import { CommandBar, SearchBox } from '@fluentui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setSearchString } from '../../../store/pagewebparts/actions'
import { getAllPageWebParts } from '../chrome/chrome-actions'

const PageWebPartsCommands = () => {

  const { webparts, searchstring, checkedItems, viewMode } = useSelector((state: IRootState) => state.pageWebParts)

  const filtered = searchstring
    ? webparts.filter(wp => {
        const term = searchstring.toLocaleLowerCase()
        return (
          wp.title.toLocaleLowerCase().includes(term) ||
          wp.id.toLocaleLowerCase().includes(term) ||
          wp.webPartId.toLocaleLowerCase().includes(term)
        )
      })
    : webparts
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(setSearchString(''))
    }
  }, [dispatch])

  const onExport = () => {
    const toExport = checkedItems.length > 0 ? checkedItems : filtered
    const json = JSON.stringify(
      toExport.map(wp => ({
        title: wp.title,
        instanceId: wp.id,
        webPartId: wp.webPartId,
        properties: JSON.parse(wp.properties),
      })),
      null,
      2
    )
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const filename = checkedItems.length === 1
      ? `${slug(checkedItems[0].title || 'webpart')}.json`
      : `page-webparts-${checkedItems.length}.json`
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <CommandBar
      styles={{ root: { alignItems: 'center' } }}
      items={[
        {
          key: 'refresh',
          name: 'Refresh',
          iconProps: { iconName: 'Refresh' },
          onClick: () => { getAllPageWebParts(dispatch) },
        },
        {
          key: 'export',
          name: 'Export JSON',
          iconProps: { iconName: 'Download' },
          disabled: viewMode === 'layout' || checkedItems.length === 0,
          title: viewMode === 'layout' ? 'Switch to List view to export' : checkedItems.length > 0 ? `Export ${checkedItems.length} selected` : 'Select rows to export',
          onClick: onExport,
        },
        {
          key: 'search',
          onRender: () => (
            <SearchBox
              placeholder='Filter web parts'
              iconProps={{ iconName: 'Filter' }}
              styles={{ root: { width: 300 } }}
              disabled={webparts.length === 0}
              onChange={(_ev, value) => dispatch(setSearchString(value ?? ''))}
            />
          ),
        },
      ]}
      overflowButtonProps={{ ariaLabel: 'More commands' }}
      ariaLabel='Use left and right arrow keys to navigate between commands'
    />
  )
}

export default PageWebPartsCommands
