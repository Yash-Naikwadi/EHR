import React, { useState } from "react";
import NavBar from "./NavBar";

function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);
  function onEnter() {
    setIsHovered(true);
  }
  function onLeave() {
    setIsHovered(false);
  }

  return (
    <div>
        <NavBar></NavBar>
      <div>
        <div
          onMouseEnter={() => setTimeout(onEnter, 500)}
          onMouseHover={() => setTimeout(onLeave, 700)}
          onMouseLeave={() => setTimeout(onLeave, 600)}

        >

          {/* Content */}
          <div>
            <div>
              <p>
              The Secure Electronic Health Records App is revolutionizing EHR management by leveraging blockchain technology. Utilizing key components such as blockchain for secure and transparent data storage, Ganache for rapid development, Metamask for seamless blockchain interaction, and IPFS desktop for decentralized file storage, It ensures enhanced security, improved accessibility, data interoperability, and trust. By adopting this innovative approach, It aims to transform healthcare data management, leading to better patient outcomes and improved healthcare delivery.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;