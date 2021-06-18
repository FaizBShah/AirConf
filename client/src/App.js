import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  );
}

export default App;
