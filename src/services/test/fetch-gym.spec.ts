import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository.ts'
import { FetchGymUseCase } from '../fetch-gym'

let gymsRepository: InMemoryGymsRepository
let sut: FetchGymUseCase

describe('Fetch Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchGymUseCase(gymsRepository)
  })

  it('should be able to fetch a gym', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      name: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -21.053274191336644,
      longitude: -49.6795341217754,
    })

    await gymsRepository.create({
      id: 'gym-02',
      name: 'Typescript Gym',
      description: '',
      phone: '',
      latitude: -21.053274191336644,
      longitude: -49.6795341217754,
    })

    const { gyms } = await sut.execute({ query: 'JavaScript', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'JavaScript Gym' })])
  })

  it('should be able to fetch some gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-${i}`,
        name: 'Typescript Gym',
        description: '',
        phone: '',
        latitude: -21.053274191336644,
        longitude: -49.6795341217754,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Typescript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-21' }),
      expect.objectContaining({ id: 'gym-22' }),
    ])
  })
})
