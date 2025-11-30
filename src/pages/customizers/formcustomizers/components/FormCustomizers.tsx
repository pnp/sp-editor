import { MessageBar, MessageBarType, Stack, Text } from '@fluentui/react'

const FormCustomizers = () => {
  return (
    <Stack tokens={{ childrenGap: 16 }} styles={{ root: { padding: 20 } }}>
      <Text variant="xLarge">Form Customizers</Text>
      <Text variant="medium" styles={{ root: { color: '#605e5c' } }}>
        Manage Form Customizers attached to content types.
      </Text>

      <MessageBar messageBarType={MessageBarType.info}>
        Form Customizers feature coming soon. This will allow you to manage
        custom forms (New, Edit, Display) attached to content types.
      </MessageBar>
    </Stack>
  )
}

export default FormCustomizers