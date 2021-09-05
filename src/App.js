import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

import Home from "./screens/Home";
import { AppProvider } from "./context/AppContext";

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

const link = ApolloLink.from([splitLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <Router>
          <div>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/edit/:id" component={Home} exact />
            </Switch>
          </div>
        </Router>
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;
