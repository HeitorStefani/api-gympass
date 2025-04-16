import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  countById(id: string): Promise<number>
  findById(checkInId: string): Promise<CheckIn | null>
  findManyById(userId: string, page: number): Promise<CheckIn[]>
  findByUserIdOnDate(date: Date, userId: string): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
}
