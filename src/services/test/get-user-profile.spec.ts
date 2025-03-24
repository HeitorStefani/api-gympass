import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from '../get-user-profile'
import { ResourceNotFoundError } from '../error/resource-not-found'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })
  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: '2D2oF@example.com',
      password_hash: await hash('123456', 6),
    })

    const userData = await sut.execute({
      userId: createdUser.id,
    })

    expect(userData.user.id).toEqual(expect.any(String))
    expect(userData.user.name).toEqual(expect.any(String))
  })
  it('should be able to get user profile with wrong id', async () => {
    await expect(async () => {
      await sut.execute({
        userId: 'wrong-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
