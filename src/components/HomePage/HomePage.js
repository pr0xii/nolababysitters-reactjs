import React from 'react';
import Typed from "react-typed";

export default function HomePage() {
    return (
        <div class="type-wrap">
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

            <br />
        </div>
    )
}