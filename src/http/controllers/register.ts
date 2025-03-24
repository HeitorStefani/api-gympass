import { UserAlreadyExistsError } from '@/services/error/user-already-exists'
import { makeRegisterUseCase } from '@/services/factory/make-register-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function register(
  request: FastifyRequest,

  response: FastifyReply,
) {
  const userCreateSchema = z.object({
    name: z.string(),

    email: z.string().email(),

    password: z.string().min(6),
  })

  const { name, email, password } = userCreateSchema.parse(request.body)

  const registerUseCase = makeRegisterUseCase()

  try {
    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return response.status(409).send({ message: err.message })
    } else {
      return response.status(500).send()
    }
  }
}
