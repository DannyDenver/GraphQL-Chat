import React from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { useChatMessages } from './hooks';

const Chat = ({user}) => {
  // const [messages, setMessages] = useState([]); // apollo cache will store
  const {messages, addMessage} = useChatMessages();

    const handleSend = async (text) => {
        await addMessage(text);
    };

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


// const [messages, setMessages] = useState([]); // apollo cache will store

// // renedered once undefined then again with data
// // loading property
//   const {loading, error } = useQuery(messagesQuery, {
//     onCompleted: ({messages}) => setMessages(messages)
//   }); // {variables, fetchPolicy: '..'}
  
//   useSubscription(messageAddedSubscription, {
//     onSubscriptionData: ({subscriptionData}) => {
//       setMessages(messages.concat(subscriptionData.data.messageAdded));
//     }
//   });
  
//   const [addMessage, {loadingMutation, errorMutation}] = useMutation(addMessageMutation);

//   // dont call hooks inside loops, conditions or nested functions
//   // call hooks from react function components
//   // call hooks from custom hooks
//   // const [messages, setMessages] = useState([]);

//   const handleSend = async (text) => {
//       await addMessage({variables: {input: {text}}});
//   };