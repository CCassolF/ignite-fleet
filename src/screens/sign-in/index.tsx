import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

import { styles } from './styles'

export interface SignInProps {}

export function SignIn() {
  return (
    <View style={styles.container}>
      <Text>Test your skills!!!!!!!</Text>
      <StatusBar style="auto" />
    </View>
  )
}
