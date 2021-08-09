import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import EmailList from './admin/Emails';
import EmailShow from './user/Email';
import SignIn from './sessions/SignIn';
import SignOut from './sessions/SignOut';
import Header from './shared/components/header/Header';
import { connect } from 'react-redux';
import SignInSuccessRedirect from './sessions/SignInSuccessRedirect';
import { AuthData } from './shared/reducers'
import Home from './shared/components/home/Home';

interface IProps {
  isSignedIn?: boolean;
  auth?: AuthData;
}

class App extends React.Component<IProps> {
  
  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <Header authData={this.props.auth}/>
            <Route path="/" exact component={Home} />
            <Route path="/sessions/signin" component={SignIn} />
            <Route path="/sessions/signin-success-redirect" component={SignInSuccessRedirect} />
            <Route path="/sessions/signout" component={SignOut} />
            <Route path="/admin/emails" exact component={EmailList} />
            <Route path="/user/email" component={EmailShow}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return { isSignedIn: state.auth.isSignedIn, auth: state.auth.data };
};

export default connect<IProps, null>(mapStateToProps, null)(App);
