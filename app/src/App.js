import {BrowserRouter as Router} from "react-router-dom";
import MainRouter from './Router/Routes'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <MainRouter />
      </Router>
    </div>
  );
}

export default App;
