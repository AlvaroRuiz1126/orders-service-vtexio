export async function allOrders(ctx: Context) {
  const {
    clients: { orders },
  } = ctx

  try {
    const allOrders = await orders.getOrders()
    ctx.body = allOrders
  } catch (error) {
    console.log(error.response)
    throw new Error(error.response)
  }
}
