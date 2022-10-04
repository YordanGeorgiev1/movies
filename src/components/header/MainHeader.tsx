import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import style from "./MainHeader.module.scss";

const MainHeader = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const backToHomepage = () => {
    navigate("/");
  };

  return (
    <header className={style.header}>
      <nav>
        <div className={style["header-logo"]}>
          <img onClick={backToHomepage} src="/assets/movies-1.jpeg" alt="logo"/>
          {!authCtx.isLoggedIn && <NavLink className={style.log} to="/login">Sign up/Log in</NavLink>}
          {authCtx.isLoggedIn && <NavLink onClick={authCtx.logout} className={style.log} to="/">Logout</NavLink>}
        </div>
        {authCtx.isLoggedIn &&
        <ul>
          <li>
            <NavLink to="/action"
            className={({ isActive }) => isActive ? style.active : ''} 
            >
              Action Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/comedy"
             className={({ isActive }) => isActive ? style.active : ''} 
            >
              Comedy Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/fantasy"
              className={({ isActive }) => isActive ? style.active : ''} 
            >
              Fantasy Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/sci-fi"
             className={({ isActive }) => isActive ? style.active : ''} 
            >
              Sci-Fi Movies
            </NavLink>
          </li>
        </ul>}
      </nav>
    </header>
  );
};

export default MainHeader;
