import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
	navbar: {
		backgroundColor: '#203040',
		'& a': {
			color: '#fff',
			marginLeft: 10,
		},
	},
	main: {
		minHeight: '80vh',
	},
	grow: {
		flexGrow: 1,
	},
	footer: {
		marginTop: '10px',
		textAlign: 'center',
	},
	brand: {
		fontWeight: 'bold',
		fontSize: '1.5rem',
	},
	section: {
		marginTop: '10px',
		marginBottom: '10px',
	},
	form: {
		maxWidth: 800,
		margin: '0 auto',
	},
})

export default useStyles
