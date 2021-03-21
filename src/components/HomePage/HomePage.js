import React from 'react';
import Typed from "react-typed";
import './HomePage.css';

export default function HomePage() {
    return (
        <div className="home-page-container">
            <img alt="nanny" src="/images/background-1.png"/>
            <div className="home-page-overlay">
                <div className="type-wrap">
                    <span id="typed">
                        <Typed
                            strings={[
                                "Welcome to NOLA Babysitters.",
                                "We are here to help you find the perfect sitter for your needs!",
                            ]}
                            typeSpeed={30}
                            backSpeed={50}
                            loop
                        />
                    </span>
                    <br/>
                </div>
            </div>
        </div>
    )
}
