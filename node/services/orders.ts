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
