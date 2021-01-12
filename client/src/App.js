import React, { Component } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { getLoggedInUser, logout } from './auth';
import Chat from './Chat.class';
import Login from './Login';
import NavBar from './NavBar';
import client from './graphql/client';

class App extends Component {
  state = { user: getLoggedInUser() };

  handleLogin(user) {
    this.setState({ user });
  }

  handleLogout() {
    logout();
    this.setState({ user: null });
  }

  render() {
    const { user } = this.state;
    if (!user) {
      return <Login onLogin={this.handleLogin.bind(this)} />;
    }
    return (
      // makes apollo react client accessible to all components
      // wrap all jsx in root component, prereq. for react apollo hooks
      <ApolloProvider client={client}>
          <NavBar onLogout={this.handleLogout.bind(this)} />
          <Chat user={user} />
      </ApolloProvider>
    );
  }
}

export default App;
