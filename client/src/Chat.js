import React, { useState } from 'react';
import { addMessage, getMessages, onMessageAdded } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({user}) => {
    // dont call hooks inside loops, conditions or nested functions
    // call hooks from react function components
    // call hooks from custom hooks
    const [messages, setMessages] = useState([]);

    const handleSend = (text) => {
        const message = {id: text, from: 'you', text};
        setMessages(messages.concat(message));
        await addMessage(text);
      }

    return (
        <section className="section">
        <div className="container">
          <h1 className="title">Chatting as {user}</h1>
          <MessageList user={user} messages={messages} />
          <MessageInput onSend={handleSend} />
        </div>
      </section>
    );
};

export default Chat;