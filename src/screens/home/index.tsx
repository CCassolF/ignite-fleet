import { useNavigation } from '@react-navigation/native'

import { CarStatus } from '@/components/car-status'
import { HomeHeader } from '@/components/home-header'

import { Container, Content } from './styles'

export function Home() {
  const { navigate } = useNavigation()

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus onPress={() => navigate('departure')} />
      </Content>
    </Container>
  )
}
