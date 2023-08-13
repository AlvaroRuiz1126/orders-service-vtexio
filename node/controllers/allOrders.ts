export async function allOrders(ctx: Context) {
  const {
    clients: { orders },
  } = ctx
  const allOrders = await orders.getOrders()

  ctx.body = allOrders
}
