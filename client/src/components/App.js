import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import UserForm from './UserForm';
import Home from './Home';

const App = () => {
  return (
    <div>
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/user' exact component={UserForm} />
      </Router>
    </div>
  );
};

export default App;