import { Header } from '@/components/header'
import { LicensePlateInput } from '@/components/license-plate-input'

import { Container, Content } from './styles'

export interface DepartureProps {}

export function Departure() {
  return (
    <Container>
      <Header title="Saída" />

      <Content>
        <LicensePlateInput label="Placa do veículo" placeholder="BRA-1234" />
      </Content>
    </Container>
  )
}
