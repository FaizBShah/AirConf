import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Room from './pages/Room';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/room/:roomId" component={Room} />
    </Router>
  );
}

export default App;
