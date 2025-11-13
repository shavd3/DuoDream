import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaWhatsapp, 
  FaFacebook, 
  FaInstagram,
  FaPaperPlane,
  FaCalendarAlt,
  FaUser,
  FaHeart
} from 'react-icons/fa';
import axios from 'axios';

const ContactContainer = styled.div`
  margin-top: 80px;
`;

const HeroSection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--primary-red) 0%, var(--secondary-gold) 100%);
  color: white;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  
  h1 {
    font-size: 3rem;
    color: white;
    margin-bottom: 1.5rem;
    font-weight: 700;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
  }
`;

const ContactSection = styled.section`
  padding: 5rem 0;
  background: white;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled(motion.div)`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: var(--dark-gray);
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: var(--medium-gray);
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--light-gray);
  border-radius: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f1f5f9;
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
    font-size: 1.5rem;
    color: var(--primary-red);
    margin-right: 1rem;
    min-width: 24px;
  }
  
  .content {
    flex: 1;
    
    h4 {
      font-size: 1.1rem;
      color: var(--dark-gray);
      margin-bottom: 0.25rem;
      font-weight: 600;
    }
    
    p {
      color: var(--medium-gray);
      margin: 0;
      font-size: 1rem;
    }
    
    a {
      color: var(--medium-gray);
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: var(--primary-red);
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: var(--primary-red);
    color: white;
    border-radius: 50%;
    font-size: 1.25rem;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(220, 38, 38, 0.4);
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

const ContactForm = styled(motion.form)`
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 1.75rem;
    color: var(--dark-gray);
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  
  &.full-width {
    grid-column: 1 / -1;
  }
  
  label {
    font-weight: 500;
    color: var(--dark-gray);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .icon {
      color: var(--primary-red);
      font-size: 1rem;
    }
    
    .required {
      color: var(--primary-red);
      margin-left: 0.25rem;
    }
  }
  
  input, select, textarea {
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-family: var(--font-primary);
    transition: all 0.3s ease;
    background: white;
    
    &:focus {
      outline: none;
      border-color: var(--primary-red);
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }
    
    &::placeholder {
      color: var(--medium-gray);
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  .error {
    color: var(--primary-red);
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: var(--primary-red);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    background: #b91c1c;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(220, 38, 38, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  .loading {
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SuccessMessage = styled(motion.div)`
  background: #dcfce7;
  border: 1px solid #bbf7d0;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: #166534;
  text-align: center;
  
  .icon {
    margin-right: 0.5rem;
    color: #16a34a;
  }
`;

const ErrorMessage = styled(motion.div)`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: #dc2626;
  text-align: center;
`;

const MapSection = styled.section`
  padding: 0;
  background: var(--light-gray);
  
  .map-container {
    width: 100%;
    height: 400px;
    background: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--medium-gray);
    font-size: 1.1rem;
    
    .content {
      text-align: center;
      
      .icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.5;
      }
      
      p {
        margin: 0;
      }
    }
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const eventTypes = [
    { value: '', label: 'Select Event Type' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'baby-shower', label: 'Baby Shower' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const response = await axios.post('/api/contact', formData);
      
      if (response.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          message: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = {
    address: "100/1 Uyana Road, Uyana Moratuwa",
    phone: ["+94 706 204 205", "+94 771 755 673"],
    email: "duodreamevents@gmail.com",
    socialMedia: {
      whatsapp: "https://wa.me/94706204205",
      facebook: "https://facebook.com/duodreamevents",
      instagram: "https://instagram.com/duodreamevents"
    }
  };

  return (
    <ContactContainer>
      <HeroSection>
        <Container>
          <HeroContent
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Get In Touch</h1>
            <p>
              Ready to plan your dream event? Contact us today for a free consultation. 
              We're here to bring your vision to life!
            </p>
          </HeroContent>
        </Container>
      </HeroSection>

      <ContactSection>
        <Container>
          <ContactGrid>
            <ContactInfo
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Let's Create Something Beautiful Together</h2>
              <p>
                Whether you're planning an intimate gathering or a grand celebration, 
                we're here to help make your event extraordinary. Reach out to us 
                through any of the channels below.
              </p>

              <ContactItem>
                <FaMapMarkerAlt className="icon" />
                <div className="content">
                  <h4>Visit Our Studio</h4>
                  <p>{contactInfo.address}</p>
                </div>
              </ContactItem>

              <ContactItem>
                <FaPhone className="icon" />
                <div className="content">
                  <h4>Call Us</h4>
                  {contactInfo.phone.map((phone, index) => (
                    <p key={index}>
                      <a href={`tel:${phone}`}>{phone}</a>
                    </p>
                  ))}
                </div>
              </ContactItem>

              <ContactItem>
                <FaEnvelope className="icon" />
                <div className="content">
                  <h4>Email Us</h4>
                  <p>
                    <a href={`mailto:${contactInfo.email}`}>
                      {contactInfo.email}
                    </a>
                  </p>
                </div>
              </ContactItem>

              <SocialLinks>
                <a 
                  href={contactInfo.socialMedia.whatsapp}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whatsapp"
                  title="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
                <a 
                  href={contactInfo.socialMedia.facebook}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="facebook"
                  title="Facebook"
                >
                  <FaFacebook />
                </a>
                <a 
                  href={contactInfo.socialMedia.instagram}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="instagram"
                  title="Instagram"
                >
                  <FaInstagram />
                </a>
              </SocialLinks>
            </ContactInfo>

            <ContactForm
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
            >
              <h3>Send Us a Message</h3>
              
              {success && (
                <SuccessMessage
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FaHeart className="icon" />
                  Thank you! We'll get back to you within 24 hours.
                </SuccessMessage>
              )}
              
              {error && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </ErrorMessage>
              )}

              <FormGrid>
                <FormGroup>
                  <label>
                    <FaUser className="icon" />
                    Your Name
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.name && <div className="error">{errors.name}</div>}
                </FormGroup>

                <FormGroup>
                  <label>
                    <FaEnvelope className="icon" />
                    Email Address
                    <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                </FormGroup>

                <FormGroup>
                  <label>
                    <FaPhone className="icon" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+94 XXX XXX XXX"
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    <FaHeart className="icon" />
                    Event Type
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                  >
                    {eventTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup className="full-width">
                  <label>
                    <FaCalendarAlt className="icon" />
                    Event Date (if known)
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <label>
                  <FaPaperPlane className="icon" />
                  Tell Us About Your Event
                  <span className="required">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your event, budget, special requirements, or any questions you have..."
                  required
                />
                {errors.message && <div className="error">{errors.message}</div>}
              </FormGroup>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <div className="loading"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </SubmitButton>
            </ContactForm>
          </ContactGrid>
        </Container>
      </ContactSection>

      <MapSection>
        <div className="map-container">
          <div className="content">
            <FaMapMarkerAlt className="icon" />
            <p>Interactive map will be available soon</p>
            <p>100/1 Uyana Road, Uyana Moratuwa</p>
          </div>
        </div>
      </MapSection>
    </ContactContainer>
  );
};

export default Contact;
