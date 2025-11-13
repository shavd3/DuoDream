import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, var(--dark-gray) 0%, #2d3748 100%);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-family: var(--font-heading);
  }
  
  p, li {
    color: #cbd5e0;
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  a {
    color: #cbd5e0;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-red);
    }
  }
`;

const Logo = styled.div`
  img {
    height: 50px;
    margin-bottom: 1rem;
    filter: brightness(0) invert(1);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  
  svg {
    margin-right: 0.75rem;
    color: var(--primary-red);
    font-size: 1.1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    
    &:hover {
      background: var(--primary-red);
      transform: translateY(-2px);
    }
    
    &.whatsapp:hover {
      background: #25d366;
    }
    
    &.facebook:hover {
      background: #1877f2;
    }
    
    &.instagram:hover {
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
  text-align: center;
  
  p {
    color: #a0aec0;
    margin: 0;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    text-align: left;
  }
`;

const QuickLinks = styled.ul`
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    display: inline-flex;
    align-items: center;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateX(5px);
    }
    
    &::before {
      content: '→';
      margin-right: 0.5rem;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    
    &:hover::before {
      opacity: 1;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <Logo>
              <img src="/images/dd1.jpg" alt="DuoDream Events" />
            </Logo>
            <p>
              Creating unforgettable experiences through professional event planning, 
              stunning backdrop designs, and capturing precious moments through photography.
            </p>
            <SocialLinks>
              <a 
                href="https://wa.me/94706204205" 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp"
                title="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a 
                href="https://facebook.com/duodreamevents" 
                target="_blank" 
                rel="noopener noreferrer"
                className="facebook"
                title="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://instagram.com/duodreamevents" 
                target="_blank" 
                rel="noopener noreferrer"
                className="instagram"
                title="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="mailto:duodreamevents@gmail.com"
                title="Email"
              >
                <FaEnvelope />
              </a>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Quick Links</h3>
            <QuickLinks>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </QuickLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Our Services</h3>
            <ul>
              <li>Backdrop Design & Setup</li>
              <li>Event Planning & Coordination</li>
              <li>Professional Photography</li>
              <li>Wedding Decorations</li>
              <li>Birthday Party Setups</li>
              <li>Corporate Events</li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <FaMapMarkerAlt />
              <span>100/1 Uyana Road, Uyana Moratuwa</span>
            </ContactInfo>
            <ContactInfo>
              <FaPhone />
              <div>
                <div>+94 706 204 205</div>
                <div>+94 771 755 673</div>
              </div>
            </ContactInfo>
            <ContactInfo>
              <FaEnvelope />
              <a href="mailto:duodreamevents@gmail.com">
                duodreamevents@gmail.com
              </a>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>
        
        <FooterBottom>
          <p>
            © {new Date().getFullYear()} DuoDream Events. All rights reserved. 
            Made with ❤️ for creating beautiful memories.
          </p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
