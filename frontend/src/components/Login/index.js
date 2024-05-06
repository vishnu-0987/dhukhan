import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../Header";
import Cookies from "js-cookie";
import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    boxChecked: false,
    userEmpty: false,
    passEmpty: false,
    errOccured: false,
    errMsg: "",
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

  changeCheck = (e) => {
    this.setState((prev) => ({
      boxChecked: !prev.boxChecked,
    }));
  };

  blurUsername = (e) => {
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

  blurPassword = () => {
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

  onSuccess = (jwt) => {
    Cookies.set("jwt_token", jwt, {
      expires: 30,
      path: "/",
    });
    this.props.history.replace("/");
  };

  onFailure = (err) => {
    this.setState({
      errOccured: true,
      errMsg: err,
    });
  };

  submitForm = async (e) => {
    e.preventDefault();

    const { username, password, boxChecked } = this.state;
    if (username !== "" && password !== "" && boxChecked === true) {
      const api = "http://localhost:3001/users/login";
      const userDetails = {
        username,
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

      const data = await response.json();
      if (response.ok) {
        const jwt = data.jwtToken;
        this.onSuccess(jwt);
      } else {
        const err = data.error;
        this.onFailure(err);
      }
    }
  };

  render() {
    const { username, password, userEmpty, passEmpty, errOccured, errMsg } =
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
            <h1 className="login-heading">Login</h1>
            <input
              type="text"
              placeholder="Username"
              className="login-input-field"
              onChange={this.changeUsername}
              onBlur={this.blurUsername}
              value={username}
            />
            {userEmpty && (
              <p className="error-msg">*this field cannot be empty</p>
            )}
            <input
              type="password"
              placeholder="Password"
              className="login-input-field"
              onChange={this.changePassword}
              onBlur={this.blurPassword}
              value={password}
            />
            {passEmpty && (
              <p className="error-msg">*this field cannot be empty</p>
            )}
            <button className="continue-button" type="submit">
              Continue
            </button>
            {errOccured && <p className="error-msgs">*{errMsg}</p>}
            <div className="link-span">
              <span className="login-span">Create an account? </span>
              <Link className="signup-link" to="/signup">
                Click here
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

export default Login;
