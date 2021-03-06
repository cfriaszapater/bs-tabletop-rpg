import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../store/rootReducer";
import {
  changeRegisterEditing,
  createUser,
  validPwd
} from "../../store/register/registerActions";
import { RegisterState } from "../../store/register/registerReducer";

class RegisterPage extends React.Component<RegisterProps, RegisterState> {
  public handleChange = (event: React.SyntheticEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    this.props.changeRegisterEditing({ [name]: value });
  };

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password, password2 } = this.props;
    this.props.createUser(username, password, password2);
  };

  public render() {
    const {
      registerInProgress,
      username,
      password,
      password2,
      submitted
    } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-md-6 col-md-offset-3">
            <div>
              <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="register" onSubmit={this.handleSubmit}>
                  <div
                    className={
                      "form-group" +
                      (submitted && !username ? " has-error" : "")
                    }
                  >
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                    />
                    {submitted && !username && (
                      <div className="help-block">Username is required</div>
                    )}
                  </div>
                  <div
                    className={
                      "form-group" +
                      (submitted && !password ? " has-error" : "")
                    }
                  >
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                    {submitted && !password && (
                      <div className="help-block">Password is required</div>
                    )}
                  </div>
                  <div
                    className={
                      "form-group" +
                      (submitted && !validPwd(password, password2)
                        ? " has-error"
                        : "")
                    }
                  >
                    <label htmlFor="password">Repeat password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password2"
                      value={password2}
                      onChange={this.handleChange}
                    />
                    {submitted && !password2 && (
                      <div className="help-block">
                        Repeated password is required
                      </div>
                    )}
                    {submitted &&
                      password2 &&
                      !validPwd(password, password2) && (
                        <div className="help-block">Passwords should match</div>
                      )}
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary">Register</button>
                    {registerInProgress && (
                      <img
                        alt="registration in progress"
                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                      />
                    )}
                    <Link style={{ float: "right" }} to="/login">
                      or Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

interface RegisterPropsToMapState {
  username: string;
  password: string;
  password2: string;
  submitted: boolean;
  registerInProgress: boolean;
}

interface RegisterPropsToMapDispatch {
  changeRegisterEditing: typeof changeRegisterEditing;
  // XXX ActionCreator<CreateUserThunk>?
  createUser: (
    username?: string,
    password?: string,
    password2?: string
  ) => Promise<void>;
}

interface RegisterProps
  extends RegisterPropsToMapState,
    RegisterPropsToMapDispatch {}

function mapStateToProps(state: AppState): RegisterPropsToMapState {
  const {
    registerInProgress,
    username,
    password,
    password2,
    submitted
  } = state.register;
  return {
    password,
    password2,
    registerInProgress,
    submitted,
    username
  };
}

const connectedRegisterPage = connect(
  mapStateToProps,
  { changeRegisterEditing, createUser }
)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
