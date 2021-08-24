import React from 'react';
import Citation from './Citation';

type Props = {
    data: Array<Citation>;
    Format: React.FunctionComponent<Citation>;
}

const References: React.FunctionComponent<Props> = ({ data, Format }: Props): JSX.Element => {
    return (<>{data.map((citation, i) => <Format key={i} {...citation} />)}</>);
};

export default References;
