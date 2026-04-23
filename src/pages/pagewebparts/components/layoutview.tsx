import { FontIcon, mergeStyles, ScrollablePane, Text } from '@fluentui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setPropertiesPanel, setSelectedWebPart } from '../../../store/pagewebparts/actions'
import { IPageWebPart } from '../../../store/pagewebparts/types'
import AddWebPartPanel from './addwebpartpanel'

/* ── Section & column styles ───────────────────────────────── */

const containerStyle = mergeStyles({
  padding: '16px 20px 32px',
})

const sectionWrapperStyle = mergeStyles({
  marginBottom: 20,
})

const sectionHeaderStyle = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 8,
})

const sectionBadgeStyle = mergeStyles({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '3px 10px',
  borderRadius: 12,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  background: 'rgba(0,120,212,0.10)',
  color: '#0078d4',
})

const sectionLayoutLabelStyle = mergeStyles({
  fontSize: 11,
  opacity: 0.45,
  fontStyle: 'italic',
})

const columnsRowStyle = mergeStyles({
  display: 'flex',
  gap: 8,
})

const columnStyle = mergeStyles({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  borderRadius: 6,
  border: '1px solid rgba(128,128,128,0.18)',
  background: 'rgba(255,255,255,0.025)',
  overflow: 'hidden',
})

const columnHeaderStyle = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px 10px',
  fontSize: 10,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  opacity: 0.45,
  borderBottom: '1px solid rgba(128,128,128,0.12)',
})

const columnBodyStyle = mergeStyles({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: 8,
  gap: 6,
})

const webPartCardStyle = mergeStyles({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 10,
  borderRadius: 5,
  padding: '10px 12px',
  cursor: 'pointer',
  border: '1px solid rgba(128,128,128,0.18)',
  background: 'rgba(0,0,0,0.22)',
  transition: 'box-shadow 0.15s ease, border-color 0.15s ease, transform 0.1s ease',
  selectors: {
    ':hover': {
      borderColor: '#0078d4',
      boxShadow: '0 2px 8px rgba(0,120,212,0.18)',
      transform: 'translateY(-1px)',
    },
  },
})

const accentBarStyle = mergeStyles({
  width: 3,
  alignSelf: 'stretch',
  borderRadius: 2,
  background: '#0078d4',
  flexShrink: 0,
})

const cardContentStyle = mergeStyles({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
})

const cardTitleStyle = mergeStyles({
  fontWeight: 600,
  fontSize: 13,
  lineHeight: '18px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

const cardIdStyle = mergeStyles({
  fontFamily: 'monospace',
  fontSize: 10,
  opacity: 0.38,
  display: 'block',
  marginTop: 3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

const addButtonStyle = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  border: '1px dashed rgba(200,200,200,0.45)',
  borderRadius: 5,
  padding: '10px 12px',
  cursor: 'pointer',
  color: 'rgba(255,255,255,0.7)',
  fontSize: 12,
  fontWeight: 600,
  transition: 'opacity 0.15s, background 0.15s, border-color 0.15s',
  selectors: {
    ':hover': {
      background: 'rgba(255,255,255,0.08)',
      borderColor: 'rgba(255,255,255,0.6)',
      color: '#fff',
    },
  },
})

const emptyColumnStyle = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '14px 0',
  fontSize: 11,
  opacity: 0.3,
  fontStyle: 'italic',
})

const emptyStateStyle = mergeStyles({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '60px 20px',
  gap: 12,
  opacity: 0.5,
})

/* ── Component ─────────────────────────────────────────────── */

