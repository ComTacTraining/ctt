const priceId = process.env.STRIPE_PRICE_ID

export default async (_req, res) => {
  res.status(200).json({ priceId: priceId })
}
