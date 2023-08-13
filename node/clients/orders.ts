import { IOContext, InstanceOptions, JanusClient } from '@vtex/api'

export default class Orders extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdclientAutCookie:
          'eyJhbGciOiJFUzI1NiIsImtpZCI6IjRFODcxMzAzNUFEREQzMjVDMDMwMUMwRjAxMkQ0MkI5MzQ5MjM5OTAiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJhbHZhcm8ucnVpekBpdGdsb2JlcnMuY29tIiwiYWNjb3VudCI6Iml0Z2xvYmVycyIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoiNmIzOTkwM2QtYzc1Mi00ZTY3LTg0MDYtNWE2NGQxNTgyY2YxIiwiZXhwIjoxNjkxOTYwNTE2LCJ1c2VySWQiOiIyOTlhYzM3Mi0zMzgxLTQwZWMtYjQ4NC04ZWUyYTdhMGRkMDgiLCJpYXQiOjE2OTE4NzQxMTYsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiI3YTZiY2RiYS01MjZjLTRlYjMtYTVmYy1kYjBhZDA3YTQzNzYifQ.SCma6zvzZmz2IQENJ4aPQr723HK4NKgdkORHqJL9II5-twPV5EucXXS9__VbGDfDTUk_Ag38W7VyWt4yrluG0g',
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
      //   const { list } = await this.http.get(`/api/oms/pvt/orders`)
      const { list } = await this.http.get(
        `/api/oms/pvt/orders?f_invoicedDate=invoicedDate:[${dateLastMonth} TO ${today}]`
      )

      return list
    } catch (e) {
      throw new Error(e)
    }
  }
}
