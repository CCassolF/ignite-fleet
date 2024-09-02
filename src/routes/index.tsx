import { NavigationContainer } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import { TopMessage } from '@/components/top-message'

import { AppRoutes } from './app.route'

export function Routes() {
  const insets = useSafeAreaInsets()

  return (
    <NavigationContainer>
      <AppRoutes />

      <Toast
        config={{
          info: ({ text1 }) => <TopMessage title={String(text1)} />,
        }}
        topOffset={insets.top}
      />
    </NavigationContainer>
  )
}
