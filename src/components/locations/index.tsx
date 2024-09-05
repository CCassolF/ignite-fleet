import { Car, FlagCheckered } from 'phosphor-react-native'

import { LocationInfo } from '../location-info'
import { Container, Line } from './styles'

interface LocationInfoProps {
  label: string
  description: string
}

export interface LocationsProps {
  departure: LocationInfoProps
  arrival?: LocationInfoProps | null
}

export function Locations({ arrival = null, departure }: LocationsProps) {
  return (
    <Container>
      <LocationInfo
        icon={Car}
        label={departure.label}
        description={departure.description}
      />

      {arrival && (
        <>
          <Line />

          <LocationInfo
            icon={FlagCheckered}
            label={arrival.label}
            description={arrival.description}
          />
        </>
      )}
    </Container>
  )
}
