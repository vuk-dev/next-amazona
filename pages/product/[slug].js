import React, { useContext } from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import {
	Button,
	Card,
	Grid,
	Link,
	List,
	ListItem,
	Typography,
} from '@material-ui/core'
import Layout from '../../components/Layout'
import useStyles from '../../utils/styles'
import Product from '../../models/Product'
import dbConnect from '../../utils/db'
import axios from 'axios'
import { Store } from '../../utils/Store'
import { useRouter } from 'next/router'

export default function ProductScreen({ product }) {
	const router = useRouter()
	const { dispatch } = useContext(Store)
	const classes = useStyles()

	const addToChartHandler = async () => {
		const { data } = await axios.get(`/api/products/${product._id}`)

		if (data.countInStock <= 0) {
			window.alert('Sorry, Product is out of stock')
		} else {
			dispatch({
				type: 'CART_ADD_ITEM',
				payload: { ...product, quantity: 1 },
			})
			router.push('/cart')
		}
	}

	if (!product) {
		return <Typography>Product not found</Typography>
	}
	if (product) {
		return (
			<Layout title={product.name} description={product.description}>
				<div className={classes.section}>
					<NextLink href={'/'} passHref>
						<Link>Back to products</Link>
					</NextLink>
				</div>
				<Grid container spacing={1}>
					<Grid item md={6} xs={12}>
						<Image
							src={product.image}
							alt={product.description}
							width={640}
							height={640}
							layout={'responsive'}
						/>
					</Grid>
					<Grid item md={3} xs={12}>
						<List>
							<ListItem>
								<Typography component={'h1'} variant={'h1'}>
									{product.name}
								</Typography>
							</ListItem>
							<ListItem>
								<Typography>
									Category: {product.category}
								</Typography>
							</ListItem>
							<ListItem>
								<Typography>Brand: {product.brand}</Typography>
							</ListItem>
							<ListItem>
								<Typography>
									Rating: {product.rating} stars{' '}
									{product.numReviews} reviews
								</Typography>
							</ListItem>
							<ListItem>
								<Typography>
									Description: {product.description}
								</Typography>
							</ListItem>
						</List>
					</Grid>
					<Grid item md={3} xs={12}>
						<Card>
							<List>
								<ListItem>
									<Grid container>
										<Grid item xs={6}>
											<Typography>Price</Typography>
										</Grid>
										<Grid item xs={6}>
											<Typography>
												{product.price}
											</Typography>
										</Grid>
									</Grid>
								</ListItem>
								<ListItem>
									<Grid container>
										<Grid item xs={6}>
											<Typography>Status</Typography>
										</Grid>
										<Grid item xs={6}>
											<Typography>
												{product.countInStock > 0
													? 'In stock'
													: 'Unavailable'}
											</Typography>
										</Grid>
									</Grid>
								</ListItem>
								<ListItem>
									<Button
										fullWidth
										variant={'contained'}
										color={'primary'}
										onClick={addToChartHandler}
									>
										Add to cart
									</Button>
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			</Layout>
		)
	}
}

export async function getServerSideProps(context) {
	const { slug } = context.params
	await dbConnect()
	const product = await Product.findOne({ slug }).lean()
	return {
		props: {
			product: {
				...product,
				_id: product._id.toString(),
				createdAt: product.createdAt.toString(),
				updatedAt: product.createdAt.toString(),
			},
		},
	}
}
