import Layout from '../components/Layout'
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@material-ui/core'
import NextLink from 'next/link'
import Product from '../models/Product'
import dbConnect from '../utils/db'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Store } from '../utils/Store'

export default function Home({ products }) {
	const router = useRouter()
	const { state, dispatch } = useContext(Store)
	const addToCartHandler = async (product) => {
		const existItem = state.cart.cartItems.find(
			(item) => item._id === product._id,
		)
		const quantity = existItem ? existItem.quantity + 1 : 1
		const { data } = await axios.get(`/api/products/${product._id}`)

		if (data.countInStock < quantity) {
			window.alert('Sorry, Product is out of stock')
		}

		dispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...product, quantity },
		})
		router.push('/cart')
	}
	return (
		<Layout>
			<div>
				<h1>Products</h1>
				<Grid container spacing={3}>
					{products.map((product) => (
						<Grid item md={4} key={product.name}>
							<Card>
								<NextLink
									href={`/product/${product.slug}`}
									passHref
								>
									<CardActionArea>
										<CardMedia
											component='img'
											image={product.image}
											title={product.name}
										/>
										<CardContent>
											<Typography>
												{product.name}
											</Typography>
										</CardContent>
									</CardActionArea>
								</NextLink>
								<CardActions>
									<Typography>$ {product.price}</Typography>
									<Button
										size='small'
										color='primary'
										onClick={() =>
											addToCartHandler(product)
										}
									>
										Add to cart
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		</Layout>
	)
}

export async function getServerSideProps() {
	await dbConnect()
	const products = await Product.find({}).lean()
	return {
		props: {
			products: products.map((elem) => ({
				...elem,
				_id: elem._id.toString(),
				createdAt: elem.createdAt.toString(),
				updatedAt: elem.createdAt.toString(),
			})),
		},
	}
}
