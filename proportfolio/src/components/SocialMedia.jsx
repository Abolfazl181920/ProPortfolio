import React from 'react';

import { BsLinkedin, BsInstagram, BsGithub } from 'react-icons/bs';

const SocialMedia = () => {
    return (
        <div className="app__social">
            <div>
                <a href="https://www.linkedin.com/in/abolfazl-moradi-4a8642227/" target="_blank">
                    <BsLinkedin />
                </a>
            </div>
            <div>
                <a href="https://github.com/Abolfazl181920" target="_blank">
                    <BsGithub />
                </a>
            </div>
            <div>
                <a href="https://www.instagram.com/abolfaz.m2" target="_blank">
                    <BsInstagram />
                </a>
            </div>
        </div>
    )
}

export default SocialMedia;