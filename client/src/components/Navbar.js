import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  padding: ${props => props.scrolled ? '0.5rem 0' : '1rem 0'};
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  
  img {
    height: ${props => props.scrolled ? '40px' : '50px'};
    transition: height 0.3s ease;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 300px;
    height: 100vh;
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 5rem 2rem 2rem;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    gap: 1.5rem;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--dark-gray);
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-red);
  }
  
  &.active {
    color: var(--primary-red);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--primary-red);
      
      @media (max-width: 768px) {
        display: none;
      }
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.5rem 0;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--dark-gray);
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-red);
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuOverlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const CloseButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--dark-gray);
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-red);
    }
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <NavContainer scrolled={scrolled}>
        <NavContent>
          <Logo to="/" scrolled={scrolled}>
            <img src="/images/dd1.jpg" alt="DuoDream Events" />
          </Logo>
          
          <NavLinks isOpen={isOpen}>
            <CloseButton onClick={closeMenu}>
              <FaTimes />
            </CloseButton>
            <li>
              <NavLink 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/services" 
                className={location.pathname === '/services' ? 'active' : ''}
                onClick={closeMenu}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/gallery" 
                className={location.pathname === '/gallery' ? 'active' : ''}
                onClick={closeMenu}
              >
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={location.pathname === '/contact' ? 'active' : ''}
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
          </NavLinks>
          
          <MobileMenuButton onClick={toggleMenu}>
            <FaBars />
          </MobileMenuButton>
        </NavContent>
      </NavContainer>
      
      <MobileMenuOverlay isOpen={isOpen} onClick={closeMenu} />
    </>
  );
};

export default Navbar;
