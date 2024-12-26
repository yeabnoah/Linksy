import React from "react";

const TelegramEmbed = ({ link }: { link: string }) => {
  const embedUrl = `https://t.me/s/${link}`;
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "500px" }}>
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
      />
    </div>
  );
};

export default TelegramEmbed;
