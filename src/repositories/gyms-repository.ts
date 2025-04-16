import { Gym, Prisma } from '@prisma/client'

export interface findManyNearbyParams {
  UserLatitude: number
  UserLongitude: number
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findManyNearby(params: findManyNearbyParams): Promise<Gym[]>
  findMany(query: string, page: number): Promise<Gym[]>
  findById(id: string): Promise<Gym | null>
}
