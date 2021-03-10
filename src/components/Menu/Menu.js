import React, { Fragment } from "react";
import { bool } from "prop-types";
import { StyledMenu } from "./Menu.styled";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { signOut } from "../../firebase/utility";

const Menu = ({ open, setOpen, ...props }) => {
  const {user} = useSelector(store => store);
  return (
    <div>
      {/* {user && (
        <div>
          <img width='120' src={user.photoURL} alt={user.displayName} />
          <h5>{user.displayName}</h5>
        </div>
      )} */}
      <StyledMenu open={open} onClick={() => setOpen(false)}>
      <Link to="/">
        <span aria-hidden="true">🏠</span>
          Home
        </Link>
      <Link to="/sitter">
        <span aria-hidden="true">💸</span>
          Find A Sitter
        </Link>
      {!user ? (
        <Fragment>
          <Link to="/registerparent">
            <span aria-hidden="true">👩</span>
          Register As A Parent
        </Link>
          <Link to='/sign-in'>
            Sign In
        </Link>
        </Fragment>
      ) : <span className='link' onClick={signOut}>Sign Out</span>}
      <Link to="/contact">
        <span aria-hidden="true">📩</span>
          Contact
        </Link>
    </StyledMenu>
    </div>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
