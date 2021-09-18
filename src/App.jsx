import { ApolloProvider } from '@apollo/client';
import gql from "graphql-tag";
import React from 'react';
import { render } from 'react-dom';
import Menu from './components/Menu.jsx';
import client from "./server/apollo"

function App() {
    return <Menu/>;
}

render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
