import React from 'react';
import { NavLink } from 'react-router-dom';

const Postcard = (props) => {
    return (
        <div className="card blog">
            <img className="card-img-top" src={props.image} alt={props.alt} />
            <div className="card-body">
                <h3 className="card-title">{props.title}</h3>
                <p>{props.date.toLocaleDateString()}</p>
                <p className="card-text">{props.text}</p>
                <NavLink className="btn btn-primary" to={'/technology-blog/posts/' + props.link}>Read</NavLink>
            </div>
        </div>
    );
}

export default Postcard;
