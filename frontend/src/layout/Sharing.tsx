import React from "react";

import { socialLinks } from "../Data";
import SocialLinks from "../components/SocialLinks";

type Props = {
  title: string;
  url?: string;
};

const Sharing: React.FunctionComponent<Props> = ({ title, url }): JSX.Element => {
  return <SocialLinks url={url} title={title} links={socialLinks} />;
};

export default Sharing;
