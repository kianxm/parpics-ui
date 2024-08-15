import { BrowserRouter as Router } from "react-router-dom";
import Root from "./Root";

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Root />
      </Router>
    </div>
  );
}

export default App;
