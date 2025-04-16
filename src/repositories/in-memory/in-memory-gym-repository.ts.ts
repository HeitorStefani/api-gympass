import { Gym, Prisma } from '@prisma/client'
import { findManyNearbyParams, GymsRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime/library'
import { getDistanceBetweenCoordinates } from 'utils/calc-distance-between-coords'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findManyNearby(params: findManyNearbyParams) {
    return this.items.filter((items) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.UserLatitude,
          longitude: params.UserLongitude,
        },
        {
          latitude: items.latitude.toNumber(),
          longitude: items.longitude.toNumber(),
        },
      )
      return distance < 10
    })
  }

  async findMany(query: string, page: number) {
    return this.items
      .filter((items) => items.name.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)
    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) {
      return null
    }

    return gym
  }
}
