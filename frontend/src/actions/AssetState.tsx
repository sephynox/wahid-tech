import { MarketData, MarketType } from "../tools/MarketData";

export enum AssetStates {
  EMPTY,
  FETCHING,
  ERROR,
  FETCHED_ASSET_META_DATA,
  FETCHED_ASSET_MARKET_DATA,
  FETCHED_ASSET_PRICE_DATA,
}

export type AssetStateData = Record<MarketType, Record<string, MarketData>>;

export type AssetState =
  | { type: AssetStates.EMPTY; data?: AssetStateData }
  | { type: AssetStates.FETCHING; class: MarketType; data?: AssetStateData }
  | { type: AssetStates.ERROR; class: MarketType; error: string; data?: AssetStateData }
  | { type: AssetStates.FETCHED_ASSET_META_DATA; class: MarketType; data: AssetStateData }
  | { type: AssetStates.FETCHED_ASSET_MARKET_DATA; class: MarketType; data: AssetStateData }
  | { type: AssetStates.FETCHED_ASSET_PRICE_DATA; class: MarketType; key: string; data: AssetStateData };

export const initialAssetState: AssetState = {
  type: AssetStates.EMPTY,
  data: { [MarketType.CRYPTO]: {}, [MarketType.STOCK]: {}, [MarketType.COMMODITY]: {} },
};
