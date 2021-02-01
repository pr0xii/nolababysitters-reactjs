import React from "react";
import { bool } from "prop-types";
import { StyledMenu } from "./Menu.styled";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Contact from "../Contact/Contact";
import Sitter from "../Sitter/Sitter";
import RegisterSitter from "../RegisterSitter";
import RegisterParent from "../RegisterParent";

const Menu = ({ open, ...props }) => {
  return (
    <BrowserRouter>
      <StyledMenu open={open}>
        <Link to="/">
          <span aria-hidden="true">🏠</span>
          Home
        </Link>
        <Link to="/sitter">
          <span aria-hidden="true">💸</span>
          Find A Sitter
        </Link>
        <Link to="/contact">
          <span aria-hidden="true">📩</span>
          Contact
        </Link>
        <Link to="/registersitter">
          <span aria-hidden="true">👩‍🍼</span>
          Register As A Caregiver
        </Link>
        <Link to="/registerparent">
          <span aria-hidden="true">👩</span>
          Register As A Parent
        </Link>
      </StyledMenu>
      <Switch>
        <Route path="/sitter">
          <Sitter />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/RegisterSitter">
          <RegisterSitter />
        </Route>
        <Route path="/RegisterParent">
          <RegisterParent />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
