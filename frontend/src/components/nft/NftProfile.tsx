import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Col, Figure, Modal, Row } from 'react-bootstrap';
import i18next from 'i18next';
import styled from 'styled-components';
import { Section } from '../../styles/Section';
import Data from './Data';
//import 'embeddable-nfts/src/nft-card';
import NotFound from '../../pages/NotFound';
import { NftContract } from '../../actions/OpenSea';
import { DefinitionList } from '../../styles/DefinitionList';
import SocialLinks from '../../tools/SocialLinks';

enum ModalState {
    OPEN,
    CLOSED,
};

const NftProfile: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const [modalState, setModalState] = useState(ModalState.CLOSED);

    const data = Data[id];

    if (data === undefined) {
        return <NotFound />;
    }

    const contract: NftContract = data.asset_contract;
    const title: string = data.name ?? t('no_name');
    const subtext: string = data.description ?? t('no_description');
    const image: string = data.image_url;
    const owner: string = data.owner?.address;
    const created: string = Intl.DateTimeFormat(i18next.language).format(data.listing_date);
    const sale_date: string = data.last_sale ? Intl.DateTimeFormat(i18next.language).format(data.last_sale) : '';

    const closeModal = () => {
        setModalState(ModalState.CLOSED)
    }

    return (
        <Section>
            <h2 className="capitalize mb-5">{title}</h2>
            <Row>
                <Col xs={12} md={12} lg={6} xl={6}>
                    <Figure className="pointer pl-0" onClick={() => setModalState(ModalState.OPEN)}>
                        <img src={image} alt={subtext} />
                        <figcaption><em>{subtext}</em></figcaption>
                    </Figure>
                </Col>
                <Col xs={12} md={12} lg={6} xl={6} className="d-flex flex-column">
                    <div className="spacer"></div>
                    <h3 className="capitalize pt-5">{t('details')}</h3>
                    <DefinitionList>
                        <dt className="capitalize">{t('contract')}:</dt>
                        <dd className="text-right">{contract.address}</dd>
                        <dt className="capitalize">{t('published')}:</dt>
                        <dd className="text-right">{created}</dd>
                        <dt className="capitalize">{t('max_supply')}:</dt>
                        <dd className="text-right">{contract.total_supply}</dd>
                        <dt className="capitalize no-print">{t('share')}:</dt>
                        <dd className="no-print text-right"><SocialLinks title={title} /></dd>
                    </DefinitionList>
                    {!owner
                        ?
                        <>
                            {/* <h4>For Sale</h4>
                            TODO get working with React 
                            <nft-card
                                tokenAddress={contract}
                                tokenId={data.id.toString()}
                                network={Network.Main}
                            /> */}
                        </>
                        :
                        <>
                            <h4>Sold</h4>
                            <DefinitionList>
                                <dt className="capitalize">{t('owner')}:</dt>
                                <dd className="text-right">{owner ? owner : t('no_owner')}</dd>
                                <dt className="capitalize">{t('last_sale')}:</dt>
                                <dd className="text-right">{sale_date ? sale_date : t('no_owner')}</dd>
                            </DefinitionList>
                        </>
                    }
                </Col>
            </Row>
            <ModalStyle show={modalState === ModalState.OPEN} onHide={closeModal} dialogClassName="modal-large" centered>
                <Modal.Header>
                    <Modal.Title className="capitalize">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Figure>
                        <img src={image} alt={subtext} />
                        <figcaption><em>{subtext}</em></figcaption>
                    </Figure>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="capitalize" variant="secondary" onClick={closeModal}>{t('close')}</Button>
                </Modal.Footer>
            </ModalStyle>
        </Section>
    );
};

export default NftProfile;

const ModalStyle = styled(Modal)`
    .modal-large {
        max-width: calc(100% - 20px);
    }
`;
