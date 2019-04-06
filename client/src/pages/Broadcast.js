import React from 'react';
import broadcastService from '../services/broadcastService';
import InputArea from "./InputArea";
import messageService from '../services/messageService';

class MessageList extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {
      conversationId: '',
      messagesList: []
    }
    broadcastService.getBroadcast()
      .then((resp) => {
        
        this.setState({
          messagesList: resp.data,
          conversationId: 'broadcast'
        })
      })

  }

  addMessage(text) {
    let id = localStorage.getItem('userId');
    const body = {
      sender: id,
      text: text
    }
    broadcastService.sendBroadcast(body)
    this.setState(prevState => ({
      messagesList: [...prevState.messagesList, body]
    }))

  }



  generateMessageList() {
    let id = localStorage.getItem('userId');
    return this.state.messagesList.map((object, i) => {
      if (object.sender === id) {
        return <p id="right" key={i}>{object.text}</p>
      }
      else {
        return <p id="left" key={i}>{object.text}</p>
      }
    });
  }

  render() {
    let inputComponent;

    if (this.state.conversationId) {
      inputComponent = <InputArea conversationIdFromParent={this.state.conversationId} triggerParentUpdate={this.addMessage.bind(this)} />
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