import { IOContext, InstanceOptions, JanusClient } from '@vtex/api'

export default class Orders extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdclientAutCookie: context.authToken,
      },
    })
  }

  public async getOrders() {
    const today = new Date()
    const lastMonth = today.getUTCMonth()
    const day = today.getDate()
    const year = today.getFullYear()
    const dateLastMonth = new Date(`${year}-${lastMonth}-${day}`)

    try {
      const { list } = await this.http.get(`/api/oms/pvt/orders`, {
        params: {
          f_creationDate: `creationDate:[${dateLastMonth.toISOString()} TO ${today.toISOString()}]`,
          f_status: 'invoiced',
        },
      })

      return list
    } catch (e) {
      console.log(e.response)
      throw new Error(e.response)
    }
  }

  public async getOrderById(orderId: string) {
    try {
      const order = await this.http.get(`/api/oms/pvt/orders/${orderId}`)

      return order
    } catch (error) {
      console.log(error.response)
      throw new Error(error.response)
    }
  }
}
