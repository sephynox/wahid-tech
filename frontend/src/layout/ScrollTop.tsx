import { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const ScrollTop = ({ history }: RouteComponentProps) => {
    useEffect(() => {
        const listener = history.listen(() => {
            document.body.scrollTo(0, 0);
        });
        return () => {
            listener();
        }
    }, [history]);

    return (null);
};

export default withRouter(ScrollTop);
