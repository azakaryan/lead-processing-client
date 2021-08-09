import React from 'react';
import { connect } from 'react-redux';
import { AppState, AuthData } from '../../reducers'


class Home extends React.Component<{ isSignedIn: boolean, authData: AuthData, history: any }> {

  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div className="ui container">
        <h1>This Lead Processing Main page, Please sign in to get started.</h1>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return { isSignedIn: state.auth.isSignedIn, authData: state.auth.data };
};

export default connect(mapStateToProps, null)(Home);
