import React from "react";
import { DiscussionEmbed } from "disqus-react";

type Props = {
  full_url: string;
  shortname: string;
  identifier: string;
  title: string;
  language: string;
  eventComment: () => void;
};

const Comments = ({ full_url, shortname, identifier, title, language, eventComment }: Props): JSX.Element => {
  return (
    <DiscussionEmbed
      shortname={shortname}
      config={{
        onNewComment: eventComment,
        url: full_url,
        identifier: identifier,
        title: title,
        language: language,
      }}
    />
  );
};

export default Comments;
