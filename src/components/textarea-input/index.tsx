import { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container, Input, Label } from './styles'

export interface TextareaInputProps extends TextInputProps {
  label: string
}

const TextareaInput = forwardRef<TextInput, TextareaInputProps>(
  ({ label, ...rest }, ref) => {
    const { COLORS } = useTheme()

    return (
      <Container>
        <Label>{label}</Label>
        <Input
          ref={ref}
          placeholderTextColor={COLORS.GRAY_400}
          multiline
          autoCapitalize="sentences"
          {...rest}
        />
      </Container>
    )
  },
)

TextareaInput.displayName = 'TextareaInput'

export { TextareaInput }
