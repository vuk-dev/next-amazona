import React from 'react'
import { useRouter } from 'next/router'
import data from '../../utils/data'
import { Typography } from '@material-ui/core'

export default function ProductScreen() {
	const router = useRouter()
	const { slug } = router.query
	const product = data.products.find((product) => product.slug === slug)
	if (!product) {
		return <Typography>Product not found</Typography>
	}
	if (product) {
		return (
			<div>
				<Typography variant={'h5'}>{product.name}</Typography>
			</div>
		)
	}
}
