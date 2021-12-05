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
import data from '../utils/data'

export default function Home({ products }) {
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
									<Button size='small' color='primary'>
										Add to chart
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
