import React from 'react';
import './Contact.css';

export default function Contact(){
    return(
        <div className="contact-page-container">
            <div className="container">
                <div className="contact-box">
                    <div className="right">
                        <h2>Contact Us</h2>
                        <input type="text" className="field" placeholder="Your Name"/>
                        <input type="text" className="field" placeholder="Your Email"/>
                        <input type="text" className="field" placeholder="Phone"/>
                        <textarea placeholder="Message" className="field"></textarea>
                        <div>
                            <button className="btn">SEND</button>
                        </div>
                        <div className="contact-box-img"><img alt="logo" src="/images/logo.png"/></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
