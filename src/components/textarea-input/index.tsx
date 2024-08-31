import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container, Input, Label } from './styles'

export interface TextareaInputProps extends TextInputProps {
  label: string
}

export function TextareaInput({ label, ...rest }: TextareaInputProps) {
  const { COLORS } = useTheme()

  return (
    <Container>
      <Label>{label}</Label>
      <Input
        placeholderTextColor={COLORS.GRAY_400}
        multiline
        autoCapitalize="sentences"
        {...rest}
      />
    </Container>
  )
}
