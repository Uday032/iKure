import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

//components
import Location from './pages/Location';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Location} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
