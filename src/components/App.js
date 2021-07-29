import SignUp from "./Signup";

/* BOOTSTRAP */
import { Container } from "react-bootstrap";

/* CONTEXT */
import { AuthProvider } from "../contexts/AuthContext";

/* REAECT ROUTER */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* COMPONENTS */
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
              </Switch>
            </AuthProvider>
          </Router>

          <SignUp />
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
