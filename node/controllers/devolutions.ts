import { json } from 'co-body'
import { createDevolutionService, updateStatusService } from '../services'

export async function createDevolutions(ctx: Context) {
  const { req } = ctx

  try {
    const returnBody = (await json(req)) as DevolutionData & {
      id: string
      items: string
    }
    const data = { data: returnBody }
    const devolutionCreated = await createDevolutionService(ctx, data)

    ctx.body = { devolutionCreated }
  } catch (error) {
    console.log(error?.response)
    throw new Error(`Invalid json format: ${error.response}`)
  }
}

export async function updateStatus(ctx: Context, next: () => Promise<any>) {
  const {
    req,
    vtex: {
      route: { params },
    },
  } = ctx
  const { orderId } = params as { orderId: string }

  try {
    const { status: statusToUpdate } = await json(req)
    const updateMessage = await updateStatusService(
      ctx,
      orderId,
      statusToUpdate
    )

    if (updateMessage === 'Failed') {
      ctx.status = 400
      ctx.body = updateMessage
    }

    ctx.status = 201
    ctx.body = updateMessage

    await next()
  } catch (error) {
    console.log(error.response.data.errors[0].errors)
    throw new Error(error.response.data.errors[0].errors)
  }
}
