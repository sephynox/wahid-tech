import * as React from 'react'
import Routes from '../Routes'

const Body: React.FunctionComponent = (): JSX.Element => (
    <section className="d-flex flex-column">
        <div className="margin-auto-vertical">
            <Routes />
        </div>
    </section>
);

export default Body;
