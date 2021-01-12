import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { messagesQuery, addMessageMutation, messageAddedSubscription} from './graphql/queries';

export function useChatMessages() {
    // renedered once undefined then again with data
    // loading property
    // responds to local updates to the cache, retrieves data.messages from cache which has subscription messages
      const {data} = useQuery(messagesQuery);
  
      const messages = data ? data.messages : [];
      
      useSubscription(messageAddedSubscription, {
        onSubscriptionData: ({client, subscriptionData}) => {
          client.writeData({data: {  // client.cache.writeData, global store
            messages: messages.concat(subscriptionData.data.messageAdded)
          }})
        }
      });
      
      const [addMessage, {loadingMutation, errorMutation}] = useMutation(addMessageMutation);
      return {
        messages,
        addMessage: (text) => addMessage({variables: {input: {text}}})
      };
  }
  