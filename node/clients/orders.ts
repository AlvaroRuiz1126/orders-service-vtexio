import { IOContext, InstanceOptions, JanusClient } from '@vtex/api'
// import { devolutionsSchema } from '../schemas'

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
      const { list } = await this.http.get(
        `/api/oms/pvt/orders?f_invoicedDate=invoicedDate:[${dateLastMonth} TO ${today}]`
      )

      return list
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }

  public async getOrderById(orderId: string) {
    try {
      const order = await this.http.get(`/api/oms/pvt/orders/${orderId}`)
      console.log({ order })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}
