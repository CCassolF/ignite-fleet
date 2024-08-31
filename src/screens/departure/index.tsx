import { Text } from 'react-native'

import { Header } from '@/components/header'

import { Container } from './styles'

export interface DepartureProps {}

export function Departure() {
  return (
    <Container>
      <Header title="Saída" />
      <Text>Departure</Text>
    </Container>
  )
}
