import {
  Accuracy,
  hasStartedLocationUpdatesAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from 'expo-location'
import * as TaskManager from 'expo-task-manager'

import {
  removeStorageLocations,
  saveStorageLocation,
} from '@/libs/async-storage/location-storage'

export const BACKGROUND_TASK_NAME = 'location-tracking'

interface Coords {
  latitude: number
  longitude: number
}

interface Location {
  coords: Coords
  timestamp: number
}

interface LocationData {
  locations: Location[]
}

interface TaskManagerProps extends TaskManager.TaskManagerTaskBody {
  data: LocationData
}

TaskManager.defineTask(
  BACKGROUND_TASK_NAME,
  async ({ data, error }: TaskManagerProps) => {
    try {
      if (error) {
        throw error
      }

      if (!data) {
        return
      }

      const { coords, timestamp } = data.locations[0]

      const currentLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp,
      }

      await saveStorageLocation(currentLocation)
    } catch (error) {
      console.log(error)
      stopLocationTask()
    }
  },
)

export async function startLocationTask() {
  try {
    const hashStarter =
      await hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME)

    if (hashStarter) {
      await stopLocationTask()
    }

    await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: Accuracy.Highest,
      distanceInterval: 1,
      timeInterval: 1000,
    })
  } catch (error) {
    console.log(error)
  }
}

export async function stopLocationTask() {
  try {
    const hashStarter =
      await hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME)

    if (hashStarter) {
      await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME)
      await removeStorageLocations()
    }
  } catch (error) {
    console.log(error)
  }
}
