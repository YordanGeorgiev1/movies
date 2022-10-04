import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import AuthContext from "../../store/auth-context";
import style from "./Login.module.scss";
import axios from 'axios';

const Login = () => {
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

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const goToSignUpPage = () => {
    navigate("/signUp");
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
      returnSecureToken: true
    };

    axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBi5q3iwL2zYl2WUsGeHOQ3RcwbpfkOMUM',
       userData)
      .then((res) => authCtx.login(res.data.idToken))
      .catch((error) => setError(error.response.data.error.message));
      resetEmailInput();
      resetPasswordInput();
      navigate('/');
  };

  return (
    <div className={style.overlay}>
      {error && <p className={style.requestError}>{error}</p>}
      <form onSubmit={submitHandler} className={style.form}>
        <img src="/assets/movies-1.jpeg" alt="logo" />
        <h2>Log in to your account</h2>
        <p>
          Don't have an account? <span onClick={goToSignUpPage}>Sign up here</span>
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
          {passwordHasError && <p className={style.error}>Password must be at least five characters long</p>}
          <button className={style["login-btn"]}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
