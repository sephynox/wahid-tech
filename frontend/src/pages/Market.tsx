import React, { createContext, Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SwipeEventData, SwipeDirections, DOWN } from 'react-swipeable';
import { toast } from 'react-hot-toast';
import * as Constants from '../Constants';
import { AssetState, AssetStates, initialAssetState } from '../actions/AssetState';
import {
    assetReducer,
    fetchAssetData,
    fetchAssetPriceData,
    fetchAssetMarketData
} from '../actions/Asset';
import MarketHome from '../components/market/MarketHome';
import MarketProfile from '../components/market/MarketProfile';
import { MarketType } from '../tools/MarketData';
import SwipeDown from '../components/SwipeDown';
import { formatFirstUpper } from '../utils/data-formatters';

//import StockChart from '../components/StockChart';
//import * as Constants from '../Constants';
//import Web3Provider, { Web3ReactProvider } from '@web3-react/core';
//import CandleStickChart from '../components/CandleStickChart';
//import { Symfoni } from "./hardhat/SymfoniContext";

export const MarketContext = createContext<{
    assetData: AssetState,
    dateStart: number,
    refreshData: (type: MarketType, reducer: Dispatch<AssetState>, assetKey?: string) => void,
    setDateStart: Dispatch<SetStateAction<number>>,
    dispatchAssetData: Dispatch<AssetState>,
    marketDataByline: (type: MarketType) => JSX.Element,
}>({
    assetData: initialAssetState,
    dateStart: new Date().getTime(),
    refreshData: () => undefined,
    setDateStart: () => undefined,
    dispatchAssetData: () => undefined,
    marketDataByline: function marketDataByline() { return <></> },
});

const Market = (): JSX.Element => {
    const { t } = useTranslation();

    const defaultStart: number = Math.floor(new Date(new Date().setDate(new Date().getDate() - 366)).getTime() / 1000);
    const localAssetState: AssetState = { ...initialAssetState, ...JSON.parse(localStorage.getItem('assetData') ?? '{}') };

    const [assetData, dispatchAssetData] = useReducer(assetReducer, localAssetState);
    const [dateStart, setDateStart] = useState(defaultStart);

    const assetPath = window.location.pathname.replace(Constants.SITE_MARKET_ASSET_PATH, '').split('/');
    const assetType = assetPath[0] as MarketType;
    const assetKey = assetPath[1];

    const refreshData = (type: MarketType, reducer: Dispatch<AssetState>, assetKey?: string) => {
        //BUG Does not actually work
        toast.promise(fetchAssetMarketData(type)(reducer), {
            loading: `${formatFirstUpper(t('loading'))}...`,
            success: `${formatFirstUpper(t('updated'))}!`,
            error: formatFirstUpper(t('error')),
        });

        if (assetKey) {
            fetchAssetPriceData(type, assetKey, dateStart)(reducer);
            fetchAssetData(assetType, assetKey)(reducer);
        }
    };

    const swipeActions = (event: SwipeEventData | { dir: SwipeDirections }) => {
        switch (event.dir) {
            case DOWN:
                refreshData(MarketType.CRYPTO, dispatchAssetData);
                break;
        }
    };

    const marketDataByline = (type: MarketType): JSX.Element => {
        const recordData = assetData.data ? assetData.data[type][Object.keys(assetData.data[type])[0]]?.source : undefined;
        const sourceLink = recordData?.link;
        const sourceName = recordData?.name;

        return (
            <span>
                {t('data_from')} <a target="_new" href={sourceLink}>{sourceName}</a>
            </span>
        );
    };

    const providerData = {
        assetData,
        dateStart,
        refreshData,
        setDateStart,
        dispatchAssetData,
        marketDataByline
    };

    // TODO Retrieve data from ChainLink
    // function getLibrary(provider) {
    //     return new Web3Provider(provider);
    // }

    // <Web3ReactProvider getLibrary={getLibrary}>
    // <section id="market" className="d-flex flex-column">
    //     Hello World!
    //     {/* <CandleStickChart width="100%" data={{}} ratio="1.0" /> */}
    //     </section>
    // </Web3ReactProvider>

    useEffect(() => {
        //TODO Cleanup
        const fetchCryptoMarketStoreData = (): void => {
            if (assetData.type !== AssetStates.FETCHING) {
                fetchAssetMarketData(MarketType.CRYPTO)(dispatchAssetData);

                //TODO this probably will break in many cases...
                if (assetData.data && assetData.data[assetType] && assetData.data[assetType][assetKey]?.price_history) {
                    const timestamp = new Date().getTime();
                    const price = assetData.data[assetType][assetKey].price ?? 0;
                    const cap = assetData.data[assetType][assetKey].cap ?? 0;
                    const volume = assetData.data[assetType][assetKey].volume ?? 0;

                    assetData.data[assetType][assetKey].prices?.prices.push([timestamp, price]);
                    assetData.data[assetType][assetKey].prices?.market_caps.push([timestamp, cap]);
                    assetData.data[assetType][assetKey].prices?.total_volumes.push([timestamp, volume]);
                }
            }
        };

        // Initial fetch
        if (assetData.type === AssetStates.EMPTY) {
            fetchCryptoMarketStoreData();
        }

        if (assetType && assetKey && assetData.type !== AssetStates.ERROR && assetData.type !== AssetStates.FETCHING) {
            if (assetData.data && assetData.data[assetType][assetKey] && !assetData.data[assetType][assetKey].meta_data) {
                fetchAssetData(assetType, assetKey)(dispatchAssetData);
            }

            if (assetData.data && assetData.data[assetType][assetKey] && !assetData.data[assetType][assetKey].price_history) {
                fetchAssetPriceData(assetType, assetKey, dateStart)(dispatchAssetData);
            }
        }

        localStorage.setItem('dateStart', dateStart.toString());
        localStorage.setItem('assetData', JSON.stringify(assetData));

        // Refresh every minute
        // TODO use sockets
        const timer = setInterval(() => {
            fetchCryptoMarketStoreData();
        }, 60000);

        return () => clearTimeout(timer);
    }, [assetType, assetKey, assetData, dateStart]);

    return (
        <MarketContext.Provider value={providerData}>
            <SwipeDown swipeIcon="bi-cloud-download" swipeMessage={t('refresh')} swipeActions={swipeActions}>
                <Switch>
                    <Route exact path={Constants.SITE_MARKET_PATH_BASE} component={MarketHome} />
                    <Route path={`${Constants.SITE_MARKET_ASSET_PATH}:type/:id`} component={MarketProfile} />
                </Switch>
            </SwipeDown>
        </MarketContext.Provider>
    );
};

export default Market;
