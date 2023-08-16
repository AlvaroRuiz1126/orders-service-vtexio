import { conversionService } from './conversion'
import { getOrderById } from './orders'

export const createDevolutionService = async (
  ctx: Context,
  { data }: { data: DevolutionData & { id: string; items: string } }
) => {
  const {
    clients: { devolutions },
  } = ctx

  try {
    const { items } = await getOrderById(ctx, data?.orderId)
    data.items = JSON.stringify(items)
    const devolutionsResponse = await devolutions.save(data)

    if (data?.paymentMethod === 'dollars') {
      const trm = await conversionService(ctx)

      return {
        devolutionsResponse,
        trm,
      }
    }

    return { devolutionsResponse }
  } catch (error) {
    console.log(error?.response?.data?.errors[0].errors)
    throw new Error(error?.response)
  }
}

export const updateStatusService = async (
  ctx: Context,
  orderId: string,
  status: string
) => {
  const {
    clients: { devolutions },
  } = ctx
  const statusToUpdate = status

  try {
    const [devolutionInfo] = await devolutions.search(
      { page: 1, pageSize: 10 },
      ['_all'],
      '',
      `orderId=${orderId}`
    )
    const { id, status: statusBeforeUpdate } = devolutionInfo

    if (statusBeforeUpdate === 'created' && statusToUpdate === 'in_revision') {
      await devolutions.update(id, {
        orderId,
        status: statusToUpdate,
      })

      return 'Devolution updated'
    }

    if (
      statusBeforeUpdate === 'in_revision' &&
      (statusToUpdate === 'rejected' || statusToUpdate === 'paid')
    ) {
      await devolutions.update(id, {
        orderId,
        status: statusToUpdate,
      })

      return 'Devolution updated'
    }

    return 'Failed'
  } catch (error) {
    console.log(error?.response)
    throw new Error(error?.response)
  }
}
