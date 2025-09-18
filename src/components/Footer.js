import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div>
      <div>
        <div>
          {/* Contact Information */}
          <div>
            <h3>Contact Information</h3>
            <p>
              <span>Address:</span> 123 Street, City,
              Country
            </p>
            <p>
              <span>Phone:</span> +123 456 7890
            </p>
            <p>
              <span>Email:</span> example@company.com
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3>Useful Links</h3>
            <ul>
              <li>
                <a href="#">
                  About Us
                </a>
              </li>
              <li>
                <a href="#">
                  Services
                </a>
              </li>
              <li>
                <a href="#">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Other Links</h3>
            <ul>
              <li>
                <a href="#">
                  Security Partners
                </a>
              </li>
              <li>
                <a href="#">
                  Medical Donors
                </a>
              </li>
              <li>
                <a href="#">
                  Sponsors
                </a>
              </li>
              <li>
                <a href="#">
                  Careers
                </a>
              </li>
              <li>
                <a href="#">
                  Board Members Information
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div>
            <a
              href="https://instagram.com/company"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a
              href="https://facebook.com/company"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </a>
            <a
              href="https://linkedin.com/company"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
