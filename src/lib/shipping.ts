export const shippingMethods = [
  {key: 'standard', name: 'Standard', charge: 100},
  {key: 'express', name: 'Express', charge: 200},
  {key: 'pickup', name: 'Store Pickup', charge: 0}
] as const;

export const shippingMethodIds = ['standard','express','pickup'] as const;