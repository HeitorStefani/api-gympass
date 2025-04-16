import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkins-repository'
import { ResourceNotFoundError } from './error/resource-not-found'
import dayjs from 'dayjs'
import { TimeLimitExceededError } from './error/time-limit-exceeded'

interface ValidateCheckInUserRequest {
  checkInId: string
}

interface ValidateCheckInUserResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUserRequest): Promise<ValidateCheckInUserResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new TimeLimitExceededError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
