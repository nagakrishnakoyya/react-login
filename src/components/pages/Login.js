import { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { loginDetails } from "../common/constants";
import useValidation from "../common/useValidation";

const Login = ({ setAuth }) => {
  //Initial state
  const initialState = { email: "", password: "" };
  // State
  const [data, setData] = useState(initialState);
  const [showPwd, setShowPwd] = useState(false);
  const [showLogins, setShowLogins] = useState(false);
  const { email, password } = data;

  // Custom hook
  const {
    errorMsg: errors,
    setErrors,
    isValidate,
    isValid: isValidated,
  } = useValidation(data);
  const histoty = useHistory();
  const token = uuidv4();

  // Update state
  const updateInputValues = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({});
  };

  // onBlur
  const validateLoginDetails = () => {
    isValidate();
  };

  // Login method
  const loginHandler = () => {
    const isValid = isValidate();
    if (isValid) {
      setAuth(true);
      localStorage.setItem("access_token", token);
      histoty.push("/home");
    }
  };

  // Password show & hide
  const passwordShowHide = () => {
    setShowPwd(!showPwd);
  };

  // showLoginDetails
  const showLoginDetails = () => {
    setShowLogins(!showLogins);
  };
  // JSX
  return (
    <div className="login-page center_content">
      <div>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input
            style={{ backgroundColor: errors.email ? "#f5c0c0" : "" }}
            type="email"
            className={
              !isValidated.email ? "form-control" : "form-control validated"
            }
            placeholder={showLogins ? loginDetails.email : "Enter email"}
            name="email"
            value={email}
            onChange={updateInputValues}
            onBlur={validateLoginDetails}
          />

          {errors && <small style={{ color: "red" }}>{errors.email}</small>}
        </div>
        <div className="form-group" style={{ position: "relative" }}>
          <label htmlFor="pwd">Password:</label>
          <input
            style={{ backgroundColor: errors.password ? "#f5c0c0" : "" }}
            type={showPwd ? "text" : "password"}
            className={
              !isValidated.password ? "form-control" : "form-control validated"
            }
            placeholder={showLogins ? loginDetails.password : "Enter password"}
            name="password"
            id="password"
            value={password}
            onChange={updateInputValues}
            onBlur={validateLoginDetails}
          />
          <small
            className="pwd-show"
            onClick={passwordShowHide}
            title={showPwd ? "Hide Password" : "Show Password"}
          >
            {showPwd ? "Hide" : "Show"}
          </small>
          {errors && <small style={{ color: "red" }}>{errors.password}</small>}
        </div>
        <button className="btn btn-primary btn-block" onClick={loginHandler}>
          Login
        </button>
        <p className="login-details" onClick={showLoginDetails}>
          {showLogins ? "Hide login details" : "Show login details"}
        </p>
      </div>
    </div>
  );
};

export default Login;
