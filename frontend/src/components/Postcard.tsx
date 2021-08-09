import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ArticleImage } from './blog/Article';

type Props = {
    title: string;
    text: string;
    link: string;
    linkText?: string;
    image: ArticleImage;
    date: Date;
};

const Postcard = ({ title, text, link, image, date, linkText = 'read' }: Props): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className="card blog">
            <img className="card-img-top" src={'/images/blog/' + image.url} alt={image.alt} />
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p>{date.toLocaleDateString()}</p>
                <p className="card-text">{text}</p>
                <NavLink className="btn btn-primary capitalize" to={link}>{t(linkText)}</NavLink>
            </div>
        </div>
    );
};

export default Postcard;
