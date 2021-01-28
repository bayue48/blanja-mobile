import React, { Component } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import {API_URL} from "@env"
import io from "socket.io-client"

class ChatRoom extends Component {

  constructor(props){
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: []
    }
  }

  
  componentDidMount = () => {
    this.socket = io(API_URL)
    this.socket.on("chat message", msg => {
      this.setState({
        chatMessages: [...this.state.chatMessages, msg]
      })
    })
  }

  componentWillUnmount = () => {

  }

  submitChatMessage = () => {
    this.socket.emit("chat message", this.state.chatMessage)
    this.setState({
      chatMessage: ""
    })
  }

  render() {

    const chatMessages = this.state.chatMessages.map((chatMessage,index) => 
    <View key={index} style={{minHeight:30, minWidth: 100,maxHeight: 1000, maxWidth: 200, backgroundColor: 'orange', borderRadius: 20, justifyContent: 'center', padding: 10, marginTop: 30}}>
      <Text >{chatMessage}</Text>
    </View>
      )
    
    return (
      <KeyboardAvoidingView>
        <View style={styles.container}>
          {chatMessages}
        </View>
        <View style={styles.input}>
          <TextInput 
          autoCorrect={false} 
          placeholder="Input Chat"
          value={this.state.chatMessage}
          onSubmitEditing={() => {
            this.submitChatMessage()
          }}
          onChangeText ={chatMessage => {
            this.setState({chatMessage})
          }}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    backgroundColor: 'white'
  },
  container: {
    height: 670,
    width: '100%',
    backgroundColor: 'lightgrey'
  }
})

export default ChatRoom