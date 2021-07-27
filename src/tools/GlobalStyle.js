import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html,
body {
  height: 100vh;
  margin: 0; 
}

body {
  display:flex; 
  flex-direction:column; 
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.25s linear;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

@media screen and (max-width: 768px) {
  #header {
    background-color: ${({ theme }) => theme.background};
    border-right: 1px solid ${({ theme }) => theme.backgroundDelta};
  }
}

#footer {
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundExtended};
}

.nav-menu a span {
  color:  ${({ theme }) => theme.text};
}

button.nav-link {
  color:  ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundExtended};
}

button.nav-link i {
  color:  ${({ theme }) => theme.text};
}

.nav-link {
  color:  ${({ theme }) => theme.text};
}

.nav-menu a, .nav-menu a:focus {
  background-color: ${({ theme }) => theme.backgroundExtended};
}

.nav-menu button:hover,
.nav-menu a:hover,
.nav-menu .active,
.nav-menu .active:focus,
.nav-menu li:hover > a {
  background-color: ${({ theme }) => theme.info} !important;
}

.mobile-nav-active .mobile-nav-toggle {
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.info};
}

.mobile-nav-toggle {
  color: ${({ theme }) => theme.text};
}

.back-to-top:hover {
  background-color: ${({ theme }) => theme.info};
  color: ${({ theme }) => theme.text};
}

.contact .php-email-form input,
.contact .php-email-form textarea {
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundExtended};
}

.card {
  background-color: ${({ theme }) => theme.backgroundBlog};
  border: 1px solid ${({ theme }) => theme.backgroundDelta};
}

.form-control {
  border: 1px solid ${({ theme }) => theme.backgroundAlt};
}

`;

export default GlobalStyle;
