import React, { useEffect } from "react";

const PinterestEmbed = ({ link }: { link: string }) => {
  useEffect(() => {
    // Ensure the Pinterest SDK is loaded
    const script = document.createElement("script");
    script.src = "https://assets.pinterest.com/js/pinit.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup the script
    };
  }, []);

  return (
    <div>
      <a data-pin-do="embedPin" href={link}>
        Pinterest Pin
      </a>
    </div>
  );
};

export default PinterestEmbed;
