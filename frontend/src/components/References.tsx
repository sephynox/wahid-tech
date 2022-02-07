import React from "react";

import Citation from "../tools/Citation";

type Props = {
  data: Array<Citation>;
  format: React.FunctionComponent<Citation>;
};

const References: React.FunctionComponent<Props> = ({ data, format: Format }: Props): JSX.Element => {
  return (
    <>
      {data.map((citation, i) => (
        <Format key={i} {...citation} />
      ))}
    </>
  );
};

export default References;
