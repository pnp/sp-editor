import { FontIcon, mergeStyles, ScrollablePane, Text } from '@fluentui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setPropertiesPanel, setSelectedWebPart } from '../../../store/pagewebparts/actions'
import { IPageWebPart } from '../../../store/pagewebparts/types'

const sectionStyle = mergeStyles({
  marginBottom: 12,
  border: '1px solid #e0e0e0',
  borderRadius: 4,
  overflow: 'hidden',
  background: 'rgba(255,255,255,0.06)',
})

const sectionHeaderStyle = mergeStyles({
  padding: '4px 10px',
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  opacity: 0.8,
  background: 'transparent',
  borderBottom: '1px solid #e0e0e022',
})

const columnsRowStyle = mergeStyles({
  display: 'flex',
  gap: 2,
  padding: 6,
})

const webPartCardStyle = mergeStyles({
  border: '1px solid #c8c6c4',
  borderRadius: 3,
  padding: '8px 10px',
  marginBottom: 6,
  cursor: 'pointer',
  background: 'rgba(0,0,0,0.35)',
  selectors: {
    ':hover': {
      border: '1px solid #0078d4',
      background: 'rgba(0,120,212,0.06)',
    },
    ':last-child': {
      marginBottom: 0,
    },
  },
})

const webPartIconStyle = mergeStyles({
  marginRight: 6,
  fontSize: 14,
  color: '#0078d4',
  verticalAlign: 'middle',
})

const idStyle = mergeStyles({
  fontFamily: 'monospace',
  fontSize: 10,
  opacity: 0.5,
  display: 'block',
  marginTop: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

const PageLayoutView = () => {
  const dispatch = useDispatch()
  const { webparts, searchstring } = useSelector((state: IRootState) => state.pageWebParts)

  const term = searchstring.toLocaleLowerCase()
  const filtered = term
    ? webparts.filter(
        wp =>
          wp.title.toLocaleLowerCase().includes(term) ||
          wp.id.toLocaleLowerCase().includes(term) ||
          wp.webPartId.toLocaleLowerCase().includes(term)
      )
    : webparts

  // Group by zoneIndex → sectionIndex
  const zones: Map<number, Map<number, IPageWebPart[]>> = new Map()
  for (const wp of filtered) {
    if (!zones.has(wp.zoneIndex)) {
      zones.set(wp.zoneIndex, new Map())
    }
    const zone = zones.get(wp.zoneIndex)!
    if (!zone.has(wp.sectionIndex)) {
      zone.set(wp.sectionIndex, [])
    }
    zone.get(wp.sectionIndex)!.push(wp)
  }

  // Sort controls within each column
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

  if (filtered.length === 0) {
    return (
      <ScrollablePane>
        <div style={{ padding: 20, opacity: 0.6 }}>
          No web parts found.
        </div>
      </ScrollablePane>
    )
  }

  return (
    <ScrollablePane>
      <div style={{ padding: '10px 16px' }}>
      {sortedZoneKeys.map(zoneKey => {
        const zone = zones.get(zoneKey)!
        const sortedColumnKeys = Array.from(zone.keys()).sort((a, b) => a - b)

        // Compute total sectionFactor for this zone to derive flex widths
        const totalFactor = sortedColumnKeys.reduce((sum, colKey) => {
          const controls = zone.get(colKey)!
          const factor = controls.length > 0 ? controls[0].sectionFactor : 12
          return sum + factor
        }, 0)

        return (
          <div key={zoneKey} className={sectionStyle}>
            <div className={sectionHeaderStyle}>Section {zoneKey}</div>
            <div className={columnsRowStyle}>
              {sortedColumnKeys.map(colKey => {
                const controls = zone.get(colKey)!
                const factor = controls.length > 0 ? controls[0].sectionFactor : 12
                const flexBasis = totalFactor > 0 ? (factor / totalFactor) * 100 : 100

                return (
                  <div
                    key={colKey}
                    style={{ flex: `0 0 calc(${flexBasis}% - 4px)`, minWidth: 0 }}
                    title={`Column ${colKey} — width ${factor}/12`}
                  >
                    {controls.map(wp => (
                      <div
                        key={wp.id}
                        className={webPartCardStyle}
                        onClick={() => onCardClick(wp)}
                        role='button'
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && onCardClick(wp)}
                      >
                        <FontIcon iconName='WebComponents' className={webPartIconStyle} />
                        <Text variant='smallPlus' styles={{ root: { fontWeight: 600 } }}>
                          {wp.title || '(no title)'}
                        </Text>
                        <span className={idStyle}>{wp.webPartId}</span>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
    </ScrollablePane>
  )
}

export default PageLayoutView
