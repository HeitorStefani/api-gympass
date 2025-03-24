import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository.ts'
import { CreateGymUseCase } from '../create-gym'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(inMemoryGymsRepository)
  })
  it('should create a new gym', async () => {
    await sut
      .execute({
        name: 'js academy',
        description: 'the biggest gym in the world',
        phone: '1732454205',
        latitude: -21.053274191336644,
        longitude: -49.6795341217754,
      })
      .then((response) => {
        expect(response.gym.id).toEqual(expect.any(String))
      })
  })
})
