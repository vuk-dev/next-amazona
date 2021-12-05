import nc from 'next-connect'
import Product from '../../../models/Product'
import dbConnect from '../../../utils/db'

const handler = nc()

handler.get(async (req, res) => {
	await dbConnect()
	const product = await Product.findById(req.query.id)
	res.send(product)
})

export default handler
