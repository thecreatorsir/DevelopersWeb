import React, { Component } from "react";
import Moment from "react-moment";
import isEmpty from "../../validator/is-empty";
export class ProfileCred extends Component {
  render() {
    const { education, experience } = this.props;
    const expItem = experience.map((exp) => (
      <li key={exp._id} className='list-group-item'>
        <h4>{exp.company}</h4>
        <p>
          <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position: </strong>
          {exp.title}
        </p>
        <p>
          {isEmpty(exp.location) ? null : (
            <span>
              {" "}
              <strong>Location: </strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          {isEmpty(exp.description) ? null : (
            <span>
              {" "}
              <strong>Description: </strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));
    const eduItem = education.map((edu) => (
      <li key={edu._id} className='list-group-item'>
        <h4>{edu.school}</h4>
        <p>
          <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree: </strong>
          {edu.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {edu.fieldofstudy}
        </p>
        <p>
          {isEmpty(edu.description) ? null : (
            <span>
              {" "}
              <strong>Description: </strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className='row'>
        <div className='col-md-6'>
          <h3 className='text-center text-info'>Experience</h3>
          {expItem.length > 0 ? (
            <ul className='list-group'>{expItem}</ul>
          ) : (
            <p className='text-center'>No Experience Listed</p>
          )}
        </div>
        <div className='col-md-6'>
          <h3 className='text-center text-info'>Education</h3>
          {eduItem.length > 0 ? (
            <ul className='list-group'>{eduItem}</ul>
          ) : (
            <p className='text-center'>No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCred;
