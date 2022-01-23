import { ethers } from 'ethers';
import { Dispatch } from 'react';
import * as Constants from '../Constants';

export enum EnsLookupStates {
    EMPTY,
    FETCHING,
    ERROR,
    SUCCESS,
}

export enum EnsLookupErrors {
    NO_ENS_SET = 'No ENS set for address.',
}

export type EnsLookupData = {
    ens: string;
    address: string;
};

// TODO
export type EnsLookupCache = {
    forward: Record<string, EnsLookupData>;
    reverse: Record<string, EnsLookupData>;
};

export type EnsLookupState =
    | { type: typeof EnsLookupStates.EMPTY; data?: EnsLookupData[] }
    | { type: typeof EnsLookupStates.FETCHING; data?: EnsLookupData[] }
    | { type: typeof EnsLookupStates.ERROR; data?: EnsLookupData[]; error: EnsLookupErrors }
    | { type: typeof EnsLookupStates.SUCCESS; data: EnsLookupData[] };

export const initialEnsLookupState: EnsLookupState = {
    type: EnsLookupStates.EMPTY,
};

export const ensLookupReducer = (state: EnsLookupState, action: EnsLookupState): EnsLookupState => {
    switch (action.type) {
        case EnsLookupStates.FETCHING:
            return { ...state, type: EnsLookupStates.FETCHING };
        case EnsLookupStates.SUCCESS:
            return { ...state, type: EnsLookupStates.SUCCESS, data: action.data };
        case EnsLookupStates.ERROR:
            return { ...state, type: EnsLookupStates.ERROR, error: action.error };
        default:
            return { ...state, ...EnsLookupStates };
    }
};

export const fetchAddresses =
    (addresses: string[], provider: ethers.providers.Provider) =>
    async (dispatch: Dispatch<EnsLookupState>): Promise<void> => {
        dispatch({ type: EnsLookupStates.FETCHING });
        return Promise.all(
            addresses.map(async (address) => {
                if (address.match(new RegExp(Constants.REGEX_ETHEREUM_ADDRESS))) {
                    const result = await provider.lookupAddress(address);

                    switch (result) {
                        case '':
                            throw Error(EnsLookupErrors.NO_ENS_SET.toString());
                        default:
                            return { ens: address, address: result };
                    }
                } else {
                    return { ens: address, address: await provider.resolveName(address) };
                }
            }),
        ).then(
            (result) => dispatch({ type: EnsLookupStates.SUCCESS, data: result }),
            (error) => dispatch({ type: EnsLookupStates.ERROR, error: error.message }),
        );
    };
