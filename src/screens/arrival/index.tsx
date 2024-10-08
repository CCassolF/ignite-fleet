import { useNavigation, useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'
import { X } from 'phosphor-react-native'
import { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { LatLng } from 'react-native-maps'
import { BSON } from 'realm'

import { Button } from '@/components/button'
import { ButtonIcon } from '@/components/button-icon'
import { Header } from '@/components/header'
import { Loading } from '@/components/loading'
import { Locations } from '@/components/locations'
import { Map } from '@/components/map'
import { getStorageLocations } from '@/libs/async-storage/location-storage'
import { getLastAsyncTimestamp } from '@/libs/async-storage/sync-storage'
import { useObject, useRealm } from '@/libs/realm'
import { Historic } from '@/libs/realm/schemas/historic'
import { stopLocationTask } from '@/tasks/background-location-task'
import { getAddressLocation } from '@/utils/get-address-location'

import {
  AsyncMessage,
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles'

interface RouteParamsProps {
  id: string
}

interface LocationProps {
  label: string
  description: string
}

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false)
  const [coordinates, setCoordinates] = useState<LatLng[]>([])
  const [departure, setDeparture] = useState<LocationProps>({} as LocationProps)
  const [arrival, setArrival] = useState<LocationProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { goBack } = useNavigation()
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string)
  const realm = useRealm()

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes'

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => removeVehicleUsage() },
    ])
  }

  async function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })

    await stopLocationTask()
    goBack()
  }

  async function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert(
          'Error',
          'Não foi possível obter os dados para registrar a chegada do veículo.',
        )
      }

      const locations = await getStorageLocations()

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
        historic.coords.push(...locations)
      })

      await stopLocationTask()

      Alert.alert('Chegada', 'Chegada registrada com sucesso.')
      goBack()
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Não foi possível registrar a chegada do veículo.')
    }
  }

  const getLocationInfo = useCallback(async () => {
    if (!historic) {
      return
    }

    const lastSync = await getLastAsyncTimestamp()
    const updatedAt = historic.updated_at.getTime()
    setDataNotSynced(updatedAt > lastSync)

    if (historic?.status === 'departure') {
      const locationsStorage = await getStorageLocations()
      setCoordinates(locationsStorage)
    } else {
      const coords = historic?.coords.map((coord) => {
        return {
          latitude: coord.latitude,
          longitude: coord.longitude,
        }
      })
      setCoordinates(coords ?? [])
    }

    if (historic.coords[0]) {
      const departureStreetName = await getAddressLocation(historic.coords[0])
      setDeparture({
        label: `Saindo em ${departureStreetName ?? ''} `,
        description: dayjs(new Date(historic.coords[0].timestamp)).format(
          'DD/MM/YYYY [às] HH:mm',
        ),
      })
    }

    if (historic.status === 'arrival') {
      const lastLocation = historic.coords[historic.coords.length - 1]
      const arrivalStreetName = await getAddressLocation(lastLocation)

      setArrival({
        label: `Chegando em ${arrivalStreetName ?? ''} `,
        description: dayjs(new Date(lastLocation.timestamp)).format(
          'DD/MM/YYYY [às] HH:mm',
        ),
      })
    }

    setIsLoading(false)
  }, [historic])

  useEffect(() => {
    getLocationInfo()
  }, [getLocationInfo])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container>
      <Header title={title} />

      {coordinates.length > 0 && <Map coordinates={coordinates} />}

      <Content>
        <Locations departure={departure} arrival={arrival} />

        <Label>Placa do veículo</Label>

        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>

        <Description>{historic?.description}</Description>
      </Content>

      {historic?.status === 'departure' && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title="Registrar chegada" onPress={handleArrivalRegister} />
        </Footer>
      )}

      {dataNotSynced && (
        <AsyncMessage>
          Sincronização da
          {historic?.status === 'departure' ? 'partida' : 'chegada'}
          pendente.
        </AsyncMessage>
      )}
    </Container>
  )
}
