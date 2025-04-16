import { Prisma, Gym } from '@prisma/client'
import { findManyNearbyParams, GymsRepository } from '../gyms-repository'
import { prisma } from 'lib/prisma'
export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findManyNearby({ UserLatitude, UserLongitude }: findManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${UserLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${UserLongitude}) ) + sin( radians(${UserLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }

  async findMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return gyms
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }
}
