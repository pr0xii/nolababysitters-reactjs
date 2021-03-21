import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { signOut } from "../../firebase/utility";
import "./Menu.css";

const Menu = ({ open, setOpen, ...props }) => {
  const {user} = useSelector(store => store);
  return (
    <div className="menu-container">
        <div className="menu-logo">
           <img alt="logo" src="/images/logo.png"/>
        </div>
        <div className="menu-links">
            {/* {user && (
        <div>
          <img width='120' src={user.photoURL} alt={user.displayName} />
          <h5>{user.displayName}</h5>
        </div>
      )} */}
            <Link to="/">
                <i className="fa fa-home"></i>
                Home
            </Link>
            <Link to="/sitters">
                <i className="fa fa-search"></i>
                Find A Sitter
            </Link>
            {!user ? (
                <Fragment>
                    <Link to="/registerparent">
                        <i className="fa fa-user-plus"></i>
                        Sign Up
                    </Link>
                    <Link to='/sign-in'>
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                </Fragment>
            ) : <span className='link' onClick={signOut}><i className="fa fa-user-circle"></i> Sign Out</span>}
            <Link to="/contact">
                <i className="fa fa-envelope"></i>
                Contact
            </Link>
        </div>
    </div>
  );
};

export default Menu;
