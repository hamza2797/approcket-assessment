import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});


class InputArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onSubmit = (e) => {
		e.preventDefault();
		console.log('on submit');
	}
  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit}>
        <TextField
          id="standard-full-width"
          required
          name='text'
          label="Label"
          style={{ margin: 8 }}
          placeholder="text here"
          helperText="press enter to send"
          fullWidth
          margin="normal"
          onChange={this.handleChange('text')}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </form>
      </div>
    );
  }

}

InputArea.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputArea);