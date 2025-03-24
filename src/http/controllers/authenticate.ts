import { InvalidCredentials } from '@/services/error/invalid-credentials'
import { makeAuthenticateUseCase } from '@/services/factory/make-auth-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const userCreateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = userCreateSchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  try {
    await authenticateUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentials) {
      return response.status(409).send({ message: err.message })
    } else {
      return response.status(500).send()
    }
  }
}
