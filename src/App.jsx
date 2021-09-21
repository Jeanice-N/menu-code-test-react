import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { render } from 'react-dom';
import Menu from './menu/components/Menu.jsx';
import client from "./server/apollo"

function App() {
    return <Menu/>;
}

render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
