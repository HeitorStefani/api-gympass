import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository.ts'
import { FetchGymNearbyUseCase } from '../fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchGymNearbyUseCase

describe('Fetch Near Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchGymNearbyUseCase(gymsRepository)
  })

  it('should be able to fetch nearest gyms', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      name: 'Academia da utfpr',
      description: '',
      phone: '',
      latitude: -23.18727020703887,
      longitude: -50.65645030073409,
    })

    await gymsRepository.create({
      id: 'gym-02',
      name: 'Academia do meio do mato',
      description: '',
      phone: '',
      latitude: -23.068820909405016,
      longitude: -50.65645030073409,
    })

    const { gyms } = await sut.execute({
      UserLatitude: -23.1861605442562,
      UserLongitude: -50.65412426634503,
    })

    expect(gyms).toHaveLength(1)

    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Academia da utfpr' }),
    ])
  })
})
