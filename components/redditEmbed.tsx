import React, { useEffect } from "react";

const RedditEmbed = ({ postUrl }: { postUrl: string }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//embed.redditmedia.com/widgets/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <blockquote className="reddit-card" data-card-created="1553892582">
      <a href={postUrl}>{postUrl}</a>
    </blockquote>
  );
};

export default RedditEmbed;
