import React, { Component } from "react";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";
class PostForm extends Component {
  constructor(state) {
    super(state);
    this.state = {
      text: "",
    };
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const Post = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
    };
    this.props.addPost(Post);
    this.setState({ text: "" });
  }
  render() {
    const { errors } = this.props;
    return (
      <div className='post-form mb-3'>
        <div className='card card-info'>
          <div className='card-header bg-info text-white'>Say Somthing...</div>
          <div className='card-body'>
            <form onSubmit={(e) => this.onSubmit(e)}>
              <div className='form-group'>
                <TextAreaFieldGroup
                  placeholder='Create a Post'
                  name='text'
                  value={this.state.text}
                  onChange={this.onChange.bind(this)}
                  error={errors.text}
                />
              </div>
              <button type='submit' className='btn btn-dark'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { addPost })(PostForm);
