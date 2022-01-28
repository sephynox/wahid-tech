import React, { useEffect, useRef } from 'react';
import 'tocbot/src/scss/styles.scss';
import 'tocbot/src/scss/tocbot.scss';
import styled from 'styled-components';
import * as tocbot from 'tocbot';
import { Container } from 'react-bootstrap';
import { ThemeEngine } from '../styles/GlobalStyle';
import { Theme } from '../tools/Themes';

type Props = {
    // Where to grab the headings to build the table of contents.
    contentSelector: string;
    // Which headings to grab inside of the contentSelector element.
    headingSelector?: string;
    // Title
    header?: string;
    // Headings that match the ignoreSelector will be skipped.
    ignoreSelector?: string;
    // For headings inside relative or absolute positioned containers within content
    hasInnerContainers?: boolean;
    // Main class to add to links.
    linkClass?: string;
    // Extra classes to add to links.
    extraLinkClasses?: string;
    // Class to add to active links,
    // the link corresponding to the top most heading on the page.
    activeLinkClass?: string;
    // Main class to add to lists.
    listClass?: string;
    // Extra classes to add to lists.
    extraListClasses?: string;
    // Class that gets added when a list should be collapsed.
    isCollapsedClass?: string;
    // Class that gets added when a list should be able
    // to be collapsed but isn't necessarily collapsed.
    collapsibleClass?: string;
    // Class to add to list items.
    listItemClass?: string;
    // Class to add to active list items.
    activeListItemClass?: string;
    // How many heading levels should not be collapsed.
    // For example, number 6 will show everything since
    // there are only 6 heading levels and number 0 will collapse them all.
    // The sections that are hidden will open
    // and close as you scroll to headings within them.
    collapseDepth?: number;
    // Smooth scrolling enabled.
    scrollSmooth?: boolean;
    // Smooth scroll duration.
    scrollSmoothDuration?: number;
    // Smooth scroll offset.
    scrollSmoothOffset?: number;
    // Callback for scroll end.
    scrollEndCallback?: (e: Event) => void;
    // Headings offset between the headings and the top of the document (this is meant for minor adjustments).
    headingsOffset?: number;
    // Timeout between events firing to make sure it's
    // not too rapid (for performance reasons).
    throttleTimeout?: number;
    // Element to add the positionFixedClass to.
    positionFixedSelector?: string;
    // Fixed position class to add to make sidebar fixed after scrolling
    // down past the fixedSidebarOffset.
    positionFixedClass?: string;
    // fixedSidebarOffset can be any number but by default is set
    // to auto which sets the fixedSidebarOffset to the sidebar
    // element's offsetTop from the top of the document on init.
    fixedSidebarOffset?: string;
    // includeHtml can be set to true to include the HTML markup from the
    // heading node instead of just including the textContent.
    includeHtml?: boolean;
    // onclick function to apply to all links in toc. will be called with
    // the event as the first parameter, and this can be used to stop,
    // propagation, prevent default or perform action
    onClick?: (e: Event) => void;
    // orderedList can be set to false to generate unordered lists (ul)
    // instead of ordered lists (ol)
    orderedList?: boolean;
    // If there is a fixed article scroll container, set to calculate titles' offset
    scrollContainer?: string;
    // prevent ToC DOM rendering if it's already rendered by an external system
    skipRendering?: boolean;
    // Optional callback to change heading labels.
    // For example it can be used to cut down and put ellipses on multiline headings you deem too long.
    // Called each time a heading is parsed. Expects a string in return, the modified label to display.
    // function (string) => string
    headingLabelCallback?: boolean;
    // ignore headings that are hidden in DOM
    ignoreHiddenElements?: boolean;
    // Optional callback to modify properties of parsed headings.
    // The heading element is passed in node parameter and information parsed by default parser is provided in obj parameter.
    // Function has to return the same or modified obj.
    // The heading will be excluded from TOC if nothing is returned.
    // function (object, HTMLElement) => object | void
    headingObjectCallback?: (o: Record<string, unknown>, el: JSX.Element) => Record<string, unknown> | void;
    // Set the base path, useful if you use a `base` tag in `head`.
    basePath?: string;
    // Only takes affect when `tocSelector` is scrolling,
    // keep the toc scroll position in sync with the content.
    disableTocScrollSync?: boolean;
};

const Tocbot: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
    const element = useRef<HTMLBaseElement>(null);

    useEffect(() => {
        const classRef = `.${element.current?.className.replace(' ', '.')} div aside`;

        tocbot.init(
            Object.assign(
                {
                    tocSelector: classRef,
                    scrollSmooth: true,
                    scrollContainer: 'body',
                    onClick: (e: Event) => e.preventDefault(),
                },
                props,
            ),
        );

        // HACK
        // eslint-disable-next-line
        return () => element.current !== null && tocbot.destroy();
    });

    return (
        <TocStyle ref={element}>
            <Container>
                {props.header && <h2>{props.header}</h2>}
                <aside className="js-toc toc" />
            </Container>
        </TocStyle>
    );
};

export default Tocbot;

const TocStyle = styled.aside<Theme>`
    height: auto;
    pointer-events: none;
    width: 100%;

    & div aside {
        transform: none;
        display: block;
        pointer-events: all;
        background-color: rgba(255, 255, 255, 0);
    }

    & div aside .toc-list {
        padding-left: 50px;
    }

    & .is-active-link::before {
        background-color: ${(props: ThemeEngine) => props.theme.info};
    }

    @media (min-width: 1250px) {
        width: auto;
        height: 100vh;
        position: fixed;
        display: flex;
        align-items: center;
        margin-right: 20px;
        top: 0;
        left: 1020px;

        & div {
        }

        & div aside {
            width: auto;
            height: auto;
        }
    }
`;
