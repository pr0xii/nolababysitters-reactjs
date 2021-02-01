import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import { Burger, Menu } from "./components";
import Typed from "react-typed";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div>
          <Typed
            strings={[
              "Welcome to NOLA Babysitters.",
              "Do you need to find the perfect sitter?",
              "We'd love to help..",
              "And we hope you enjoy your stay!"
            ]}
            typeSpeed={40}
            backSpeed={30}
            loop
          />
          <br />
        </div>
        <div>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div>
      </>
    </ThemeProvider>
  );
}
export default App;