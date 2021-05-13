import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar bg="light">
          <Navbar.Brand style={{marginLeft: '1%'}} href='/'>Macro Meal Planner</Navbar.Brand>
          <Link to="/">Home</Link>
          <Link style={{marginLeft: '1%'}} to="/">Meal Plan</Link>
        </Navbar>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
