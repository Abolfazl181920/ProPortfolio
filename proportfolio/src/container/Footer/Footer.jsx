import React from "react";

import { images } from "../../constants";
import AppWrapper from "../../wrapper/AppWrapper";
import "./Footer.scss";
import MotionWrap from "../../wrapper/MotionWrapper";
import Form from "./Form/Form";

const Footer = () => {
  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:abolfazl.moradi.me@gmail.com" className="p-text">
            abolfazl.moradi.me@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+1 (123) 456-7890" className="p-text">
            +98 9196345698
          </a>
        </div>
      </div>
      <Form />
    </>
  );
};

export default AppWrapper(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
