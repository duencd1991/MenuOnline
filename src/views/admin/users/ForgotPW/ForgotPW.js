import React from 'react';
import { connect } from 'react-redux';
import '../styles/LoginForm.scss';
import validator from "validator";
import loginImg from "../../../../../public/images/menu.png";
import cookie from 'react-cookies';
import { clear, error, success } from "../../../../redux/actions";

class ForgotPW extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      submitted: false
    };
  }

  handleInputEmail = (e) => {
    let value = e.target.value.toLowerCase().trim();
    this.setState({
      email: value
    })
  };

  formIsValid = () => {
    return validator.isEmail(this.state.email);
  }

  handleSubmit = (e) => {
    this.props.error("Comming soon ...");
    e.preventDefault();
  }

  render() {
    const { email, submitted } = this.state;
    return (
      <div className="page-content">
        <div className="login-form">
          <div className="login-container">
            <div className="login-title">Forgot your password?</div>

            <div className="login-content">
              <div className="login-img">
                <img src={loginImg} />
              </div>
              <form className="form">
                <div className="login-notice">Enter your email to reset your password</div>
                <div className="login-label">Email</div>
                <input type="text" className="login-input" value={email} onChange={this.handleInputEmail} />
                {
                  submitted && !email && <div className="help-block">Email is required</div>
                }

                <button className="btn btn-active" onClick={this.handleSubmit}>RESET PASSWORD</button>
                <button className="btn btn-normal" onClick={(e) => this.props.history.push("/Login")}>LOGIN</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.user;
  return {
    loggingIn
  };
}

const mapDispatchToProps = dispatch => {
  return {
    clear: () => {
      dispatch(clear());
    },
    error: (message) => {
      dispatch(error(message));
    },
    success: (message) => {
      dispatch(success(message));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPW);