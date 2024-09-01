import { useRoute } from '@react-navigation/native'
import { X } from 'phosphor-react-native'

import { Button } from '@/components/button'
import { ButtonIcon } from '@/components/button-icon'
import { Header } from '@/components/header'

import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles'

interface RouteParamsProps {
  id: string
}

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  return (
    <Container>
      <Header title="Chegada" />
      <Content>
        <Label>Placa do veículo</Label>

        <LicensePlate>XXX0000</LicensePlate>

        <Label>Finalidade</Label>

        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, atque
          dolorem. Ipsa repellendus enim commodi aut eum at animi id in dolorum
          eaque amet, fugit aperiam est cupiditate tempore nulla.
        </Description>

        <Footer>
          <ButtonIcon icon={X} />
          <Button title="Registrar chegada" />
        </Footer>
      </Content>
    </Container>
  )
}
