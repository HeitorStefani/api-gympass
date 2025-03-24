import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from '../checkin'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositories'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository.ts'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from '../error/max-distance-error'
import { MaxCheckinPerDayError } from '../error/max-checkin-per-day'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      name: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-21.053274191336644),
      longitude: new Decimal(-49.6795341217754),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -21.053274191336644,
      userLongitude: -49.6795341217754,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -21.053274191336644,
      userLongitude: -49.6795341217754,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -21.053274191336644,
      userLongitude: -49.6795341217754,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -21.053274191336644,
      userLongitude: -49.6795341217754,
    })

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -21.053274191336644,
        userLongitude: -49.6795341217754,
      }),
    ).rejects.toBeInstanceOf(MaxCheckinPerDayError)
  })
  it('should not be able to check in far distance', async () => {
    await expect(
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -21.0305708,
        userLongitude: -49.6621964,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
