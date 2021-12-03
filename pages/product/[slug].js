import React from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import data from '../../utils/data'
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

export default function ProductScreen() {
	const classes = useStyles()
	const router = useRouter()
	const { slug } = router.query
	const product = data.products.find((product) => product.slug === slug)
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
								<Typography component={'h1'}>
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
													: 'Unavaiable'}
											</Typography>
										</Grid>
									</Grid>
								</ListItem>
								<ListItem>
									<Button
										fullWidth
										variant={'contained'}
										color={'primary'}
									>
										Add to chart
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