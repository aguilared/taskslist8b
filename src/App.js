import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

import Home from "./screens/Home";

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WS_CLIENT,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      workspaceId: process.env.REACT_APP_WORKSPACE_ID,
    },
  },
});
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_CLIENT,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
