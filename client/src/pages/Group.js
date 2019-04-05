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
var id = localStorage.getItem('userId');
tempArr.push(id)

class Group extends React.Component {

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
        if(this.state.name && this.state.open){
            const body = {
                userList: tempArr,
                groupName: this.state.name
            }
            conversationService.addPublicConversation(body)
                .then((resp) => { 
                    conversationService.addUserToGroup(resp.data._id, tempArr);
                    this.props.triggerParentUpdate(resp.data._id);
                })
        }
        this.setState({ open: false });
    };

    handleNameChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleChange = userId => event => {
        if (tempArr.indexOf(userId) > -1) {
            var index = tempArr.indexOf(userId);
            if (index > -1) {
                tempArr.splice(index, 1);
            }
        }
        else {
            tempArr.push(userId);
        }
    };

    componentDidMount() {
        userService.getAll()
            .then((resp) => {
                
                this.setState({
                    userList: resp.data
                })
            })
    }

    generateCheckBoxes() {
        
        let username = localStorage.getItem('username');
        return this.state.userList.map((object, i) => {
            if(object.username !== username){
                return <FormControlLabel key={i} control={<Checkbox onChange={this.handleChange(object._id)} />}label={object.username}/>
            }
        });
    }
    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Create a group
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

export default Group;