import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './error/resource-not-found'
import { getDistanceBetweenCoordinates } from 'utils/calc-distance-between-coords'
import { MaxDistanceError } from './error/max-distance-error'
import { MaxCheckinPerDayError } from './error/max-checkin-per-day'
interface CheckInUserRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUserResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUserRequest): Promise<CheckInUserResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KM = 0.1

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      new Date(),
      userId,
    )

    if (checkInOnSameDay) {
      throw new MaxCheckinPerDayError()
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
