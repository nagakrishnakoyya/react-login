import { useState } from "react";
import { loginDetails } from "./constants";

const useValidation = (data) => {
  const [errorMsg, setErrors] = useState({});
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });

  // Email and password validation
  const isValidate = () => {
    if (!data?.email && !data?.password) {
      setErrors({
        ...errorMsg,
        email: "Email is required!",
        password: "Password is required!",
      });
      return;
    }
    if (data?.email !== loginDetails.email) {
      setErrors({ ...errorMsg, email: "Email does not exist" });
      return;
    } else {
      setIsValid({ ...isValid, email: true });
    }
    if (!data?.email) {
      setErrors({ ...errorMsg, email: "Email is required!" });
      return;
    }
    if (!validateEmail(data?.email)) {
      setErrors({ ...errorMsg, email: "Email is not valid!" });
      return;
    }
    if (!data?.password) {
      setErrors({ ...errorMsg, password: "Password is required!" });
      return;
    }
    if (data?.password !== loginDetails.password) {
      setErrors({ ...errorMsg, password: "Password does not match" });
      return;
    } else {
      setIsValid({ ...isValid, password: true });
    }
    if (data?.password.length < 6) {
      setErrors({
        ...errorMsg,
        password: "Password length should be more than 6 characters!",
      });
      return;
    }
    if (!validatePassword(data?.password)) {
      setErrors({ ...errorMsg, password: "Password strength does not match!" });
      return;
    }

    return true;
  };
  // Check email is valid or not
  function validateEmail(email) {
    const verify =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return verify.test(String(email).toLowerCase());
  }
  // Password strength
  function validatePassword(password) {
    const verify = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
    return verify.test(password);
  }

  return {
    errorMsg,
    setErrors,
    errCount: Object.keys(errorMsg).length,
    isValidate,
    isValid,
  };
};

export default useValidation;
