import React, { useContext } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../App';
import { supportedLanguages, systemLanguages } from '../Data';
import { chunkArray } from '../utils/data-helpers';

type Props = {
    columns?: number
};

export enum LanguageSelectorState {
    OPEN,
    CLOSED
};

const LanguageSelector: React.FunctionComponent<Props> = ({ columns = 3 }: Props): JSX.Element => {
    const appContext = useContext(AppContext);
    const { t, i18n } = useTranslation();

    const changeLanguageHandler = (lang: string): void => {
        i18n.changeLanguage(lang);
        closeLanguageSelector();
    };

    const closeLanguageSelector = () => {
        appContext.setLangSelectorState(LanguageSelectorState.CLOSED);
    };

    const languagesGrid: Array<Array<string>> = chunkArray<string>(supportedLanguages, columns);

    const options: Array<JSX.Element> = languagesGrid.map((group: Array<string>, i: number): JSX.Element => {
        return (
            <Row key={i} className={0 !== i ? 'mt-3' : undefined}>
                {group.map((lang: string, x: number) => (
                    <Col key={x} className="mt-3 text-center">
                        <Button
                            onClick={() => { changeLanguageHandler(lang); }}
                            variant={i18n.language === lang ? 'primary' : 'secondary'}>
                            {systemLanguages[lang]}
                        </Button>
                    </Col>
                ))}
            </Row>
        );
    });

    return (
        <Modal show={appContext.langSelectorState === LanguageSelectorState.OPEN} onHide={closeLanguageSelector} centered>
            <Modal.Header>
                <Modal.Title className="capitalize">{t('language')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>{options}</Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="capitalize" variant="secondary" onClick={closeLanguageSelector}>{t('close')}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LanguageSelector;
