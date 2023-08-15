import { getOrders } from '../../services'

export const allOrders = async (_: void, __: void, ctx: Context) => {
  const orderServiceResponse = await getOrders(ctx)

  return orderServiceResponse
}
