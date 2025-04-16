import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    await request.jwtVerify()
  } catch {
    response.status(404).send({ message: 'Unauthorized' })
  }
}
