import { ResourceNotFoundError } from './error/resource-not-found'
import { CheckInsRepository } from '@/repositories/checkins-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkins: number
}

export class GetUserMetricsUseCase {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkins = await this.checkinsRepository.countById(userId)

    if (!checkins) {
      throw new ResourceNotFoundError()
    }

    return {
      checkins,
    }
  }
}
