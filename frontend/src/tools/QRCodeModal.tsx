import React, { Dispatch, SetStateAction } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Btc } from 'react-cryptocoins';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { ThemeEngine } from '../styles/GlobalStyle';
import { AssetData } from './MarketData';
import ReadMore from './ReadMore';
import { formatFirstUpper } from '../utils/data-formatters';

type Props = {
    state: QRModalState;
    stateManager: Dispatch<SetStateAction<QRModalState>>;
    asset: AssetData;
};

export enum QRModalState {
    OPEN,
    CLOSED
};

const QRCodeModal = ({ state, stateManager, asset }: Props): JSX.Element => {
    const { t } = useTranslation();
    const Icon = asset.icon ?? Btc;

    const closeQRModal = () => {
        stateManager(QRModalState.CLOSED);
    };

    return (
        <Modal show={state === QRModalState.OPEN} onHide={closeQRModal} dialogClassName="modal-large" centered>
            <Modal.Header>
                <Modal.Title className="capitalize">{asset.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="text-center vertical-align">
                            <QRCodeStyle excavate className="text-center vertical-align">
                                <QRCode value={asset.address} />
                                <Icon color="red" size={24} />
                            </QRCodeStyle>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                            <dl className="dl-horizontal dl-custom mt-5">
                                <dt className="text-right capitalize">{t('asset')}:</dt>
                                <dd>{asset.name}</dd>
                                <dt className="text-right capitalize">{t('address')}:</dt>
                                <dd className="word-wrap"><ReadMore text={asset.address} charactersMax={12} copy /></dd>
                            </dl>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeQRModal}>{formatFirstUpper(t('close'))}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default QRCodeModal;


const QRCodeStyle = styled.div`
    padding: 10px;
    background-color: ${(props: ThemeEngine) => props.theme.info};

    & svg {
        position: absolute;
        border-radius: 25px;
        background-color: ${(props: ThemeEngine) => props.theme.info};
    }
`;
