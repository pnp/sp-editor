import { ActionButton, CommandBar, DefaultButton, Dialog, DialogFooter, DialogType, Dropdown, IStackStyles, PrimaryButton, Stack, TextField } from '@fluentui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'

const SearchCommands = () => {

  return (
    <CommandBar
      items={[
        {
          key: 'Search',
          onRender: () => <PrimaryButton
            text="Search"
            allowDisabledFocus
            styles={{ root: { marginTop: 6, marginRight: 6 } }}
          />
        },
        {
          key: 'Options',
          text: 'Query Options',
          iconProps: { iconName: 'MultiSelect' },
          split: true,
        },
        {
          key: 'Payload',
          text: 'Show Payload',
          iconProps: { iconName: 'Code' },
        }
      ]}
      farItems={[
        {
          key: 'SearchPage',
          text: 'Search Current Page',
          iconProps: { iconName: 'SearchAndApps' },
        },
        {
          key: 'IndexWeb',
          text: 'Reindex Current Web',
          iconProps: { iconName: 'SiteScan' },
        }
      ]}
    />
  )
}

export default SearchCommands
