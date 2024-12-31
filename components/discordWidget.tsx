import React from "react";

interface DiscordEmbedProps {
  link: string;
}

const DiscordEmbed: React.FC<DiscordEmbedProps> = ({ link }) => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <iframe
        src={link}
        width="350"
        height="500"
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        title="Discord Server Widget"
      ></iframe>
    </div>
  );
};

export default DiscordEmbed;
