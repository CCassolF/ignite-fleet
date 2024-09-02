import { useNavigation } from '@react-navigation/native'
import { useUser } from '@realm/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { Realm } from 'realm'

import { CarStatus } from '@/components/car-status'
import { HistoricCard, HistoricCardProps } from '@/components/historic-card'
import { HomeHeader } from '@/components/home-header'
import { useQuery, useRealm } from '@/libs/realm'
import { Historic } from '@/libs/realm/schemas/historic'

import { Container, Content, Label, Title } from './styles'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>(
    [],
  )

  const { navigate } = useNavigation()

  const historic = useQuery(Historic)
  const user = useUser()
  const realm = useRealm()

  function handleRegisterMovement() {
    if (!vehicleInUse?._id) {
      return navigate('departure')
    }
    return navigate('arrival', { id: vehicleInUse._id.toString() })
  }

  function handleHistoricDetails(id: string) {
    navigate('arrival', { id })
  }

  function progressNotification(transferred: number, transferable: number) {
    const percentage = (transferred / transferable) * 100

    console.log(percentage)
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

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse)
      }
    }
  }, [historic, realm])

  useEffect(() => {
    function fetchHistoric() {
      try {
        const response = historic.filtered(
          "status = 'arrival' SORT(created_at DESC)",
        )

        const formattedHistoric = response.map((item) => {
          return {
            id: item._id.toString(),
            licensePlate: item.license_plate,
            isSync: false,
            created: dayjs(item.created_at).format(
              '[Saída] DD/MM/YYYY [às] HH:mm',
            ),
          }
        })

        setVehicleHistoric(formattedHistoric)
      } catch (error) {
        console.log(error)
        Alert.alert('Histórico', 'Não foi possível carregar o histórico.')
      }
    }

    fetchHistoric()
  }, [historic])

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects('Historic')
        .filtered(`user_id = '${user.id}'`)

      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user' })
    })
  }, [realm, user])

  useEffect(() => {
    const syncSession = realm.syncSession

    if (!syncSession) {
      return
    }

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification,
    )

    return () => syncSession.removeProgressNotification(progressNotification)
  }, [realm])

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <Title>Histórico</Title>

        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Label>Nenhum registro de utilização.</Label>}
        />
      </Content>
    </Container>
  )
}
