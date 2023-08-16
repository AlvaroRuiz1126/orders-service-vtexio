import { getOrders } from '../services'

export async function allOrders(ctx: Context) {
  try {
    const orderServiceResponse = await getOrders(ctx)
    ctx.body = orderServiceResponse
  } catch (error) {
    console.log(error.response)
    throw new Error(error.response)
  }
}
