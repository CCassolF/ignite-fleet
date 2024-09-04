import { Container, Description, Info, Label } from './styles'

export interface LocationInfoProps {
  label: string
  description: string
}

export function LocationInfo({ label, description }: LocationInfoProps) {
  return (
    <Container>
      <Info>
        <Label numberOfLines={1}>{label}</Label>
        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </Container>
  )
}
