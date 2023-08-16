export const conversionService = async (ctx: Context) => {
  const {
    clients: { conversion },
  } = ctx

  try {
    const trm = await conversion.getTRM()

    return trm
  } catch (error) {
    console.log(error?.response)
    throw new Error(error)
  }
}
