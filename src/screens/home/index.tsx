import { Text } from 'react-native'

import { HomeHeader } from '@/components/home-header'

import { Container } from './styles'

export function Home() {
  return (
    <Container>
      <HomeHeader />
      <Text>Home</Text>
    </Container>
  )
}
