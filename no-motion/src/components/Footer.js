import React from "react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="test-sb">
        <div className="footer-note">
          <h1>Thank you for your time,</h1>
          <h1>
            let's build <span className="footer-note-gradient">together.</span>
          </h1>
        </div>
        <div className="footer-contact">
          <div>send me an email</div>
          <div>connect on LinkedIn</div>
        </div>
        <div className="footer-initials">
          <Image
            src="./mg.svg"
            alt="just the initials for my name, stylized to fit the theme. Initials are: 'm' & 'g'"
            height={40}
            width={60}
          />
        </div>
        <div className="copy">@2023</div>
      </div>
    </footer>
  );
};
