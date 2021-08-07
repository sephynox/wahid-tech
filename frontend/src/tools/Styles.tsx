import styled, { createGlobalStyle } from 'styled-components';
import Theme from './Themes';

// Hack
type ThemeEngine = {
    theme: Theme
};

export const TopButton = styled.div<Theme>`
    position: fixed;
    height: 56px;
    width: 56px;
    right: 40px;
    border-radius: 50px;
    bottom: 100px;
    padding: 5px 12px;
    align-items: center;
    font-size: 30px;
    color: (theme) => theme.text};
    background-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};
    transition: 0.5s all ease-in-out;
    overflow: hidden;
    z-index: 1;
    opacity: 0.75;
    cursor: pointer;

    &:hover {
        background-color: rgb(5, 99, 187);
    }

    @media screen and (max-width: 768px) {
        bottom: 80px;
        right: 15px;
        opacity: 0.5;
    }
`;

export const Blockquote = styled.blockquote`
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 10px;
    border-left: 1px solid ${(props: ThemeEngine) => props.theme.text};
    font-size: 1.2rem;
    color: ${(props: ThemeEngine) => props.theme.textAlt};
`;

export const HangingIndent = styled.p`
    padding-left: 1.5em;
    text-indent: -1.5em;
`;

export const GlobalStyle = createGlobalStyle`
html,
body {
    overflow: auto;
    height: 100%;
    margin: 0; 
}

body {
    display:flex; 
    flex-direction:column; 
    background-color:${(props: ThemeEngine) => props.theme.background};
    color: ${(props: ThemeEngine) => props.theme.text};
    transition: all 0.25s linear;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

a {
    color: ${(props: ThemeEngine) => props.theme.link};
    text-decoration: none;
}

a:hover {
    color: ${(props: ThemeEngine) => props.theme.linkHover}
    text-decoration: none;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

@media screen and (max-width: 768px) {
  #header {
    background-color: ${(props: ThemeEngine) => props.theme.background};
    border-right: 1px solid ${(props: ThemeEngine) => props.theme.backgroundDelta};
  }
}

#footer {
    color: ${(props: ThemeEngine) => props.theme.text};
    background-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};
}

.color.red {
    color: ${(props: ThemeEngine) => props.theme.dangerText};
}

.color.green {
    color: ${(props: ThemeEngine) => props.theme.successText};
}

.color.grey {
    color: ${(props: ThemeEngine) => props.theme.hr};
}

.social-links a:hover {
    color: ${(props: ThemeEngine) => props.theme.info};
}

.nav-menu a span {
    color:  ${(props: ThemeEngine) => props.theme.text};
}

button.nav-link {
    color:  ${(props: ThemeEngine) => props.theme.text};
    background-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};
}

button.nav-link i {
    color:  ${(props: ThemeEngine) => props.theme.text};
}

.nav-link {
  color:  ${(props: ThemeEngine) => props.theme.text};

  &:hover,
  &:focus {
    color: ${(props: ThemeEngine) => props.theme.text};
  }
}

.nav-menu-buttons {
    border-top: 1px solid ${(props: ThemeEngine) => props.theme.hr};
}

.nav-menu a, .nav-menu a:focus {
    background-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};
}

.nav-menu button:hover,
.nav-menu a:hover,
.nav-menu .active,
.nav-menu .active:focus,
.nav-menu li:hover > a {
    background-color: ${(props: ThemeEngine) => props.theme.info} !important;
}

.mobile-nav-active .mobile-nav-toggle {
    color: ${(props: ThemeEngine) => props.theme.text};
    background-color: ${(props: ThemeEngine) => props.theme.info};
}

.mobile-nav-toggle {
    color: ${(props: ThemeEngine) => props.theme.text};
}

.back-to-top:hover {
    background-color: ${(props: ThemeEngine) => props.theme.info};
    color: ${(props: ThemeEngine) => props.theme.text};
}

.contact .php-email-form input,
.contact .php-email-form textarea {
    color: ${(props: ThemeEngine) => props.theme.text};
    background-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};
}

.card {
    background-color: ${(props: ThemeEngine) => props.theme.backgroundBlog};
    border: 1px solid ${(props: ThemeEngine) => props.theme.backgroundDelta};
}

.form-control {
    border: 1px solid ${(props: ThemeEngine) => props.theme.backgroundAlt};
}

.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: ${(props: ThemeEngine) => props.theme.text};
    background-color: ${(props: ThemeEngine) => props.theme.info};
    border-color: ${(props: ThemeEngine) => props.theme.backgroundAlt};
}

.nav-tabs {
    border-color: ${(props: ThemeEngine) => props.theme.hr};
}  

.nav-tabs .nav-link:hover{
    color: ${(props: ThemeEngine) => props.theme.text};
    border-color: ${(props: ThemeEngine) => props.theme.hr};
}

.table {
    color: ${(props: ThemeEngine) => props.theme.text};
    border-color: ${(props: ThemeEngine) => props.theme.hr};
}

.highcharts-background {
    fill: none;
}

.highcharts-menu-item {
    color: ${(props: ThemeEngine) => props.theme.text};
}

.highcharts-menu-item:hover {
    background: ${(props: ThemeEngine) => props.theme.backgroundAlt};
    fill: ${(props: ThemeEngine) => props.theme.info};
}

.highcarts-title,
.highcharts-axis-labels,
.highcharts-axis-title,
.highcharts-legend-item,
.highcharts-legend-title {
    color: ${(props: ThemeEngine) => props.theme.text} !important;
}

a.page-link {
    color: ${(props: ThemeEngine) => props.theme.text};
    background-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};
    border: 1px solid ${(props: ThemeEngine) => props.theme.backgroundAlt};
}

a.page-item.active .page-link {
    background-color: ${(props: ThemeEngine) => props.theme.info};
    color: ${(props: ThemeEngine) => props.theme.text};
    border-color: {(props: ThemeEngine) => props.theme.info};
}

button.btn-secondary {
    background-color:${(props: ThemeEngine) => props.theme.backgroundExtended};
    border-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};
}

button.btn-secondary:hover {
    background-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};
    border-color: ${(props: ThemeEngine) => props.theme.info};
}
`;
