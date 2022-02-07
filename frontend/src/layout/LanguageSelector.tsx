import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { chunkArray } from "../utils/data-helpers";

type Props = {
  systemLanguages: Record<string, string>;
  langSelectorState: LanguageSelectorState;
  setLangSelectorState: (state: LanguageSelectorState) => void;
  columns?: number;
};

export enum LanguageSelectorState {
  OPEN,
  CLOSED,
}

const LanguageSelector: React.FunctionComponent<Props> = ({
  systemLanguages,
  langSelectorState,
  setLangSelectorState,
  columns = 3,
}: Props): JSX.Element => {
  const { t, i18n } = useTranslation();

  const changeLanguageHandler = (lang: string): void => {
    document.documentElement.lang = lang;
    i18n.changeLanguage(lang);
    closeLanguageSelector();
  };

  const closeLanguageSelector = () => {
    setLangSelectorState(LanguageSelectorState.CLOSED);
  };

  const supportedLanguages = Object.keys(systemLanguages);
  const languagesGrid: Array<Array<string>> = chunkArray<string>(supportedLanguages, columns);

  const options: Array<JSX.Element> = languagesGrid.map((group: string[], i: number): JSX.Element => {
    return (
      <Row key={i} className={0 !== i ? "mt-3" : undefined}>
        {group.map((lang: string, x: number) => (
          <Col key={x} className="mt-3 text-center">
            <Button
              onClick={() => {
                changeLanguageHandler(lang);
              }}
              variant={i18n.language === lang ? "primary" : "secondary"}
            >
              {systemLanguages[lang]}
            </Button>
          </Col>
        ))}
      </Row>
    );
  });

  return (
    <Modal show={langSelectorState === LanguageSelectorState.OPEN} onHide={closeLanguageSelector} centered>
      <Modal.Header>
        <Modal.Title>{t("language")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>{options}</Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeLanguageSelector}>
          {t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LanguageSelector;
