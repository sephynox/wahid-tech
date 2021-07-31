import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ReactGA from 'react-ga';
import './scss/custom.scss';
import { lightTheme, darkTheme } from './tools/Themes';
import GlobalStyle from './tools/GlobalStyle';
import './App.css';
import * as Constants from './Constants';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BackTop from './tools/BackTop';
import Market from './pages/Market';

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );

  const [navstatus, setNav] = useState(
    () => localStorage.getItem('navstatus') || 'closed'
  );

  const toggleTheme = () => {
    let mode = 'light';

    if (theme === 'light') {
      mode = 'dark';
    }

    setTheme(mode);
  };

  const toggleNav = () => {
    let mode = 'closed';

    if (navstatus === 'closed') {
      mode = 'open';
      document.body.classList.add('mobile-nav-active');
    } else {
      document.body.classList.remove('mobile-nav-active');
    }

    setNav(mode);
  };

  const onNav = () => {
    setNav('closed');
    document.body.classList.remove('mobile-nav-active');
    window.dispatchEvent(new Event('scroll')); // Resets BackTop
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  ReactGA.initialize(Constants.GA_TRACKING_ID);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyle />
        <div className="App">

          <Router>
            <button type="button" onClick={toggleNav} className={navstatus === 'closed' ? 'bi bi-list mobile-nav-toggle d-xl-none' : 'bi bi-x mobile-nav-toggle d-xl-none'}></button>
            <header id="header" className="d-flex flex-column justify-content-center">
              <nav id="navbar" className="navbar nav-menu">
                <ul>
                  <li><NavLink onClick={onNav} className="nav-link" exact activeClassName="active" to="/"><i className="nav-link icon bi-house"></i> <span>Home</span></NavLink></li>
                  <li><NavLink onClick={onNav} className="nav-link" activeClassName="active" to="/financial-markets"><i className="nav-link icon bi-graph-up"></i> <span>Market</span></NavLink></li>
                  <li><NavLink onClick={onNav} className="nav-link" activeClassName="active" to="/technology-blog"><i className="nav-link icon bi-journals"></i> <span>Blog</span></NavLink></li>
                  <li><NavLink onClick={onNav} className="nav-link" exact activeClassName="active" to="/contact"><i className="nav-link icon bi-envelope"></i> <span>Contact</span></NavLink></li>
                  <li><NavLink onClick={onNav} className="nav-link" exact activeClassName="active" to="/about"><i className="nav-link icon bi-person"></i> <span>About</span></NavLink></li>
                  <li><button className="nav-link" onClick={toggleTheme}><i className={theme === 'light' ? 'icon bi-sun-fill' : 'icon bi-moon-fill'}></i><span>{theme === 'light' ? 'Toggle Dark' : 'Toggle Light'}</span></button></li>
                </ul>
              </nav>
            </header>

            {/* <FadeIn> */}
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/financial-markets" component={Market} />
              <Route path="/technology-blog*" component={Blog} />
              <Route path="/" component={Home} />
            </Switch>
            {/* </FadeIn> */}

          </Router>

          <footer id="footer" className="justify-content-center">
            <div className="container">
              <div className="copyright">
                © Copyright <strong><span>{Constants.MY_NAME}</span></strong>. All Rights Reserved.
              </div>
            </div>
          </footer>
        </div>
        <div id="overlay" className={navstatus === 'closed' ? '' : 'active'}></div>
        <BackTop />
      </>
    </ThemeProvider>
  );
}

export default App;
