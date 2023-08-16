export const getOrders = async (ctx: Context) => {
  const {
    clients: { orders },
  } = ctx

  try {
    const invoicedOrders = await orders.getOrders()

    return invoicedOrders
  } catch (error) {
    console.log(error?.repsonse)
    throw new Error(error?.repsonse)
  }
}

export const getOrderById = async (ctx: Context, orderId: string) => {
  const {
    clients: { orders },
  } = ctx

  try {
    const order = await orders.getOrderById(orderId)

    return order
  } catch (error) {
    console.log(error?.response)
    throw new Error(error?.response)
  }
}
