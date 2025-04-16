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
    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await response.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return response.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentials) {
      return response.status(409).send({ message: err.message })
    } else {
      return response.status(500).send()
    }
  }
}
