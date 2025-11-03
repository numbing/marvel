import { useState } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './ComicNavbar.css';

const ComicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((open) => !open);
  const close = () => setIsOpen(false);

  return (
    <Navbar expand="md" className="comic-navbar" container="fluid">
      <NavbarBrand tag={NavLink} to="/" onClick={close} className="comic-navbar-brand">
        <span className="brand-icon">💥</span> Comics Explorer
      </NavbarBrand>
      <NavbarToggler onClick={toggle} className="comic-navbar-toggler" aria-label="Toggle navigation" />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <NavLink to="/" className="comic-nav-link" onClick={close}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <a
              className="comic-nav-link"
              href="https://comicvine.gamespot.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
            >
              Comic Vine
            </a>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default ComicNavbar;
