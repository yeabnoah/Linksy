import React, { useEffect } from "react";

const TelegramPost = ({ type, link }: { type: string; link: string }) => {
  function getLastTwoParts(url: string) {
    return url.split("/").slice(-2).join("/");
  }

  useEffect(() => {
    if (type === "telegram") {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://telegram.org/js/telegram-widget.js?4";
      script.setAttribute("data-telegram-post", getLastTwoParts(link));
      script.setAttribute("data-width", "250px"); // Adjust widget width
      script.setAttribute("data-height", "300px"); // Adjust widget height if supported
      document.getElementById("telegram-widget-container")?.appendChild(script);
    }
  }, [type]);

  if (type !== "telegram") {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 5,
      }}
    >
      <div
        className=" h-32"
        id="telegram-widget-container"
        style={{
          fontSize: "5px", // Adjust font size
          width: "250px", // Container width
          // height: "20px", // Container height
          overflow: "hidden",
          borderRadius: 10, // Prevent overflow
        }}
      ></div>
    </div>
  );
};

export default TelegramPost;
