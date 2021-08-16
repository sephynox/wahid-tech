import { createGlobalStyle } from 'styled-components';
import Theme from '../tools/Themes';

// Hack
export type ThemeEngine = {
    theme: Theme
};

export const GlobalStyle = createGlobalStyle`
html,
body {
    overflow-y: auto;
    height: 100%;
    margin: 0; 
}

::-webkit-scrollbar {
    background-color: ${(props: ThemeEngine) => props.theme.backgroundAlt};
}

::-webkit-scrollbar-track {
    background-color: ${(props: ThemeEngine) => props.theme.background};
}

::-webkit-scrollbar-thumb {
    background-color: ${(props: ThemeEngine) => props.theme.backgroundAlt};
    outline: 1px solid ${(props: ThemeEngine) => props.theme.backgroundDelta};
}

body {
    display:flex; 
    flex-direction:column; 
    background-color: ${(props: ThemeEngine) => props.theme.background};
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

hr.nav-menu-buttons {
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

.modal-content {
    background-color: ${(props: ThemeEngine) => props.theme.background};
}

.modal-content .modal-header {
    border-bottom: ${(props: ThemeEngine) => props.theme.backgroundExtended};
}

.modal-content .modal-footer {
    border-top: ${(props: ThemeEngine) => props.theme.backgroundExtended};
}

#contact .php-email-form input,
#contact .php-email-form textarea {
    color: ${(props: ThemeEngine) => props.theme.text};
    background-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};
}

.form-control {
    border: 1px solid ${(props: ThemeEngine) => props.theme.backgroundAlt};
}

.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: ${(props: ThemeEngine) => props.theme.text};
    background-color: ${(props: ThemeEngine) => props.theme.info};
    border-color: ${(props: ThemeEngine) => props.theme.info};
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
    fill: none !important;
}

.highcharts-menu-item {
    color: ${(props: ThemeEngine) => props.theme.text} !important;
}

.highcharts-menu-item:hover {
    background: ${(props: ThemeEngine) => props.theme.backgroundAlt} !important;
    fill: ${(props: ThemeEngine) => props.theme.info} !important;
}

.highcharts-title,
.highcharts-axis-title,
.highcharts-label > text,
.highcharts-legend-item > text,
.highcharts-legend-title {
    fill: ${(props: ThemeEngine) => props.theme.text} !important;
}

.highcharts-axis-labels > text {
    fill: ${(props: ThemeEngine) => props.theme.textAlt} !important;
}

.highcharts-label-box, .highcharts-button-box {
    fill: ${(props: ThemeEngine) => props.theme.backgroundExtended} !important;
}

.highcharts-label-box.highcharts-shadow {
    fill: ${(props: ThemeEngine) => props.theme.backgroundAlt} !important;
}

.highcharts-button-normal > .highcharts-button-box {
    fill: ${(props: ThemeEngine) => props.theme.backgroundAlt} !important;
}

.highcharts-button-normal > text {
    fill: ${(props: ThemeEngine) => props.theme.text} !important;
}

.highcharts-button-disabled > .highcharts-button-box {
    fill: ${(props: ThemeEngine) => props.theme.hr} !important;
}

.highcharts-button-disabled > text {
    fill: ${(props: ThemeEngine) => props.theme.backgroundExtended} !important;
}

.highcharts-button-pressed > .highcharts-button-box {
    color: ${(props: ThemeEngine) => props.theme.text};
    fill: ${(props: ThemeEngine) => props.theme.info} !important;
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
    color: ${(props: ThemeEngine) => props.theme.text};
    background-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};
    border-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};
}

button.btn-secondary:hover {
    color: ${(props: ThemeEngine) => props.theme.text};
    background-color: ${(props: ThemeEngine) => props.theme.info};
    border-color: ${(props: ThemeEngine) => props.theme.info};
}

@media screen and (max-width: 768px) {
    #header {
      background-color: ${(props: ThemeEngine) => props.theme.background};
      border-right: 1px solid ${(props: ThemeEngine) => props.theme.backgroundDelta};
    }
}
`;
