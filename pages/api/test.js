export default (_req, res) => {
  res.statusCode = 200
  res.json({ pk: process.env.TRANSCRIBE_ACCESS_ID })
}
