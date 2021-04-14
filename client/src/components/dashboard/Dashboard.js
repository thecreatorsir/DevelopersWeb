import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
export class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    return <div>Dashboard</div>;
  }
}

export default connect(null, { getCurrentProfile })(Dashboard);
