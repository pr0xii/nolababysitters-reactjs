import React, { useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu } from './components';
import Typed from 'react-typed';
import { useOnClickOutside } from './hooks';

function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div class="type-wrap">
          <span id="typed">
            <Typed
                strings={['Welcome to NOLA Babysitters.', 'We are here to help you find the perfect sitter for your needs!']}
                typeSpeed={30}
                backSpeed={50}
            loop/>
          </span>
            
          <br/>
        </div>
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div>
      </>
    </ThemeProvider>
  );
}
export default App;