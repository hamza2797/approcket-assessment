import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import conversationService from '../services/conversationService';

class ListItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    let id = localStorage.getItem('userId');
    
    conversationService.getConversationsByUserId(id)
      .then(resp => {
        this.setState({
          list: resp.data
        })
      })
  }

  handleClick(id){
    console.log('here = ' + id);
  }

  getConversations() {
    let username = localStorage.getItem('username');
    return this.state.list.map((object, i) => {
      if(object.__t === 'private'){
        if (object.user1.username === username) {
          return <ListItem button key={i} onClick={() => this.props.triggerParentUpdate(object._id)}>
            <ListItemText primary={object.user2.username} />
          </ListItem>
        }
        else{
          return <ListItem button key={i} onClick={() => this.props.triggerParentUpdate(object._id)}>
            <ListItemText primary={object.user1.username} />
          </ListItem>
        }
      }
      else{
        return <ListItem button key={i} onClick={() => this.props.triggerParentUpdate(object._id)}>
            <ListItemText primary={object.groupName} />
          </ListItem>
      }
    });
  }
  render() {
    return (
      <div>
        {this.getConversations()}
      </div>
    );
  }






}

export default ListItems;