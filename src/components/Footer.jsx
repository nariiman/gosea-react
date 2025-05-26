function Footer() {
  return (
    <footer className="mainFooter">
      <div className="footerContent">
        <p>&copy; {new Date().getFullYear()} Shorely. All rights reserved.</p>
        <ul>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms">Terms of Service</a>
          </li>
          <li>
            <a href="/support">Support</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
