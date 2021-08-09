import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthData } from '../../reducers';

type HeaderProps = {
  authData?: AuthData;
};

class Header extends React.Component<HeaderProps> {

  private renderActions() {
    return this.props.authData
      ? (
        <div className="activ-user-panel">
          <div className="username">{this.props.authData.username}</div>
          <Link to="/sessions/signout" className="item">LogOut</Link>
        </div>
      )
      : (
        <div>
          <Link to="/sessions/signin" className="item">Login</Link>
        </div>
      );
  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          Lead Processing APP
        </Link>

        <div className="right menu">
          {this.renderActions()}
        </div>
      </div>
    );
  }
}

export default Header;