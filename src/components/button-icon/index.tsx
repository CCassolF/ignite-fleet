import { IconProps } from 'phosphor-react-native'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container } from './styles'

export interface ButtonIconProps extends TouchableOpacityProps {
  icon: (props: IconProps) => JSX.Element
}

export function ButtonIcon({ icon: Icon, ...rest }: ButtonIconProps) {
  const { COLORS } = useTheme()

  return (
    <Container activeOpacity={0.7} {...rest}>
      <Icon size={24} color={COLORS.BRAND_MID} />
    </Container>
  )
}
