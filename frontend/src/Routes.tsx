import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Market from './pages/Market';

const Routes: React.FunctionComponent = (): JSX.Element => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route path="/financial-markets" component={Market} />
        <Route path="/technology-blog*" component={Blog} />
    </Switch>
);

export default Routes;