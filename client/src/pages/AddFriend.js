import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import userService from '../services/userService';
import conversationService from '../services/conversationService';
var tempArr = [];

class AddFriend extends React.Component {

    state = {
        open: false,
        userList: [],
        toAddList: [],
        name:''
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        const body = {
            userList: tempArr,
            groupName: this.state.name
        }
        conversationService.addPublicConversation(body)
            .then((resp) => {
                console.log(resp.data._id);
                conversationService.addUserToGroup(resp.data._id, tempArr);
            })
        this.setState({ open: false });
    };

    handleNameChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleChange = userId => event => {
        console.log('array before');
        console.log(tempArr);
        console.log('array after')
        if (tempArr.indexOf(userId) > -1) {
            console.log('user does exist');
            var index = tempArr.indexOf(userId);
            if (index > -1) {
                tempArr.splice(index, 1);
            }
        }
        else {
            console.log('user doesnt exists');
            tempArr.push(userId);
        }
        console.log(tempArr)
    };

    componentDidMount() {
        userService.getAll()
            .then((resp) => {
                console.log(resp.data);
                this.setState({
                    userList: resp.data
                })
            })
    }

    generateCheckBoxes() {
        console.log('inside gen')
        return this.state.userList.map((object, i) => {
            return <FormControlLabel key={i} control={<Checkbox onChange={this.handleChange(object._id)} />
            }
                label={object.username}
            />
        });
    }
    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Add Friend
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Select List of people to add to group</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        <TextField
                        id="standard-name"
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleNameChange('name')}
                        margin="normal"
                        />
                            <div>
                                {this.generateCheckBoxes()}
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddFriend;