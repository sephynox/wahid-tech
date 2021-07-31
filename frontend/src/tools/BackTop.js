import React, { useEffect, useState } from 'react';
import { TopButton } from './Styles';

const BackTop = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = (event) => {
        const scrollTop = document.body.scrollTop;

        if (scrollTop > 300) {
            setVisible(true)
        }
        else if (scrollTop <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        console.log('top');
        document.body.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible, { capture: true });
    }, []);

    return (
        <TopButton
            className="icon bi-arrow-bar-up"
            onClick={scrollToTop}
            style={{ display: visible ? 'inline' : 'none' }}>
        </TopButton>
    );
}

export default BackTop;
