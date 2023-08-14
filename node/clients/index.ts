import { IOClients } from '@vtex/api'
import { masterDataFor } from '@vtex/clients'
// import { Devolutions } from 'itglobers.orders-service'

import Status from './status'
import Orders from './orders'
import Conversion from './conversion'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get conversion() {
    return this.getOrSet('conversion', Conversion)
  }

  public get orders() {
    return this.getOrSet('orders', Orders)
  }

  public get devolutions() {
    return this.getOrSet('devolutions', masterDataFor('devolutions'))
  }
}
