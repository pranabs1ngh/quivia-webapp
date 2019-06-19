import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import UserForm from './UserForm';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path='/user' exact component={UserForm} />
      </BrowserRouter>
    </div>
  );
};

export default App;