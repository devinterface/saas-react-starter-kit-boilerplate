import React, {Component} from 'react'
import AuthService from "./services/AuthService";

export default function withAuth(AuthComponent) {
  const Auth = new AuthService();

  return class Authenticated extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      };
    }

    componentDidMount () {
      if (!Auth.loggedIn()) {
        console.log('not logged');
        window.location = '/login'
      }
      else
        this.setState({ isLoading: false })
    }

    render() {
      return (
        <div>
          {this.state.isLoading ? (
            <div>LOADING....</div>
          ) : (
            <AuthComponent {...this.props}  auth={Auth} />
          )}
        </div>
      )
    }
  }
}
