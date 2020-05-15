import { Dropdown, IconButton, IStackStyles, Stack, TextField } from 'office-ui-fabric-react'
import React from 'react'

const ApiTesterCommands = () => {

  const stackStyles: IStackStyles = {
    root: {
      marginTop: 5,
      marginLeft: 26,
      marginRight: 26,
    },
  }

  return (
    <Stack horizontal styles={stackStyles}>
      <Dropdown
        ariaLabel='Method'
        selectedKey={'GET'}
        options={[
          { key: 'GET', text: 'GET' },
          { key: 'POST', text: 'POST' },
          { key: 'PUT', text: 'PUT' },
          { key: 'PATCH', text: 'PATCH' },
          { key: 'DELETE', text: 'DELETE' },
        ]}
        styles={{ root: { width: 70 } }}
      />
      <TextField
        placeholder='_api/'
        prefix='https://contoso.sharepoint.com/'
        styles={{ root: { width: '100%' } }}
      />
      <IconButton
        iconProps={{ iconName: 'LightningBolt' }}
        title='Run'
        ariaLabel='Run'
        label='Run'
      />
      <IconButton
        iconProps={{ iconName: 'Settings', title: 'test' }}
        title='Options'
        ariaLabel='Options'
      />
    </Stack>
  )
}

export default ApiTesterCommands
