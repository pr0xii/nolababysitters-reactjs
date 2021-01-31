import React from "react";
import { bool } from "prop-types";
import { StyledMenu } from "./Menu.styled";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Contact from "../Contact/Contact";
import Sitter from "../Sitter/Sitter";

const Menu = ({ open, ...props }) => {
  return (
    <BrowserRouter>
      <StyledMenu open={open}>
        <Link to="/">
          <span aria-hidden="true">💁🏻‍♂️</span>
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
      </StyledMenu>
      <Switch>
        <Route path="/sitter">
          <Sitter />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
