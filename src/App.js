import React, { useState, useRef, useEffect, Fragment } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import { Menu } from "./components";
import { useOnClickOutside } from "./hooks";
import RegisterParent from "./components/RegisterParent";
import { Route, Switch } from 'react-router-dom';
import Contact from "./components/Contact/Contact";
import Sitter from "./components/Sitter/Sitter";
import HomePage from "./components/HomePage/HomePage";
import './App.css';
import { auth, userDetails } from "./firebase/utility";
import SignInPage from './pages/SignInPage/SignInPage';
import { useSelector, useDispatch } from "react-redux";
import userAction from "./store/actions/userAction";
import Spinner from './UI/Spinner'
// import SitterPage from "./components/SitterPage/SitterPage";
import TestingStore from './components/TestingStore/TestingStore'
import NewSitterPage from "./pages/NewSitterPage";

function App() {
  const { user } = useSelector(store => store);

  const node = useRef();
  const dispatch = useDispatch();
  
  const [setOpen] = useState(false);
  useOnClickOutside(node, () => setOpen(false));
  
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        userDetails(user)
          .then(doc => {
            user.registerAs = doc.data().registerAs;
            dispatch(userAction(user))
          })
          .catch(err => console.log(err))
      }
      else {
        dispatch(userAction(user));
      }
    });
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />

        {user === 'initial' ? <Spinner className="loader"/> : (
          <Fragment>
            <Menu/>
            <Switch>
              <Route path="/sitters" component={Sitter} />
              <Route path="/contact" component={Contact} />
              {/* <Route exact path='/sitter/:id' component={SitterPage} /> */}
              <Route path='/sitter/:id' component={NewSitterPage} />
              <Route path='/testing' component={TestingStore} />
              {/* <Route path="/RegisterSitter" component={RegisterSitter} /> */}
              {!user && <Route path="/RegisterParent" component={RegisterParent} />}
              {!user && <Route path='/sign-in' component={SignInPage} />}
              <Route path='/' component={HomePage} />
            </Switch>
          </Fragment>
        )}


      </>
    </ThemeProvider>
  );
}
export default App;
