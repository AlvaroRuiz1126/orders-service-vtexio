import { updateStatusService } from '../../services'

export const updateStatus = async (
  _: void,
  { orderId, status }: { orderId: string; status: Status },
  ctx: Context
) => {
  const updatestatusServiceResponse = await updateStatusService(
    ctx,
    orderId,
    status
  )

  return updatestatusServiceResponse
}
