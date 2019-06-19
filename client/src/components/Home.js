import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions'

class Home extends React.Component {

  componentWillMount = async () => {
    await this.props.fetchUser();

    if (!this.props.user) this.props.history.push('/user');
  }

  render = () => {
    return (
      <div className="container">{this.props.user.name}</div>
    );
  };
};

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { fetchUser })(Home);