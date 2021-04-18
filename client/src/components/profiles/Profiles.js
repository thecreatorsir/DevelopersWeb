import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
export class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;

    let profileItem;

    if (profiles === null || loading) {
      profileItem = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItem = <h1>profile will display here</h1>;
      } else {
        profileItem = <h4>profiles not found</h4>;
      }
    }

    return (
      <div className='profiles'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4 text-center'>Developers Profile</h1>
              <p className='lead text-center'>
                Browse and connect with Developers
              </p>
              {profileItem}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
