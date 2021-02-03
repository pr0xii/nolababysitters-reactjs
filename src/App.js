import React, { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import { Burger, Menu } from "./components";
import { useOnClickOutside } from "./hooks";
import RegisterSitter from "./components/RegisterSitter";
import RegisterParent from "./components/RegisterParent";
import { Route, Switch } from 'react-router-dom';
import Contact from "./components/Contact/Contact";
import Sitter from "./components/Sitter/Sitter";
import HomePage from "./components/HomePage/HomePage";
import BottomNav from "./components/BottomNav/BottomNav";
import './App.css';



function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        
        <Switch>
          <Route path="/sitter" component={Sitter} />
          <Route path="/contact" component={Contact} />
          <Route path="/RegisterSitter" component={RegisterSitter} />
          <Route path="/RegisterParent" component={RegisterParent} />
          <Route path='/' component={HomePage} />
        </Switch>

        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div>


        {/* How do I move this down? */}
        <div className="bottom-nav">
          <BottomNav />
        </div>


      </>
    </ThemeProvider>
  );
}
export default App;
