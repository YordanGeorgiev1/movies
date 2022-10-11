import React, { Fragment } from "react";
import MainRouter from "./Router/MainRouter";
import "./App.scss";
import Footer from "./components/footer/Footer";
import MainHeader from "./components/header/MainHeader";

function App() {
  return (
    <Fragment>
      <MainHeader />
      <MainRouter />
      <Footer />
    </Fragment>
  );
}

export default App;
