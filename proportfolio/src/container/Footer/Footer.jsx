import React, { useState } from 'react';

import { images } from '../../constants';
import { client } from '../../client';
import AppWrapper from '../../wrapper/AppWrapper';
import './Footer.scss';
import MotionWrap from '../../wrapper/MotionWrapper';

const Footer = () => {
    const [ formData, setFormData ] = useState({ name: '', email: '', message: '' });
    const [ isFormSubmitted, setIsFormSubmitted ] = useState(false);
    const [ loading, setLoading ] = useState(false);
  
    const { username, email, message } = formData;
  
    const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [ name ]: value });
    };
  
    const handleSubmit = () => {
      setLoading(true);
  
      const contact = {
        _type: 'contact',
        name: formData.username,
        email: formData.email,
        message: formData.message,
      };
  
      client.create(contact)
        .then(() => {
          setLoading(false);
          setIsFormSubmitted(true);
        })
        .catch((err) => console.log(err));
    };
  
    return (
      <>
        <h2 className="head-text">Take a coffee & chat with me</h2>
  
        <div className="app__footer-cards">
          <div className="app__footer-card ">
            <img src={images.email} alt="email" />
            <a href="mailto:abolfazl.moradi.me@gmail.com" className="p-text">abolfazl.moradi.me@gmail.com</a>
          </div>
          <div className="app__footer-card">
            <img src={images.mobile} alt="phone" />
            <a href="tel:+1 (123) 456-7890" className="p-text">+98 9196345698</a>
          </div>
        </div>
        {!isFormSubmitted ? (
          <form
            action="https://formspree.io/f/xnqwvlln"
            method="POST"
          >
            <label>
              Your email:
              <input
                className="p-text"
                type="email"
                placeholder="abolfazl.moradi.me@gmail.com"
                name="email"
              />
            </label>
              <br />
            <label>
              Your message:
              <textarea name="message"></textarea>
            </label>
            <button type="submit">Send</button>
          </form>
        ) : (
          <div>
            <h3 className="head-text">
              Thank you for getting in touch!
            </h3>
          </div>
        )}
      </>
    );
  };
  
  export default AppWrapper(
    MotionWrap(Footer, 'app__footer'),
    'contact',
    'app__whitebg',
  );