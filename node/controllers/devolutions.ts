import { json } from 'co-body'

export async function createDevolutions(ctx: Context) {
  const {
    clients: {
      // conversion,
      // devolutions,
      orders,
    },
    req,
  } = ctx
  // let trm

  try {
    const returnBody = await json(req)
    const { orderId, paymentMethod } = returnBody
    const orderItems = await orders.getOrderById(orderId)
    console.log({ orderItems })
    if (paymentMethod === 'dollars') {
      // trm = await conversion.getTRM()
    }

    // const devolutionResponse = await devolutions.save(returnBody)
    // console.log({ devolutionResponse })

    // ctx.body = { devolutionResponse, trm }
  } catch (error) {
    console.log(error)
    throw new Error(`Invalid json format: ${error}`)
  }
}

export async function getDevolution(ctx: Context) {
  const {
    clients: { devolutions },
    req,
    vtex: {
      route: { params },
    },
  } = ctx
  const { orderId } = params

  try {
    const { status: statusToUpdate } = await json(req)
    const [orderReturnInfo] = await devolutions.search(
      { page: 1, pageSize: 10 },
      ['_all'],
      '',
      `orderId=${orderId}`
    )
    const { id, status } = orderReturnInfo

    if (status === 'created' && statusToUpdate === 'in-revision') {
      const updateOrderStatus = await devolutions.update(id, {
        orderId,
        status: statusToUpdate,
      })
      ctx.body = { orderReturnInfo, updateOrderStatus }

      return
    }

    if (
      status === 'in-revision' &&
      (statusToUpdate === 'rejected' || statusToUpdate === 'paid')
    ) {
      const updateOrderStatus = await devolutions.update(id, {
        orderId: '1353670506554-01',
        status: statusToUpdate,
      })
      ctx.body = { orderReturnInfo, updateOrderStatus }

      return
    }

    ctx.status = 400
    ctx.body = {
      message: 'Update failed',
    }
  } catch (error) {
    console.log(error.response.data.errors[0].errors)
    throw new Error(error)
  }
}
