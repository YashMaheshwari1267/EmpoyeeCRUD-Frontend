import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import EmployeeComponent from './components/EmployeeComponent';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeEdit from './components/EmployeeEdit';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact="true" component={EmployeeComponent}></Route>
          <Route path="/employee/:id" exact="true" component={EmployeeEdit}></Route>
          <Route path="/employee/view/:id" exact="true" component={EmployeeDetails}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
