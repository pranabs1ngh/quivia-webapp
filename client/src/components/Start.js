import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import UserForm from './UserForm';
import Homepage from './Homepage'

class Home extends React.Component {

  componentWillMount = async () => {
    await this.props.fetchUser();
  }

  render = () => {
    if (!this.props.user) return <UserForm />
    else return <Homepage />
  };
};

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { fetchUser })(Home);