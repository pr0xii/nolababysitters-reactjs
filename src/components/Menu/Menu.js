import React from "react";
import { bool } from "prop-types";
import { StyledMenu } from "./Menu.styled";
import { Link } from "react-router-dom";

const Menu = ({ open, setOpen, ...props }) => {
  return (
      <StyledMenu open={open} onClick={() => setOpen(false)}>
        <Link to="/">
          <span aria-hidden="true">🏠</span>
          Home
        </Link>
        <Link to="/sitter">
          <span aria-hidden="true">💸</span>
          Find A Sitter
        </Link>
        <Link to="/registersitter">
          <span aria-hidden="true">👩‍🍼</span>
          Register As A Caregiver
        </Link>
        <Link to="/registerparent">
          <span aria-hidden="true">👩</span>
          Register As A Parent
        </Link>
        <Link to="/contact">
          <span aria-hidden="true">📩</span>
          Contact
        </Link>
      </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
