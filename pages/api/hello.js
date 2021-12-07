import nc from 'next-connect'
import User from '../../models/User'
import data from '../../utils/data'
import dbConnect from '../../utils/db'

const handler = nc()

handler.get(async (req, res) => {
	await dbConnect()
	const products = await User.insertMany(data.users)
	res.send(products)
})

export default handler
