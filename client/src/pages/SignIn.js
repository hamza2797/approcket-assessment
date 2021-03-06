import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import userService from '../services/userService';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom';
let localName = '';
const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
});

class SignIn extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username:'',
			password:''
		}
		localName = localStorage.getItem('username');
	}

	onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit = (e) => {
		e.preventDefault();
		
	    const { username, password } = this.state;
	    
	    
	    if(username && password){
	    	
	    	userService.login(username, password)
	    		.catch(console.log)
	    }
	}


	render() {
		if (localName) {
      
      return <Redirect to='/landing' />
    }
		const { classes } = this.props;
				return (
				    <main className={classes.main}>
				      <CssBaseline />
				      <Paper className={classes.paper}>
				        <Avatar className={classes.avatar}>
				          <LockOutlinedIcon />
				        </Avatar>
				        <Typography component="h1" variant="h5">
				          Sign in
				        </Typography>
				        <form className={classes.form}>
				          <FormControl margin="normal" required fullWidth>
				            <InputLabel htmlFor="username">username</InputLabel>
				            <Input name="username" autoFocus onChange={this.onChange}/>
				          </FormControl>
				          <FormControl margin="normal" required fullWidth>
				            <InputLabel htmlFor="password">Password</InputLabel>
				            <Input name="password" type="password" onChange={this.onChange}/>
				          </FormControl>
									<span>
										<Link to={{
															pathname: '/register'
													}}>
											<button type="button" className="btn btn-success">Click here to register</button>
										</Link>
									</span>
				          <Button
				            type="submit"
				            fullWidth
				            variant="contained"
				            color="primary"
				            className={classes.submit}
				            onClick={this.onSubmit}
				          >
				            Sign in
				          </Button>
				        </form>
				      </Paper>
				    </main>
				  );
	}
}

SignIn.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);