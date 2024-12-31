import React, { useEffect } from "react";

interface LinkedinProps {
  link: string;
}

const Linkedin: React.FC<LinkedinProps> = ({ link }) => {
  useEffect(() => {
    // Dynamically load the LinkedIn embed script
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/in.js";
    script.async = true;
    script.innerHTML = "IN.init();"; // Initialize LinkedIn embed
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Embed LinkedIn post using <blockquote> */}
      <blockquote
        className="linkedin-post"
        data-source={link}
        style={{ width: "100%", height: "auto" }}
      >
        <a href={link} target="_blank" rel="noopener noreferrer">
          View the LinkedIn Post
        </a>
      </blockquote>
    </div>
  );
};

export default Linkedin;
