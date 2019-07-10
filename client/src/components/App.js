import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home';
import UserForm from './UserForm';
import GamePlay from './GamePlay';

const App = () => {
  return (
    <div>
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/user' component={UserForm} />
        <Route path='/gameplay' component={GamePlay} />
      </Router>
    </div>
  );
};

export default App;