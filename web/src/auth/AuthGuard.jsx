import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "../context";
import { DashboardLayout } from "../layout/dashboard/dashboard.layout";

// import { flatMap } from "lodash";


class AuthGuard extends Component {
  constructor(props, context) {
    super(props);
    let { routes } = context;

    this.state = {
      authenticated: true,
      routes
    };
  }

  componentDidMount() {
    // this.setState({
    //   routes: flatMap(this.state.routes, item => {
    //     if (item.routes) {
    //       return [...item.routes];
    //     }
    //     return [item];
    //   })
    // });
    console.log('HALALLALAL')

    if (!this.state.authenticated) {
      this.redirectRoute(this.props);
    }
  }

  componentDidUpdate() {
    if (!this.state.authenticated) {
      this.redirectRoute(this.props);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.authenticated !== this.state.authenticated;
  }

static getDerivedStateFromProps(props, state) {
    const { location, user } = props;
    const { pathname } = location;
    const matched = state.routes.find(r => r.path === pathname);
    const authenticated =
      matched && matched.auth && matched.auth.length
        ? matched.auth.includes(user.role)
        : true;
    // return { // ideally
    //   authenticated
    // };

    return true;

  }

  redirectRoute(props) {
    const { location, history } = props;
    const { pathname } = location;

  history.push({
      pathname: "/",
      state: { redirectUrl: pathname }
    });
  }

  render() {
    let { route } = this.props;
    const { authenticated } = this.state;
    console.log("AUTHEEBEBE", authenticated)

    return authenticated ? (
      <>
        <DashboardLayout route={route}/>
      </>
    ) : null;
  }
}


AuthGuard.contextType = AppContext;
const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(AuthGuard));
