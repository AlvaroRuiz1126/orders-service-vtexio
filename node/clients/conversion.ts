import { ExternalClient, IOContext, InstanceOptions } from '@vtex/api'

export default class Conversion extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://www.datos.gov.co', context, {
      ...options,
      headers: {
        'X-Vtex-Use-Https': 'true',
        VtexIdclientAutCookie: context.authToken,
      },
    })
  }

  public async getTRM() {
    try {
      const [actualTRM] = await this.http.get('/resource/32sa-8pi3.json')

      return actualTRM
    } catch (error) {
      console.log(error.response)
      throw new Error(error.response)
    }
  }
}
