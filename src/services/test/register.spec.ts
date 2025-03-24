import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from '../register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../error/user-already-exists'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(inMemoryUsersRepository)
  })
  it('should register a new user', async () => {
    await sut
      .execute({
        name: 'John Doe',
        email: '2D2oF@example.com',
        password: '123456',
      })
      .then((response) => {
        expect(response.user.id).toEqual(expect.any(String))
      })
  })
  it('should not be able to register with same email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: '2D2oF@example.com',
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'John Doe',
        email: '2D2oF@example.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
