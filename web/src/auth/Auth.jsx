import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { setUserData } from "../redux/actions/UserActions";
// import jwtAuthService from "../services/jwtAuth.service";
// import localStorageService from "../services/localStorage.service";

class Auth extends Component {
  state = {};

  constructor(props) {
    super(props);


  }

  checkJwtAuth = () => {
    // jwtAuthService.loginWithToken().then(user => {
    //   this.props.setUserData(user);
    // });
  };



  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = state => ({ // my state props

});

export default connect(mapStateToProps, { setUserData })(Auth);
