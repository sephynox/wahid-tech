import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Col, Figure, Modal, Row } from 'react-bootstrap';
import i18next from 'i18next';
import styled from 'styled-components';
import { Section } from '../../styles/Section';
import Data from './Data';
import NotFound from '../../pages/NotFound';
import { NftContract } from '../../actions/OpenSea';
import { DefinitionList } from '../../styles/DefinitionList';
import SocialLinks from '../../tools/SocialLinks';
import OpenSea from './OpenSea';
import { formatNumber } from '../../utils/data-formatters';

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
    const price: string = formatNumber(data.top_bid ?? 1, i18next.language, 18, { minimumFractionDigits: 5 });
    const title: string = data.name ?? t('no_name');
    const subtext: string = data.description ?? t('no_description');
    const image = { url: data.image_url, alt: data.name };
    const owner: string = data.owner?.address;
    const created: string = Intl.DateTimeFormat(i18next.language).format(data.listing_date);
    const sale_date: string = data.last_sale ? Intl.DateTimeFormat(i18next.language).format(data.last_sale) : '';

    const closeModal = () => {
        setModalState(ModalState.CLOSED)
    }

    return (
        <Section>
            <h2 className="mb-5">{title}</h2>
            <Row>
                <Col xs={12} md={12} lg={6} xl={6}>
                    <Figure className="pointer pl-0 pr-0-md" onClick={() => setModalState(ModalState.OPEN)}>
                        <img src={image.url} alt={subtext} />
                        <figcaption><em>{subtext}</em></figcaption>
                    </Figure>
                </Col>
                <Col xs={12} md={12} lg={6} xl={6} className="d-flex flex-column">
                    <div className="spacer"></div>
                    <h3 className="pt-5">{t('details')}</h3>
                    <DefinitionList>
                        <dt>{t('contract')}:</dt>
                        <dd className="text-right">
                            <a target="_blank" href={`${contract.network}${contract.address}`} rel="noreferrer">{contract.address}</a>
                        </dd>
                        <dt>{t('published')}:</dt>
                        <dd className="text-right">{created}</dd>
                        <dt>{t('max_supply')}:</dt>
                        <dd className="text-right">{contract.total_supply}</dd>
                        <dt>{t('share')}:</dt>
                        <dd className="text-right"><SocialLinks title={title} url={window.location.href} /></dd>
                    </DefinitionList>
                    {!owner
                        ?
                        <>
                            <h4>For Sale</h4>
                            <OpenSea
                                address={data.permalink}
                                price={price}
                                button={t('purchase')}
                                image={image}
                            />
                        </>
                        :
                        <>
                            <h4>Sold</h4>
                            <DefinitionList>
                                <dt>{t('owner')}:</dt>
                                <dd className="text-right">{owner ? owner : t('no_owner')}</dd>
                                <dt>{t('last_sale')}:</dt>
                                <dd className="text-right">{sale_date ? sale_date : t('no_owner')}</dd>
                            </DefinitionList>
                        </>
                    }
                </Col>
            </Row>
            <ModalStyle show={modalState === ModalState.OPEN} onHide={closeModal} dialogClassName="modal-large" centered>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Figure>
                        <img src={image.url} alt={subtext} />
                        <figcaption><em>{subtext}</em></figcaption>
                    </Figure>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>{t('close')}</Button>
                </Modal.Footer>
            </ModalStyle>
        </Section>
    );
};

export default NftProfile;

const ModalStyle = styled(Modal)`
    .modal-large {
        max-width: 100vh;
    }
`;
