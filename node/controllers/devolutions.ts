import { json } from 'co-body'

export async function createDevolutions(ctx: Context) {
  const {
    clients: { conversion, devolutions, orders },
    req,
  } = ctx
  let trm

  try {
    const returnBody = await json(req)
    const { orderId, paymentMethod } = returnBody
    const order = await orders.getOrderById(orderId)
    const { items } = order
    returnBody.items = JSON.stringify(items)
    const devolutionResponse = await devolutions.save(returnBody)

    if (paymentMethod === 'dollars') {
      trm = await conversion.getTRM()
      ctx.body = {
        devolutionResponse,
        trm,
      }

      return
    }

    ctx.body = { devolutionResponse }
  } catch (error) {
    console.log(error?.response)
    throw new Error(`Invalid json format: ${error.response}`)
  }
}

export async function updateStatus(ctx: Context) {
  const {
    clients: { devolutions },
    req,
    vtex: {
      route: { params },
    },
  } = ctx
  const { orderId } = params as { orderId: string }

  try {
    const { status: statusToUpdate } = await json(req)
    const [orderReturnInfo] = await devolutions.search(
      { page: 1, pageSize: 10 },
      ['_all'],
      '',
      `orderId=${orderId}`
    )
    const { id, status } = orderReturnInfo

    if (status === 'created' && statusToUpdate === 'in_revision') {
      const updateOrderStatus = await devolutions.update(id, {
        orderId,
        status: statusToUpdate,
      })
      ctx.body = { orderReturnInfo, updateOrderStatus }

      return
    }

    if (
      status === 'in_revision' &&
      (statusToUpdate === 'rejected' || statusToUpdate === 'paid')
    ) {
      const updateOrderStatus = await devolutions.update(id, {
        orderId,
        status: statusToUpdate,
      })
      ctx.body = { orderReturnInfo, updateOrderStatus }

      return
    }

    ctx.status = 400
    ctx.body = {
      orderReturnInfo,
      message: 'Update failed',
    }
  } catch (error) {
    console.log(error.response.data.errors[0].errors)
    throw new Error(error.response.data.errors[0].errors)
  }
}
