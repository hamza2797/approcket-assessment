import React from 'react';
import conversationService from '../services/conversationService';



class MessageList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      conversationId:'',
      messagesList:[]
    }
  }

  componentWillReceiveProps(newProps) {
    if(Object.entries(newProps.messageFromParent).length > 0){
      this.setState(prevState => ({
        messagesList: [...prevState.messagesList, newProps.messageFromParent]
      }))
    }
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