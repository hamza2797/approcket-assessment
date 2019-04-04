import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import userService from '../services/userService';
import conversationService from '../services/conversationService';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleIcon from '@material-ui/icons/People';

var tempArr = [];

class AddFriend extends React.Component {

    state = {
        open: false,
        name: '',
        suggestions: []
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    

    handleNameChange = name => event => {
        this.setState({ [name]: event.target.value });
        this.search();
    };

    search(){
        let id = localStorage.getItem('userId');
        userService.searchUser(this.state.name, id)
            .then((resp) => {
                console.log(resp.data);
                this.setState({ suggestions: resp.data });
            })
    }

    handleAdd = idToAdd => {
        console.log('here = ' + idToAdd)
        const body = {
            user1: localStorage.getItem('userId'),
            user2: idToAdd
        }
        conversationService.addPrivateConversation(body);
    }

    showSuggestions() {
        let username = localStorage.getItem('username')
        
        return this.state.suggestions.map((object, i) => {
            return  <Button key={i} color="primary" onClick={this.handleAdd(object.username)}>
                {object.username}
            </Button>
        });
    }

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Enter User to add</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <TextField
                                id="standard-name"
                                label="Name"
                                autoComplete="off"
                                onChange={this.handleNameChange('name')}
                                value={this.state.name}
                                margin="normal"
                            />
                            <div>
                            {this.state.suggestions.map(person => (
                            <ul key={person.username}>
                                <li>{person.username}</li>
                                <Button
                                variant="primary"
                                onClick={this.handleAdd.bind(this, person._id)}
                                >
                                add
                                </Button>
                            </ul>
                            ))}
                            </div>
                        </DialogContentText>
                    </DialogContent>

                </Dialog>
            </div>
        );
    }
}

export default AddFriend;