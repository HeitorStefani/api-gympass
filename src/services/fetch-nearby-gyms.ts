import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchGymNearbyUseCaseRequest {
  UserLatitude: number
  UserLongitude: number
}

interface FetchGymNearbyUseCaseResponse {
  gyms: Gym[]
}

export class FetchGymNearbyUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    UserLatitude,
    UserLongitude,
  }: FetchGymNearbyUseCaseRequest): Promise<FetchGymNearbyUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      UserLatitude,
      UserLongitude,
    })

    return {
      gyms,
    }
  }
}
