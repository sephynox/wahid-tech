import React, { useState, useEffect } from 'react';
import { Button, Col, Nav, Row, Tab } from 'react-bootstrap';
import styled from 'styled-components';
import { ThemeEngine } from '../styles/GlobalStyle';
import Theme from '../tools/Themes';
import Switch, { SwitchStates } from '../tools/Switch';

type Props = {
    title: string;
    text: string;
    show: boolean;
    settings: Record<string, PrivacySetting>;
    acceptAllText: string;
    rejectAllText: string;
    customizeText: string;
    closeExpandedText: string;
    acceptExpandedText: string;
    settingsCallback: (settings: PrivacyCookieState) => void;
};

export type PrivacyCookieState = {
    [key: string]: boolean;
}

export enum PrivacyPromptState {
    INACTIVE,
    ACTIVE,
}

export type PrivacyCookie = {
    name: string;
    expiration: string;
    description: string;
};

export type PrivacySetting = {
    active: boolean;
    locked: boolean;
    title: string;
    description: string;
    cookies: Record<string, PrivacyCookie>;
};

const PrivacyPrompt = (props: Props): JSX.Element => {
    const [promptActive, setPromptActive] = useState(props.show ? PrivacyPromptState.ACTIVE : PrivacyPromptState.INACTIVE);
    const [customizeActive, setCustomizeActive] = useState(PrivacyPromptState.INACTIVE);
    const [settings, setSettings] = useState(props.settings);

    const toggleCustomizeState = () => {
        setCustomizeActive(customizeActive === PrivacyPromptState.ACTIVE ? PrivacyPromptState.INACTIVE : PrivacyPromptState.ACTIVE);
    };

    const setPrivacyPromptComplete = (reject?: boolean, accept?: boolean) => {
        const state: PrivacyCookieState = {};

        for (const key in settings) {
            state[key] = reject && !settings[key].locked ? false : accept ?? settings[key].active;
        }

        props.settingsCallback(state);
    };

    const categoryTab = (key: string, title: string): JSX.Element => (
        <Nav.Item key={key}>
            <Nav.Link eventKey={key}>{title}</Nav.Link>
        </Nav.Item>
    );

    const tabPane = (key: string, text: string, state: SwitchStates, locked: boolean): JSX.Element => (
        <Tab.Pane key={key} eventKey={key}>
            <Switch
                changeHandler={(s: SwitchStates) => { settings[key].active = s === SwitchStates.ACTIVE ? true : false; }}
                active={state}
                size={25}
                margin={.5}
                fontSize={1}
                className="mb-3"
                disabled={locked}
            />
            <p>{text}</p>
        </Tab.Pane>
    );

    const getCategories = (): Array<JSX.Element> => {
        return Object.keys(settings).map((k): JSX.Element => {
            return categoryTab(k, settings[k].title);
        });
    }

    const getCategoryTabs = (): Array<JSX.Element> => {
        return Object.keys(settings).map((k): JSX.Element => {
            return tabPane(
                k,
                settings[k].description,
                settings[k].active ? SwitchStates.ACTIVE : SwitchStates.INACTIVE,
                settings[k].locked,
            );
        });
    }

    useEffect(() => {
        setSettings(props.settings);
        setPromptActive(props.show ? PrivacyPromptState.ACTIVE : PrivacyPromptState.INACTIVE);
    }, [props, settings]);

    return (
        <PrivacyPromptStyle className={promptActive === PrivacyPromptState.ACTIVE ? 'active' : 'inactive'}>
            <div className={`privacy-prompt-banner ${customizeActive === PrivacyPromptState.ACTIVE ? 'expanded' : ''}`}>
                <Row>
                    <Col>
                        <p><strong>{props.title}</strong></p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={9} xl={9}>
                        <p>{props.text}</p>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={3} xl={3} className="privacy-prompt-buttons">
                        <Button onClick={() => setPrivacyPromptComplete(false, true)}>{props.acceptAllText}</Button>
                        <Button onClick={() => setPrivacyPromptComplete(true)} variant="outline-danger">{props.rejectAllText}</Button>
                        <br /><Button onClick={toggleCustomizeState} variant="link">{props.customizeText}</Button>
                    </Col>
                </Row>
                <Row className={`privacy-prompt-customize ${customizeActive === PrivacyPromptState.ACTIVE ? 'active' : ''}`}>
                    <Col>
                        <Row>
                            <Col>
                                <Tab.Container defaultActiveKey={Object.keys(settings)[0]}>
                                    <Row>
                                        <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                                            <Nav variant="tabs" className="flex-column">
                                                {getCategories()}
                                            </Nav>
                                        </Col>
                                        <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                                            <Tab.Content>
                                                {getCategoryTabs()}
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </Col>
                        </Row>
                        <Row className="text-right">
                            <Col className="privacy-prompt-buttons">
                                <Button onClick={() => setPrivacyPromptComplete()}>{props.acceptExpandedText}</Button>
                                <Button variant="outline-danger" onClick={toggleCustomizeState}>{props.closeExpandedText}</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </PrivacyPromptStyle>
    );
};

export default PrivacyPrompt;

const PrivacyPromptStyle = styled.div<Theme>`
    font-size: 0.9em;
    z-index: 9000;
    width: 100%;
    background-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};
    position: fixed;
    top: 0;

    &.active {
        display: block;
    }

    &.inactive {
        display: none;
    }

    & .privacy-prompt-customize {
        display: none;
        padding-top: 10px;
    }

    & .privacy-prompt-customize.active {
        display: block;
    }

    & .privacy-prompt-banner {
        padding: 20px;
    }

    & .privacy-prompt-buttons {
        text-align: right;
    }

    & .privacy-prompt-buttons > button {
        font-size: .9em;
        margin-left: 10px;
    }

    @media (min-width: 768px) {

    }

    @media screen and (max-width: 768px) {
        & .tab-pane {
            margin-top: 15px;
        }

        & .privacy-prompt-banner.expanded {
            height: 100vh;
        }

        & .privacy-prompt-customize.active {
            height: 100%;
            padding-bottom: 10px;
            overflow-y: auto;
        }
    }
`;
