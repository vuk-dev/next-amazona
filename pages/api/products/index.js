import nc from 'next-connect'
import Product from '../../../models/Product'
import connectDB from '../../../utils/db'

const handler = nc()

handler.get(async (req, res) => {
	await connectDB()
	const products = await Product.find({})
	res.send(products)
})

export default handler
