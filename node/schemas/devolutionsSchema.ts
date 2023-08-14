export const devolutionsSchema = {
  type: 'object',
  properties: {
    orderId: {
      type: 'string',
      maxLength: 50,
      title: 'Order ID',
    },
    description: {
      type: 'string',
      maxLength: 750,
      title: 'Description',
    },
    paymentMethod: {
      enum: ['dollars', 'bond'],
      title: 'Payment Method',
    },
    items: {
      type: 'string',
      maxLength: 750,
      title: 'Items',
    },
    status: {
      title: 'Status',
      enum: ['created', 'in-revision', 'rejected', 'paid'],
    },
  },
}
