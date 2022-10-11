import React, { Fragment, useContext, useState } from "react";
import useInput from "../../hooks/useInput";
import style from "./ChangeEmail.module.scss";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const ChangeEmail = () => {
  const {
    value: enteredEmail,
    hasError: emailHasError,
    getValue: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetValue: resetEmailInput,
  } = useInput((inputValue: string) => inputValue.includes("@") && inputValue.includes("."));

  const [error, setError] = useState(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (emailHasError) {
      emailBlurHandler();
      return;
    }
    const email = {
      idToken: authContext.token,
      email: enteredEmail,
      returnSecureToken: true,
    };

    setError(null);

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBi5q3iwL2zYl2WUsGeHOQ3RcwbpfkOMUM",
        email
      )
      .then(() => {
        resetEmailInput();
        navigate('/');
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
        <h2>New Email</h2>
        <input
          className={emailHasError ? `${style.input} ${style.inputError}` : style.input}
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          placeholder="Email Adress"
        />
        {emailHasError && <p className={style.error}>Please enter valid email</p>}
        <button className={style.btn}>Change</button>
      </form>
    </Fragment>
  );
};

export default ChangeEmail;
