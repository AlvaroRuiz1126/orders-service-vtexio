import { createDevolution } from './mutations/createDevolution'
import { updateStatus } from './mutations/updateStatus'
import { allOrders } from './queries/allOrders'

export const resolvers = {
  Query: {
    allOrders,
  },
  Mutation: {
    createDevolution,
    updateStatus,
  },
}
