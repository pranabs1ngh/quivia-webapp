import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './HomeScreen'
import UserFormScreen from './UserFormScreen'
import GamePlay from './GamePlay'

const App = () => {
  return (
    <div>
      <Router>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/user' component={UserFormScreen} />
        <Route path='/gameplay' component={GamePlay} />
      </Router>
    </div>
  )
}

export default App