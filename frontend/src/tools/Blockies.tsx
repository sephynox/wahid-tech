import React from 'react';
import styled from 'styled-components';
import makeBlockie from 'ethereum-blockies-base64';
import { EnsLookupData, EnsLookupState, EnsLookupStates } from '../actions/Ethereum';
import LoaderSkeleton from './LoaderSkeleton';

type BlockiesProps = {
    state: EnsLookupState;
    width: number;
};

type BlockieProps = {
    data: EnsLookupData;
    width: number;
};

export const Blockie = ({ data, width }: BlockieProps): JSX.Element => (
    <figure>
        <BlockieStyle src={makeBlockie(data.address)} alt={data.address} width={width} />
        <address>{data.ens && <BlockieEnsStyle>{data.ens}</BlockieEnsStyle>}</address>
    </figure>
);

export const Blockies = ({ state, width }: BlockiesProps): JSX.Element => {
    switch (state.type) {
        case EnsLookupStates.SUCCESS:
            return (
                <>
                    {state.data.map((data) => (
                        <Blockie key={data.address} data={data} width={width} />
                    ))}
                </>
            );
        default:
        case EnsLookupStates.FETCHING:
            return <LoaderSkeleton type="Profile" width={width} height={width} />;
    }
};

export default Blockies;

const BlockieStyle = styled.img`
    width: 100%;
    max-width: ${(props: { width: number }) => `${props.width}px` ?? '100%'};
    border-radius: 10%;
`;

const BlockieEnsStyle = styled.cite`
    display: block;
    text-align: center;
`;
