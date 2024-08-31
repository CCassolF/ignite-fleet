import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container, Input, Label } from './styles'

export interface LicensePlateInputProps extends TextInputProps {
  label: string
}

export function LicensePlateInput({ label, ...rest }: LicensePlateInputProps) {
  const { COLORS } = useTheme()

  return (
    <Container>
      <Label>{label}</Label>

      <Input
        maxLength={7}
        autoCapitalize="characters"
        placeholderTextColor={COLORS.GRAY_400}
        {...rest}
      />
    </Container>
  )
}
