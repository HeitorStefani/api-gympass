import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentials } from './error/invalid-credentials'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
interface authenticateUserRequest {
  email: string
  password: string
}

interface authenticateUserResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: authenticateUserRequest): Promise<authenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentials()
    }

    const isThePasswordsMatch = await compare(password, user.password_hash)

    if (!isThePasswordsMatch) {
      throw new InvalidCredentials()
    }

    return {
      user,
    }
  }
}
