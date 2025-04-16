import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchGymUseCaseRequest {
  query: string
  page: number
}

interface FetchGymUseCaseResponse {
  gyms: Gym[]
}

export class FetchGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: FetchGymUseCaseRequest): Promise<FetchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.findMany(query, page)

    return {
      gyms,
    }
  }
}
