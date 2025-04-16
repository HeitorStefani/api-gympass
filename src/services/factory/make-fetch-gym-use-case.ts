import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchGymUseCase } from '../fetch-gym'

export function makeFetchGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchGymUseCase(gymsRepository)

  return useCase
}
