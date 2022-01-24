import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProjectHome from '../components/projects/ProjectHome';
import ProjectProfile from '../components/projects/ProjectProfile';
import * as Constants from '../Constants';

const Project = (): JSX.Element => {
    return (
        <Switch>
            <Route exact path={Constants.SITE_PROJECT_PATH_BASE} component={ProjectHome} />
            <Route path={`${Constants.SITE_PROJECT_ASSET_PATH}:id`} component={ProjectProfile} />
        </Switch>
    );
};

export default Project;
