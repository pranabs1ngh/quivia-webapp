import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Start from './Start';
import GamePlay from './GamePlay';

const App = () => {
  return (
    <div>
      <Router>
        <Route path='/' exact component={Start} />
        <Route path='/gameplay' component={GamePlay} />
      </Router>
    </div>
  );
};

export default App;