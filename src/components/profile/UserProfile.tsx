import { Link } from "react-router-dom";

import style from "./UserProfile.module.scss";

const UserProfile = () => {
  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <h2>User Profile</h2>
        <Link to='/changeEmail' className={style.link}>
          Change Email
        </Link>
        <Link to="/changePassword">Change Password</Link>
      </div>
    </div>
  );
};

export default UserProfile;
