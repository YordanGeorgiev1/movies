import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import AuthContext from "../../store/auth-context";
import style from "./ChangePassword.module.scss";
import axios from "axios";

const ChangePassword = () => {
  const {
    value: enteredPassword,
    hasError: passwordHasError,
    getValue: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetValue: resetPasswordInput,
  } = useInput((inputValue: string) => inputValue.length > 5);

  const [error, setError] = useState(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordHasError) {
      passwordBlurHandler();
      return;
    }
    const password = {
      idToken: authContext.token,
      password: enteredPassword,
      returnSecureToken: true,
    };

    setError(null);

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBi5q3iwL2zYl2WUsGeHOQ3RcwbpfkOMUM",
        password
      )
      .then(() => {
        resetPasswordInput();
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data.error.message);
        return;
      });
  };

  return (
    <Fragment>
      {error && <h2 className={style.requestError}>{error}</h2>}
      <form onSubmit={submitHandler} className={style.form}>
        <h2>New Password</h2>
        <input
          className={passwordHasError ? `${style.input} ${style.inputError}` : style.input}
          type="password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          placeholder="Password"
        />
        {passwordHasError && <p className={style.error}>Password must be at least six characters long</p>}
        <button className={style.btn}>Change</button>
      </form>
    </Fragment>
  );
};

export default ChangePassword;
