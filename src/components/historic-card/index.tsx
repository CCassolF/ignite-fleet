import { Check, Clock } from 'phosphor-react-native'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container, Departure, Info, LicensePlate } from './styles'

export interface HistoricCardProps {
  licensePlate: string
  created: string
  isSync: boolean
}

interface HistoricCardData extends TouchableOpacityProps {
  data: HistoricCardProps
}

export function HistoricCard({ data, ...rest }: HistoricCardData) {
  const { COLORS } = useTheme()

  return (
    <Container {...rest}>
      <Info>
        <LicensePlate>{data.licensePlate}</LicensePlate>
        <Departure>{data.created}</Departure>
      </Info>

      {data.isSync ? (
        <Check size={24} color={COLORS.BRAND_LIGHT} />
      ) : (
        <Clock size={24} color={COLORS.GRAY_400} />
      )}
    </Container>
  )
}
