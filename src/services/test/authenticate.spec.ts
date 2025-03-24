import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '../authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentials } from '../error/invalid-credentials'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(inMemoryUsersRepository)
  })
  it('should authenticate a new user', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: '2D2oF@example.com',
      password_hash: await hash('123456', 6),
    })

    await sut
      .execute({
        email: '2D2oF@example.com',
        password: '123456',
      })
      .then((response) => {
        expect(response.user.id).toEqual(expect.any(String))
      })
  })
  it('should be able to reject a non existing user', async () => {
    await expect(async () => {
      await sut.execute({
        email: '2D2oF@example.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentials)
  })
  it('should be able to reject a wrong password', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: '2D2oF@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(async () => {
      await sut.execute({
        email: '2D2oF@example.com',
        password: '1234567',
      })
    }).rejects.toBeInstanceOf(InvalidCredentials)
  })
})
