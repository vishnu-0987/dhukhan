import { Component } from "react";
import Header from "../Header";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    boxChecked: false,
    userEmpty: false,
    passEmpty: false,
    emailEmpty: false,
  };

  changeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  changePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  changeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  blurUser = () => {
    const { username } = this.state;
    if (username === "") {
      this.setState({
        userEmpty: true,
      });
    } else {
      this.setState({
        userEmpty: false,
      });
    }
  };

  blurEmail = () => {
    const { email } = this.state;
    if (email === "") {
      this.setState({
        emailEmpty: true,
      });
    } else {
      this.setState({
        emailEmpty: false,
      });
    }
  };

  blurPass = () => {
    const { password } = this.state;
    if (password === "") {
      this.setState({
        passEmpty: true,
      });
    } else {
      this.setState({
        passEmpty: false,
      });
    }
  };

  changeCheck = (e) => {
    this.setState((prev) => ({
      boxChecked: !prev.boxChecked,
    }));
  };

  submitForm = async (e) => {
    e.preventDefault();

    const { username, password, boxChecked, email } = this.state;
    if (
      username !== "" &&
      password !== "" &&
      boxChecked === true &&
      email !== ""
    ) {
      const api = "http://localhost:3001/users/signup";
      const userDetails = {
        username,
        email,
        password,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };

      const response = await fetch(api, options);

      if (response.ok) {
        const { history } = this.props;
        history.push("/login");
      }
    }
  };

  render() {
    const { username, password, email, userEmpty, passEmpty, emailEmpty } =
      this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-header-container">
        <Header />
        <div className="login-page-container">
          <form className="login-form-container" onSubmit={this.submitForm}>
            <h1 className="login-heading">Sign Up</h1>
            <input
              type="text"
              placeholder="Username"
              className="login-input-field"
              onChange={this.changeUsername}
              value={username}
              onBlur={this.blurUser}
            />
            {userEmpty && (
              <p className="error-msg">*this field cannot be empty</p>
            )}
            <input
              type="text"
              placeholder="Email address"
              className="login-input-field"
              onChange={this.changeEmail}
              value={email}
              onBlur={this.blurEmail}
            />
            {emailEmpty && (
              <p className="error-msg">*this field cannot be empty</p>
            )}
            <input
              type="password"
              placeholder="Password"
              className="login-input-field"
              onChange={this.changePassword}
              value={password}
              onBlur={this.blurPass}
            />
            {passEmpty && (
              <p className="error-msg">*this field cannot be empty</p>
            )}
            <button className="continue-button" type="submit">
              Continue
            </button>
            <div className="link-span">
              <span className="login-span">Already have an account? </span>
              <Link className="signup-link" to="/login">
                Login here
              </Link>
            </div>
            <div className="agreeement-container">
              <input
                type="checkbox"
                id="checkbox"
                onChange={this.changeCheck}
              />
              <label htmlFor="checkbox" className="agreement-label">
                By continuing, i agree to the terms of use & privacy policy.
              </label>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
