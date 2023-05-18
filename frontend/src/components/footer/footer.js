import "./footer.css";
import { Instagram, Twitter, Envelope } from "react-bootstrap-icons";

function Footer() {
  return (
    <footer className="footer-container">
      <ul className="footer-icons">
        <li>
          <a href="https://www.instagram.com/silas.rei" className="footer-a">
            <Instagram />
          </a>
        </li>
        <li>
          <a href="https://www.github.com/Sil-Rei" className="footer-a">
            <Twitter />
          </a>
        </li>
        <li>
          <a href="mailto:silas@silasreiling.com" className="footer-a">
            <Envelope />
          </a>
        </li>
      </ul>

      <ul className="footer-links">
        <li>
          <a>contact</a>
        </li>
        <li>
          <a>about</a>
        </li>
        <li>
          <a>concept</a>
        </li>
      </ul>
      <p className="copyright">@2023 graphite | All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
