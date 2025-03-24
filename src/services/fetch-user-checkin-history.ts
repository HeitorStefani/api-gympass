import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './error/resource-not-found'
import { CheckInsRepository } from '@/repositories/checkins-repository'

interface fetchUserCheckinHistoryUseCaseRequest {
  userId: string
  page: number
}

interface fetchUserCheckinHistoryUseCaseResponse {
  checkins: CheckIn[]
}

export class FetchUserCheckinHistoryUseCase {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: fetchUserCheckinHistoryUseCaseRequest): Promise<fetchUserCheckinHistoryUseCaseResponse> {
    const checkins = await this.checkinsRepository.findManyById(userId, page)

    if (!checkins) {
      throw new ResourceNotFoundError()
    }

    return {
      checkins,
    }
  }
}