const PageLayoutView = () => {
  const dispatch = useDispatch()
  const { webparts } = useSelector((state: IRootState) => state.pageWebParts)

  const [addPanelOpen, setAddPanelOpen] = useState(false)
  const [addTarget, setAddTarget] = useState({ zoneIndex: 1, sectionIndex: 1, sectionFactor: 12 })

  const onAddClick = (zoneIndex: number, sectionIndex: number, sectionFactor: number) => {
    setAddTarget({ zoneIndex, sectionIndex, sectionFactor })
    setAddPanelOpen(true)
  }

  // Group by zoneIndex → sectionIndex
  const zones: Map<number, Map<number, IPageWebPart[]>> = new Map()
  for (const wp of webparts) {
    if (!zones.has(wp.zoneIndex)) {
      zones.set(wp.zoneIndex, new Map())
    }
    const zone = zones.get(wp.zoneIndex)!
    if (!zone.has(wp.sectionIndex)) {
      zone.set(wp.sectionIndex, [])
    }
    zone.get(wp.sectionIndex)!.push(wp)
  }

  zones.forEach(zone => {
    zone.forEach(controls => {
      controls.sort((a, b) => a.controlIndex - b.controlIndex)
    })
  })

  const sortedZoneKeys = Array.from(zones.keys()).sort((a, b) => a - b)

  const onCardClick = (wp: IPageWebPart) => {
    dispatch(setSelectedWebPart(wp))
    dispatch(setPropertiesPanel(true))
  }

  if (webparts.length === 0) {
    return (
      <ScrollablePane>
        <div className={emptyStateStyle}>
          <FontIcon iconName='WebComponents' style={{ fontSize: 36, opacity: 0.4 }} />
          <Text variant='medium' style={{ fontWeight: 500 }}>No web parts on this page</Text>
          <Text variant='small' style={{ opacity: 0.6 }}>Navigate to a SharePoint page and click Refresh</Text>
        </div>
      </ScrollablePane>
    )
  }

  return (
    <ScrollablePane>
      {/* Layout content */}
      <div className={containerStyle}>
        {sortedZoneKeys.map(zoneKey => {
          const zone = zones.get(zoneKey)!
          const sortedColumnKeys = Array.from(zone.keys()).sort((a, b) => a - b)

          const totalFactor = sortedColumnKeys.reduce((sum, colKey) => {
            const controls = zone.get(colKey)!
            const factor = controls.length > 0 ? controls[0].sectionFactor : 12
            return sum + factor
          }, 0)

          // Build layout label e.g. "8 / 4" or "12"
          const layoutParts = sortedColumnKeys.map(colKey => {
            const controls = zone.get(colKey)!
            return controls.length > 0 ? controls[0].sectionFactor : 12
          })
          const layoutLabel = layoutParts.join(' / ')

          return (
            <div key={zoneKey} className={sectionWrapperStyle}>
              {/* Section header */}
              <div className={sectionHeaderStyle}>
                <span className={sectionBadgeStyle}>
                  <FontIcon iconName='GridViewMedium' style={{ fontSize: 12 }} />
                  Section {zoneKey}
                </span>
                <span className={sectionLayoutLabelStyle}>
                  {sortedColumnKeys.length} column{sortedColumnKeys.length > 1 ? 's' : ''} ({layoutLabel})
                </span>
              </div>

              {/* Columns */}
              <div className={columnsRowStyle}>
                {sortedColumnKeys.map(colKey => {
                  const controls = zone.get(colKey)!
                  const factor = controls.length > 0 ? controls[0].sectionFactor : 12
                  const flexBasis = totalFactor > 0 ? (factor / totalFactor) * 100 : 100

                  return (
                    <div
                      key={colKey}
                      className={columnStyle}
                      style={{ flex: `0 0 calc(${flexBasis}% - ${(sortedColumnKeys.length - 1) * 8 / sortedColumnKeys.length}px)` }}
                    >
                      {/* Column header with width indicator */}
                      <div className={columnHeaderStyle}>
                        <span>Col {colKey}</span>
                        {factor > 0 && <span title='Width on the SharePoint 12-column grid'>{factor}/12</span>}
                      </div>

                      {/* Column body */}
                      <div className={columnBodyStyle}>
                        {controls.length === 0 && (
                          <div className={emptyColumnStyle}>No web parts</div>
                        )}

                        {controls.map(wp => {
                          const isText = wp.controlType === 4
                          return (
                          <div
                            key={wp.id}
                            className={webPartCardStyle}
                            onClick={() => onCardClick(wp)}
                            role='button'
                            tabIndex={0}
                            onKeyDown={e => e.key === 'Enter' && onCardClick(wp)}
                          >
                            <div className={accentBarStyle} style={isText ? { background: '#8764b8' } : undefined} />
                            <FontIcon
                              iconName={isText ? 'TextDocument' : 'WebComponents'}
                              style={{ fontSize: 18, color: isText ? '#8764b8' : '#0078d4', marginTop: 1, flexShrink: 0 }}
                            />
                            <div className={cardContentStyle}>
                              <Text variant='small' className={cardTitleStyle}>
                                {wp.title || '(untitled)'}
                              </Text>
                              <span className={cardIdStyle}>{isText ? 'Text' : wp.webPartId}</span>
                            </div>
                          </div>
                          )
                        })}

                        {/* Add button */}
                        <div
                          className={addButtonStyle}
                          onClick={() => onAddClick(zoneKey, colKey, factor)}
                          role='button'
                          tabIndex={0}
                          onKeyDown={e => e.key === 'Enter' && onAddClick(zoneKey, colKey, factor)}
                          title={`Add web part or control to Section ${zoneKey}, Column ${colKey}`}
                        >
                          <FontIcon iconName='Add' style={{ fontSize: 12 }} />
                          <span>Add web part or control</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <AddWebPartPanel
        isOpen={addPanelOpen}
        onDismiss={() => setAddPanelOpen(false)}
        targetZoneIndex={addTarget.zoneIndex}
        targetSectionIndex={addTarget.sectionIndex}
        targetSectionFactor={addTarget.sectionFactor}
      />
    </ScrollablePane>
  )
}

export default PageLayoutView
