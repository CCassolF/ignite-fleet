import { useRef } from 'react'
import { TextInput } from 'react-native'

import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { LicensePlateInput } from '@/components/license-plate-input'
import { TextareaInput } from '@/components/textarea-input'

import { Container, Content } from './styles'

export interface DepartureProps {}

export function Departure() {
  const descriptionRef = useRef<TextInput>(null)

  function handleDepartureRegister() {
    console.log('Ok!')
  }

  return (
    <Container>
      <Header title="Saída" />

      <Content>
        <LicensePlateInput
          label="Placa do veículo"
          placeholder="BRA-1234"
          onSubmitEditing={() => descriptionRef.current?.focus()}
          returnKeyType="next"
        />
        <TextareaInput
          ref={descriptionRef}
          label="Finalidade"
          placeholder="Vou utilizar o veículo para..."
          onSubmitEditing={handleDepartureRegister}
          returnKeyType="send"
          blurOnSubmit
        />

        <Button title="Registrar Saída" onPress={handleDepartureRegister} />
      </Content>
    </Container>
  )
}
