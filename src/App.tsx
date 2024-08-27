import { BrowserRouter as Router } from "react-router-dom";
import Root from "./Root";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloClient";
import { AuthProvider } from "./context/context";

function App() {
  return (
    <div className="min-h-full">
      <AuthProvider>
        <ApolloProvider client={client}>
          <Router>
            <Root />
          </Router>
        </ApolloProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
