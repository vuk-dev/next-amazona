import React, { Fragment, useContext } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import {
	AppBar,
	Container,
	Link,
	Toolbar,
	Typography,
	ThemeProvider,
	CssBaseline,
	createTheme,
	Switch,
	Badge,
} from '@material-ui/core'
import dynamic from 'next/dynamic'

import useStyles from '../utils/styles'
import { Store } from '../utils/Store'

function Layout({ title, description, children }) {
	const { state, dispatch } = useContext(Store)
	const { darkMode, cart } = state
	const theme = createTheme({
		typography: {
			h1: {
				fontSize: '1.6rem',
				fontWeight: 400,
				margin: '1rem 0',
			},
			h2: {
				fontSize: '1.4rem',
				fontWeight: 400,
				margin: '1rem 0',
			},
		},
		palette: {
			type: darkMode ? 'dark' : 'light',
			primary: {
				main: '#f0c000',
			},
			secondary: {
				main: '#208080',
			},
		},
	})
	const classes = useStyles()
	const darkModeChangeHandler = () => {
		const newDarkMode = !darkMode
		return dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
	}
	return (
		<div>
			<Head>
				<title>
					{title ? `${title} - Next Amazona` : 'Next Amazona'}
				</title>
				{description && (
					<meta name={'description'} content={description} />
				)}
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position='static' className={classes.navbar}>
					<Toolbar>
						<NextLink href='/' passHref>
							<Link>
								<Typography className={classes.brand}>
									amazona
								</Typography>
							</Link>
						</NextLink>
						<div className={classes.grow}></div>
						<div>
							<Switch
								checked={darkMode}
								onChange={darkModeChangeHandler}
							/>
							<NextLink href='/cart' passHref>
								<Link>
									{cart.cartItems.length > 0 ? (
										<Badge
											badgeContent={cart.cartItems.length}
											color='secondary'
										>
											Cart
										</Badge>
									) : (
										'Cart'
									)}
								</Link>
							</NextLink>
							<NextLink href='/login' passHref>
								<Link>Login</Link>
							</NextLink>
						</div>
					</Toolbar>
				</AppBar>
				<Container className={classes.main}>{children}</Container>
				<footer className={classes.footer}>
					All rights reserved. Next amazona
				</footer>
			</ThemeProvider>
		</div>
	)
}

export default dynamic(() => Promise.resolve(Layout), { ssr: false })
