import { getOrders } from '../services'

export async function allOrders(ctx: Context) {
  //   const {
  //     clients: { orders },
  //   } = ctx

  try {
    // const allOrders = await orders.getOrders()
    const orderServiceResponse = await getOrders(ctx)
    ctx.body = orderServiceResponse
  } catch (error) {
    console.log(error.response)
    throw new Error(error.response)
  }
}
