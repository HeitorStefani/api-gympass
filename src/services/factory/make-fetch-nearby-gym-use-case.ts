import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchGymNearbyUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearByGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchGymNearbyUseCase(gymsRepository)

  return useCase
}
