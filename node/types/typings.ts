interface DevolutionData {
  description: string
  orderId: string
  paymentMethod: PaymentMethod
  status: Status
}

enum PaymentMethod {
  dollars = 'dollars',
  bond = 'bond',
}

enum Status {
  created = 'created',
  inRevision = 'in_revision',
  rejected = 'rejected',
  paid = 'paid',
}
