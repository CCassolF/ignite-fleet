import { IconProps } from 'phosphor-react-native'

import { IconBox } from '../icon-box'
import { Container, Description, Info, Label } from './styles'

export interface LocationInfoProps {
  label: string
  description: string
  icon: (props: IconProps) => JSX.Element
}

export function LocationInfo({ label, description, icon }: LocationInfoProps) {
  return (
    <Container>
      <IconBox icon={icon} />

      <Info>
        <Label numberOfLines={1}>{label}</Label>
        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </Container>
  )
}
