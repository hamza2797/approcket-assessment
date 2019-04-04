import React from 'react';
import conversationService from '../services/conversationService';
import openSocket from 'socket.io-client';


class MessageList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      conversationId:'',
      messagesList:[]
    }
  }

  componentWillReceiveProps(newProps) {
    conversationService.getMessagesById(newProps.conversationIdFromParent)
      .then(resp => this.setState({
        messagesList: resp.data,
        conversationId:newProps.conversationIdFromParent
      }))
  }
  

  alo() {
    
    let id = localStorage.getItem('userId');
    
    return this.state.messagesList.map((object, i) => {
      
      if(object.sender === id){
        return <p id="right" key={i}>{object.text}</p>
      }
      else{
        return <p id="left" key={i}>{object.text}</p>
      }
      
    });
  }

  render() {
    
    return (
      <div>
          <h1>{this.alo()}</h1>
      </div>
    );
  }

}

export default MessageList;