import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { CarStatus } from '@/components/car-status'
import { HistoricCard } from '@/components/historic-card'
import { HomeHeader } from '@/components/home-header'
import { useQuery, useRealm } from '@/libs/realm'
import { Historic } from '@/libs/realm/schemas/historic'

import { Container, Content } from './styles'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)

  const { navigate } = useNavigation()

  const historic = useQuery(Historic)
  const realm = useRealm()

  function handleRegisterMovement() {
    if (!vehicleInUse?._id) {
      return navigate('departure')
    }
    return navigate('arrival', { id: vehicleInUse._id.toString() })
  }

  useEffect(() => {
    function fetchVehicleInUse() {
      try {
        const vehicle = historic.filtered("status = 'departure'")[0]
        setVehicleInUse(vehicle)
      } catch (error) {
        Alert.alert(
          'Veículo em uso',
          'Não foi possível carregar o veículo em uso.',
        )
        console.log(error)
      }
    }

    fetchVehicleInUse()

    realm.addListener('change', () => fetchVehicleInUse())

    return () => realm.removeListener('change', fetchVehicleInUse)
  }, [historic, realm])

  useEffect(() => {
    function fetchHistoric() {
      const response = historic.filtered(
        "status = 'arrival' SORT(created_at DESC)",
      )

      console.log(response)
    }

    fetchHistoric()
  }, [historic])

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <HistoricCard
          data={{ created: '01/09', licensePlate: 'XXX1212', isSync: false }}
        />
      </Content>
    </Container>
  )
}
