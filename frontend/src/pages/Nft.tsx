import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Constants from '../Constants';
import NftHome from '../components/nft/NftHome';
import NftProfile from '../components/nft/NftProfile';

const Nft = (): JSX.Element => {
    return (
        <Switch>
            <Route exact path={Constants.SITE_NFT_PATH_BASE} component={NftHome} />
            <Route path={`${Constants.SITE_NFT_ASSET_PATH}:id`} component={NftProfile} />
        </Switch>
    );
};

export default Nft;
