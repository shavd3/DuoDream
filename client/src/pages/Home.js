import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPalette, FaCalendarAlt, FaCamera, FaStar } from 'react-icons/fa';
import axios from 'axios';

const HomeContainer = styled.div`
  margin-top: 80px; /* Account for fixed navbar */
`;

const HeroSection = styled.section`
  height: 90vh;
  background: linear-gradient(
    135deg,
    rgba(220, 38, 38, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(217, 119, 6, 0.9) 100%
  ),
  url('/images/hero-bg.jpg') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  padding: 0 2rem;
  z-index: 2;
  
  h1 {
    font-size: 3.5rem;
    color: white;
    margin-bottom: 1.5rem;
    font-weight: 700;
    line-height: 1.1;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
  
  .tagline {
    font-size: 1.5rem;
    color: #f1c40f;
    margin-bottom: 1rem;
    font-weight: 500;
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
  
  p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
    line-height: 1.6;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HeroButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  
  &.primary {
    background: var(--primary-red);
    color: white;
    
    &:hover {
      background: #b91c1c;
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4);
    }
  }
  
  &.secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
    
    &:hover {
      background: white;
      color: var(--primary-red);
      transform: translateY(-3px);
    }
  }
`;

const ServicesPreview = styled.section`
  padding: 5rem 0;
  background: var(--light-gray);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--dark-gray);
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    color: var(--medium-gray);
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    font-size: 3rem;
    color: var(--primary-red);
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--dark-gray);
  }
  
  p {
    color: var(--medium-gray);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .features {
    list-style: none;
    padding: 0;
    margin-bottom: 1.5rem;
    
    li {
      color: var(--medium-gray);
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      
      &::before {
        content: '✓';
        color: var(--primary-red);
        font-weight: bold;
      }
    }
  }
`;

const StatsSection = styled.section`
  padding: 4rem 0;
  background: var(--primary-red);
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled(motion.div)`
  h3 {
    font-size: 3rem;
    color: white;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
  
  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  }
`;

const CTASection = styled.section`
  padding: 5rem 0;
  background: var(--dark-gray);
  color: white;
  text-align: center;
`;

const CTAContent = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
  
  h2 {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
  }
`;

const TestimonialSection = styled.section`
  padding: 5rem 0;
  background: white;
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  
  .stars {
    color: #fbbf24;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-style: italic;
    color: var(--medium-gray);
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
  
  .author {
    color: var(--dark-gray);
    font-weight: 600;
  }
`;

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback data
        setServices([
          {
            id: 1,
            title: "Backdrop Design & Setup",
            description: "Custom backdrop designs for any occasion. From elegant wedding backdrops to vibrant party setups.",
            icon: "🎨",
            features: ["Custom Design Concepts", "Professional Installation", "High-Quality Materials", "On-site Setup & Breakdown"]
          },
          {
            id: 2,
            title: "Event Planning",
            description: "Complete event planning services from concept to execution. We handle every detail to make your day unforgettable.",
            icon: "📋",
            features: ["Full Event Coordination", "Vendor Management", "Timeline Planning", "Budget Management"]
          },
          {
            id: 3,
            title: "Photography",
            description: "Professional event photography to capture every precious moment. High-quality images that tell your story.",
            icon: "📸",
            features: ["Event Photography", "Portrait Sessions", "High-Resolution Images", "Quick Turnaround"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const iconMap = {
    "🎨": <FaPalette />,
    "📋": <FaCalendarAlt />,
    "📸": <FaCamera />
  };

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Making Your Dreams Come True
          </motion.div>
          <h1>DuoDream Events</h1>
          <p>
            Professional event planning, stunning backdrop designs, and capturing 
            life's precious moments through expert photography services in Sri Lanka.
          </p>
          <HeroButtons>
            <HeroButton to="/services" className="primary">
              Our Services <FaArrowRight />
            </HeroButton>
            <HeroButton to="/contact" className="secondary">
              Get Quote
            </HeroButton>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <ServicesPreview>
        <Container>
          <SectionHeader
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>What We Do Best</h2>
            <p>
              We specialize in creating unforgettable experiences through our comprehensive 
              event services, bringing your vision to life with creativity and professionalism.
            </p>
          </SectionHeader>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ServicesGrid>
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="icon">
                      {iconMap[service.icon] || service.icon}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul className="features">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </ServiceCard>
                ))}
              </ServicesGrid>
            </motion.div>
          )}

          <div style={{ textAlign: 'center' }}>
            <HeroButton to="/services" className="primary">
              View All Services <FaArrowRight />
            </HeroButton>
          </div>
        </Container>
      </ServicesPreview>

      <StatsSection>
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <StatsGrid>
              <StatItem variants={itemVariants}>
                <h3>500+</h3>
                <p>Events Completed</p>
              </StatItem>
              <StatItem variants={itemVariants}>
                <h3>300+</h3>
                <p>Happy Clients</p>
              </StatItem>
              <StatItem variants={itemVariants}>
                <h3>5+</h3>
                <p>Years Experience</p>
              </StatItem>
              <StatItem variants={itemVariants}>
                <h3>50+</h3>
                <p>Custom Backdrops</p>
              </StatItem>
            </StatsGrid>
          </motion.div>
        </Container>
      </StatsSection>

      <TestimonialSection>
        <Container>
          <SectionHeader
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>What Our Clients Say</h2>
          </SectionHeader>

          <TestimonialCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>
              "DuoDream Events made our wedding absolutely magical! The backdrop design was 
              stunning and the team was incredibly professional. They captured every moment 
              perfectly. Highly recommended!"
            </p>
            <div className="author">- Priya & Kasun, Wedding 2023</div>
          </TestimonialCard>
        </Container>
      </TestimonialSection>

      <CTASection>
        <Container>
          <CTAContent
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Plan Your Dream Event?</h2>
            <p>
              Let's bring your vision to life. Contact us today for a free consultation 
              and personalized quote for your special occasion.
            </p>
            <HeroButtons>
              <HeroButton to="/contact" className="primary">
                Get Free Quote <FaArrowRight />
              </HeroButton>
              <HeroButton to="/gallery" className="secondary">
                View Our Work
              </HeroButton>
            </HeroButtons>
          </CTAContent>
        </Container>
      </CTASection>
    </HomeContainer>
  );
};

export default Home;
