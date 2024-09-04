import { IconProps } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { Container, SizeProps } from './styles'

export interface IconBoxProps {
  size?: SizeProps
  icon: (props: IconProps) => JSX.Element
}

export function IconBox({ size = 'NORMAL', icon: Icon }: IconBoxProps) {
  const { COLORS } = useTheme()

  const iconSize = size === 'NORMAL' ? 24 : 16

  return (
    <Container size={size}>
      <Icon size={iconSize} color={COLORS.BRAND_LIGHT} />
    </Container>
  )
}
