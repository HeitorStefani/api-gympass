import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositories'
import { GetUserMetricsUseCase } from '../get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('get user metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get user metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })
    const numberOfCheckIns = await sut.execute({
      userId: 'user-01',
    })

    expect(numberOfCheckIns).to.equal(2)
  })
})
