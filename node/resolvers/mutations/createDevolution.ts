import { createDevolutionService } from '../../services'

export const createDevolution = async (
  _: void,
  returnData: { data: DevolutionData & { id: string; items: string } },
  ctx: Context
) => {
  const devolutionCreated = await createDevolutionService(ctx, returnData)

  return devolutionCreated
}
