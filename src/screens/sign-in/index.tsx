import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Realm, useApp } from '@realm/react'
import { useState } from 'react'
import { Alert } from 'react-native'

import backgroundImg from '@/assets/background.png'
import { Button } from '@/components/button'

import { Container, Slogan, Title } from './styles'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
})

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const app = useApp()

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true)

      const { idToken } = await GoogleSignin.signIn()

      if (!idToken) {
        setIsAuthenticating(false)
        return Alert.alert(
          'Entrar',
          'Não foi possível conectar-se a sua conta google.',
        )
      }

      const credentials = Realm.Credentials.jwt(idToken)

      await app.logIn(credentials)
    } catch (error) {
      console.log(error)
      setIsAuthenticating(false)
      Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta google.')
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title="Entrar com Google"
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  )
}
