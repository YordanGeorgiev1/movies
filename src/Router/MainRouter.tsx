import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../components/homepage/HomePage";
import Login from "../components/login/Login";
import Movies from "../components/movies/Movies";
import SignUp from "../components/signUp/SignUp";
import SingleMovie from "../components/single-movie/SingleMovie";
import AuthContext from "../store/auth-context";
import style from './MainRouter.module.scss';

const MainRouter = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className={style.router}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}
      {!authCtx.isLoggedIn && <Route path="/signUp" element={<SignUp />}/>}
      {authCtx.isLoggedIn && <Route path="/:categoryId" element={<Movies />} />}
      {authCtx.isLoggedIn && <Route path="/:categoryId/:movieId" element={<SingleMovie />} />}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </div>
  );
};

export default MainRouter;
