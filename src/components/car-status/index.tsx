import { Car, Key } from 'phosphor-react-native'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container, IconBox, Message, TextHighlight } from './styles'

interface CarStatusProps extends TouchableOpacityProps {
  licensePlate?: string | null
}

export function CarStatus({ licensePlate = null, ...rest }: CarStatusProps) {
  const theme = useTheme()

  const Icon = licensePlate ? Car : Key
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso.`
    : `Nenhum veículo em uso.`
  const status = licensePlate ? 'chegada' : 'saída'

  return (
    <Container {...rest}>
      <IconBox>
        <Icon size={52} weight="thin" color={theme.COLORS.BRAND_LIGHT} />
      </IconBox>
      <Message>
        {message}{' '}
        <TextHighlight>Clique aqui para registrar a {status}</TextHighlight>
      </Message>
    </Container>
  )
}
