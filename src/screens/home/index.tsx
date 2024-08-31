import { CarStatus } from '@/components/car-status'
import { HomeHeader } from '@/components/home-header'

import { Container, Content } from './styles'

export function Home() {
  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus />
      </Content>
    </Container>
  )
}
