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
    vtex: {
      route: { params },
    },
  } = ctx
  const { orderId } = params

  try {
    const response = await devolutions.search(
      { page: 1, pageSize: 10 },
      ['_all'],
      '',
      `orderId=${orderId}`
    )

    // const deleteReturn = await devolutions.delete('')
    ctx.body = response
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
