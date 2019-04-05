import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import conversationService from '../services/conversationService';

class ListItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isFirstIdUpdate: false
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

  componentWillReceiveProps(newProps) {
    let id = localStorage.getItem('userId');
    conversationService.getConversationsByUserId(id)
      .then(resp => {
        console.log(resp);
        this.setState({
          list: resp.data
        })
      })
  }

  


  getConversations() {
    let username = localStorage.getItem('username');
    if (!this.state.isFirstIdUpdate && this.state.list && this.state.list.length > 0) {
      this.props.triggerParentUpdate(this.state.list[0]._id);
      this.setState({
        isFirstIdUpdate: true
      })
    }
    if (this.state.list && this.state.list.length > 0) {
      return this.state.list.map((object, i) => {
        if (object.__t === 'private') {
          if (object.user1.username === username) {
            return <ListItem button key={i} onClick={() => this.props.triggerParentUpdate(object._id)}>
              <ListItemText primary={object.user2.username} />
            </ListItem>
          }
          else {
            return <ListItem button key={i} onClick={() => this.props.triggerParentUpdate(object._id)}>
              <ListItemText primary={object.user1.username} />
            </ListItem>
          }
        }
        else {
          return <ListItem button key={i} onClick={() => this.props.triggerParentUpdate(object._id)}>
            <ListItemText primary={object.groupName} />
          </ListItem>
        }
      });
    }

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