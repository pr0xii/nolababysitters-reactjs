import React, { useState, useRef, useEffect, Fragment } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import { Burger, Menu } from "./components";
import { useOnClickOutside } from "./hooks";
import RegisterParent from "./components/RegisterParent";
import { Route, Switch } from 'react-router-dom';
import Contact from "./components/Contact/Contact";
import Sitter from "./components/Sitter/Sitter";
import HomePage from "./components/HomePage/HomePage";
import BottomNav from "./components/BottomNav/BottomNav";
import './App.css';
import { auth, userDetails } from "./firebase/utility";
import SignInPage from './pages/SignInPage/SignInPage';
import { useSelector, useDispatch } from "react-redux";
import userAction from "./store/actions/userAction";
import Spinner from './UI/Spinner'
import SitterPage from "./components/SitterPage/SitterPage";
import TestingStore from './components/TestingStore/TestingStore'

function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store);
  const [isLoading, setIsLoading] = useState(true);
  useOnClickOutside(node, () => setOpen(false));
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        userDetails(user)
          .then(doc => {
            user.registerAs = doc.data().registerAs;
            setIsLoading(false);
            dispatch(userAction(user))
          })
          .catch(err => console.log(err))
      }
      else {
        setIsLoading(false);
        dispatch(userAction(user));
      }
    });
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />

        {isLoading ? <Spinner /> : (
          <Fragment>
            <div ref={node}>
              <Burger open={open} setOpen={setOpen} />
              <Menu open={open} setOpen={setOpen} />
            </div>
            <Switch>
              <Route exact path="/sitter" component={Sitter} />
              <Route path="/contact" component={Contact} />
              <Route path='/sitter/:id' component={SitterPage} />
              <Route path='/testing' component={TestingStore} />
              {/* <Route path="/RegisterSitter" component={RegisterSitter} /> */}
              {!user && <Route path="/RegisterParent" component={RegisterParent} />}
              {!user && <Route path='/sign-in' component={SignInPage} />}
              <Route path='/' component={HomePage} />
            </Switch>
            {/* How do I move this down? */}
            <div className="bottom-nav">
              <BottomNav />
            </div>
          </Fragment>
        )}


      </>
    </ThemeProvider>
  );
}
export default App;
