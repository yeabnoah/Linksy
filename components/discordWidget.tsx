import React from "react";

interface DiscordChannelProps {
  link: string;
}

const DiscordChannel: React.FC<DiscordChannelProps> = ({ link }) => {
  const isValidDiscordLink = link.startsWith("https://discord.com/channels/");

  if (!isValidDiscordLink) {
    return <p>Invalid Discord link. Please provide a valid channel link.</p>;
  }

  return (
    <iframe
      src={link}
      width="800"
      height="600"
      allowTransparency={true}
      frameBorder="0"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      title="Discord Channel"
    ></iframe>
  );
};

export default DiscordChannel;
