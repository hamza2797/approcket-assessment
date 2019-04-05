import React from 'react';
import conversationService from '../services/conversationService';
import InputArea from "./InputArea";
import messageService from '../services/messageService';

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
  

  generateMessageList() {
    
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

  addMessage(text){
    let id = localStorage.getItem('userId');
    const body = {
      conversationId: this.state.conversationId,
      sender: id,
      text:text
    }
    console.log(body);
    messageService.add(body)
  }

  render() {
    let inputComponent;
 
    if (this.state.conversationId) {
      inputComponent = <InputArea  conversationIdFromParent={this.state.conversationId} triggerParentUpdate={this.addMessage.bind(this)} />
    } 
    return (
      <div>
          <h1>{this.generateMessageList()}</h1>
          <div className="message-input">
            {inputComponent}
          </div>
          
      </div>
    );
  }

}

export default MessageList;