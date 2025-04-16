import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { FetchUserCheckinHistoryUseCase } from '../fetch-user-checkin-history'

export function makeFetchUserCheckInHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckinHistoryUseCase(checkInsRepository)

  return useCase
}
