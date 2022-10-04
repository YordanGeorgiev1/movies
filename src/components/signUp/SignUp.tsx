import React, { useState } from "react";
import style from "./SignUp.module.scss";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import axios from "axios";

const SignUp = () => {
  const {
    value: enteredEmail,
    hasError: emailHasError,
    getValue: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetValue: resetEmailInput,
  } = useInput((inputValue: string) => inputValue.includes("@") && inputValue.includes("."));

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    getValue: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetValue: resetPasswordInput,
  } = useInput((inputValue: string) => inputValue.length > 5);

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const goToLoginPage = () => {
    navigate("/login");
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (emailHasError && passwordHasError) {
      emailBlurHandler();
      passwordBlurHandler();
      return;
    } else if (emailHasError) {
      emailBlurHandler();
      return;
    } else if (passwordHasError) {
      passwordBlurHandler();
      return;
    }

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    setError(null);

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBi5q3iwL2zYl2WUsGeHOQ3RcwbpfkOMUM",
        userData
      )
      .catch((err) => setError(err.response.data.error.message));
    resetEmailInput();
    resetPasswordInput();
  };

  return (
    <div className={style.overlay}>
      {error && <p className={style.requestError}>{error}</p>}
      <form onSubmit={submitHandler} className={style.form}>
        <img src="/assets/movies-1.jpeg" alt="logo" />
        <h2>Sign Up</h2>
        <p>
          Already have an account? <span onClick={goToLoginPage}>Login here</span>
        </p>
        <div className={style.userInput}>
          <input
            className={emailHasError ? `${style.input} ${style.inputError}` : style.input}
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            placeholder="Email Adress"
          />
          {emailHasError && <p className={style.error}>Please enter valid email</p>}
          <input
            type="password"
            className={passwordHasError ? `${style.input} ${style.inputError}` : style.input}
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            placeholder="Password"
          />
          {passwordHasError && <p className={style.error}>Password must be at least six characters long</p>}
          <button className={style["signUp-btn"]}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
