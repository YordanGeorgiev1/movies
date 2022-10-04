import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={style.footer}>
      <h2>Movies</h2>
      <div>
        <p>Address: 1169 Sofia Center, Sofia</p>
        <p>
          Contact us at: <a href="tel:02 99 39 39">02 99 39 39</a>
        </p>
        <p>
          Email: <a href="mailto:movies@movies.com">movies@movies.com</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
