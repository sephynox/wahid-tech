import React, { useState } from "react";
import { Btc } from "react-cryptocoins";
import styled from "styled-components";

import Theme from "../styles/Themes";
import { AssetData } from "../tools/MarketData";
import QRCodeModal, { QRModalState } from "./QRCodeModal";

const CryptoAssets: React.FunctionComponent<{ data: Record<string, AssetData>; size: number }> = (
  props,
): JSX.Element => {
  const [activeAddress, setActiveAddress] = useState({} as AssetData);
  const [qrModalState, setQRModalState] = useState(QRModalState.CLOSED);

  const clickIcon = (asset: AssetData) => {
    setActiveAddress(asset);
    setQRModalState(QRModalState.OPEN);
  };

  const DonationOptions = (): JSX.Element => (
    <>
      {Object.keys(props.data).map(function (k, i) {
        const Icon = props.data[k].icon ?? Btc;
        return (
          <li key={i}>
            <i
              title={props.data[k].name}
              onClick={() => clickIcon(props.data[k])}
              onKeyPress={() => clickIcon(props.data[k])}
              role="button"
              tabIndex={i}
            >
              <Icon size={props.size} />
            </i>
          </li>
        );
      })}
    </>
  );

  return (
    <>
      <CryptoAssetsStyle>
        <DonationOptions />
      </CryptoAssetsStyle>
      <QRCodeModal state={qrModalState} stateManager={setQRModalState} asset={activeAddress} />
    </>
  );
};

export default CryptoAssets;

const CryptoAssetsStyle = styled.ul<Theme>`
  padding-left: 0;

  & li {
    display: inline-block;
    list-style-type: none;
    word-wrap: break-word;
  }

  & li:not(:first-child) {
    margin-left: 20px;
  }

  & li:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;
