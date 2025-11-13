import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaPalette, 
  FaCalendarAlt, 
  FaCamera, 
  FaCheck, 
  FaArrowRight, 
  FaHeart,
  FaBirthdayCake,
  FaBuilding,
  FaGraduationCap,
  FaBaby
} from 'react-icons/fa';
import axios from 'axios';

const ServicesContainer = styled.div`
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

const ServicesSection = styled.section`
  padding: 5rem 0;
  background: white;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 4rem;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceHeader = styled.div`
  background: linear-gradient(135deg, var(--primary-red), var(--secondary-gold));
  color: white;
  padding: 3rem 2rem;
  text-align: center;
  
  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 1rem;
    font-weight: 600;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ServiceBody = styled.div`
  padding: 3rem 2rem;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: var(--medium-gray);
    
    svg {
      color: var(--primary-red);
      margin-right: 1rem;
      font-size: 1.2rem;
    }
  }
`;

const ServiceDetails = styled.div`
  h3 {
    font-size: 1.5rem;
    color: var(--dark-gray);
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--medium-gray);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const GalleryPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  
  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 0.5rem;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PricingSection = styled.section`
  padding: 5rem 0;
  background: var(--light-gray);
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const PricingCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  
  &.featured {
    border: 3px solid var(--primary-red);
    transform: scale(1.05);
    
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary-red);
      color: white;
      padding: 0.5rem 2rem;
      border-radius: 2rem;
      font-size: 0.9rem;
      font-weight: 600;
    }
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }
  
  .package-icon {
    font-size: 3rem;
    color: var(--primary-red);
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: var(--dark-gray);
  }
  
  .price {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-red);
    margin-bottom: 0.5rem;
    
    .currency {
      font-size: 1.5rem;
    }
  }
  
  .period {
    color: var(--medium-gray);
    margin-bottom: 2rem;
  }
  
  ul {
    text-align: left;
    margin-bottom: 2rem;
  }
  
  .cta-button {
    width: 100%;
    padding: 1rem 2rem;
    background: var(--primary-red);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
    text-decoration: none;
    display: inline-block;
    
    &:hover {
      background: #b91c1c;
    }
  }
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

const EventTypesSection = styled.section`
  padding: 5rem 0;
  background: white;
`;

const EventTypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const EventTypeCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: var(--dark-gray);
  }
  
  p {
    color: var(--medium-gray);
    line-height: 1.6;
  }
`;

const Services = () => {
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
            description: "Custom backdrop designs for any occasion. From elegant wedding backdrops to vibrant party setups, we create stunning visual experiences.",
            icon: "🎨",
            features: [
              "Custom Design Concepts",
              "Professional Installation",
              "High-Quality Materials",
              "On-site Setup & Breakdown",
              "Multiple Design Options",
              "Weather-Resistant Materials",
              "Lighting Integration",
              "Props & Accessories"
            ],
            gallery: ["backdrop1.jpg", "backdrop2.jpg", "backdrop3.jpg"]
          },
          {
            id: 2,
            title: "Event Planning",
            description: "Complete event planning services from concept to execution. We handle every detail to make your special day unforgettable.",
            icon: "📋",
            features: [
              "Full Event Coordination",
              "Vendor Management",
              "Timeline Planning",
              "Budget Management",
              "Venue Selection",
              "Menu Planning",
              "Entertainment Coordination",
              "Day-of Coordination"
            ],
            gallery: ["planning1.jpg", "planning2.jpg", "planning3.jpg"]
          },
          {
            id: 3,
            title: "Photography",
            description: "Professional event photography to capture every precious moment. High-quality images that tell your event's story.",
            icon: "📸",
            features: [
              "Event Photography",
              "Portrait Sessions",
              "High-Resolution Images",
              "Quick Turnaround",
              "Digital Gallery",
              "Print Options",
              "Drone Photography",
              "Video Services"
            ],
            gallery: ["photo1.jpg", "photo2.jpg", "photo3.jpg"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const iconMap = {
    "🎨": <FaPalette />,
    "📋": <FaCalendarAlt />,
    "📸": <FaCamera />
  };

  const pricingPackages = [
    {
      name: "Basic Package",
      price: "50,000",
      period: "Starting from",
      icon: <FaBirthdayCake />,
      features: [
        "Basic backdrop design",
        "2-hour setup",
        "Standard materials",
        "Basic photography (50 photos)",
        "Digital gallery"
      ]
    },
    {
      name: "Premium Package",
      price: "125,000",
      period: "Starting from",
      icon: <FaHeart />,
      featured: true,
      features: [
        "Custom backdrop design",
        "Full day coordination",
        "Premium materials & props",
        "Professional photography (150+ photos)",
        "Video highlights",
        "Drone shots",
        "Quick same-day preview"
      ]
    },
    {
      name: "Ultimate Package",
      price: "250,000",
      period: "Starting from",
      icon: <FaGraduationCap />,
      features: [
        "Multiple custom backdrops",
        "Complete event planning",
        "Luxury materials & setups",
        "Full photography & videography",
        "Live streaming",
        "Professional editing",
        "Photo albums & prints",
        "1-year digital storage"
      ]
    }
  ];

  const eventTypes = [
    {
      icon: <FaHeart />,
      title: "Weddings",
      description: "Romantic and elegant setups for your special day"
    },
    {
      icon: <FaBirthdayCake />,
      title: "Birthday Parties",
      description: "Fun and colorful celebrations for all ages"
    },
    {
      icon: <FaBuilding />,
      title: "Corporate Events",
      description: "Professional setups for business occasions"
    },
    {
      icon: <FaGraduationCap />,
      title: "Graduations",
      description: "Milestone celebrations for academic achievements"
    },
    {
      icon: <FaBaby />,
      title: "Baby Showers",
      description: "Sweet and gentle decorations for new arrivals"
    },
    {
      icon: <FaCalendarAlt />,
      title: "Anniversaries",
      description: "Memorable setups for celebrating love and milestones"
    }
  ];

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

  if (loading) {
    return (
      <ServicesContainer>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </ServicesContainer>
    );
  }

  return (
    <ServicesContainer>
      <HeroSection>
        <Container>
          <HeroContent
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Our Services</h1>
            <p>
              From stunning backdrop designs to complete event planning and professional 
              photography, we offer comprehensive services to make your celebration perfect.
            </p>
          </HeroContent>
        </Container>
      </HeroSection>

      <ServicesSection>
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <ServiceCard key={service.id} variants={itemVariants}>
                <ServiceHeader>
                  <div className="icon">
                    {iconMap[service.icon] || service.icon}
                  </div>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </ServiceHeader>
                
                <ServiceBody>
                  <ServiceGrid>
                    <div>
                      <ServiceDetails>
                        <h3>What's Included</h3>
                        <FeaturesList>
                          {service.features.map((feature, idx) => (
                            <li key={idx}>
                              <FaCheck />
                              {feature}
                            </li>
                          ))}
                        </FeaturesList>
                      </ServiceDetails>
                    </div>
                    
                    <div>
                      <ServiceDetails>
                        <h3>Our Approach</h3>
                        <p>
                          We work closely with you to understand your vision and preferences, 
                          ensuring every detail aligns with your expectations. Our experienced 
                          team handles everything from initial concept to final execution.
                        </p>
                        <p>
                          Using high-quality materials and professional techniques, we create 
                          stunning results that exceed your expectations while staying within 
                          your budget.
                        </p>
                      </ServiceDetails>
                    </div>
                  </ServiceGrid>
                </ServiceBody>
              </ServiceCard>
            ))}
          </motion.div>
        </Container>
      </ServicesSection>

      <EventTypesSection>
        <Container>
          <SectionHeader
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Events We Specialize In</h2>
            <p>
              We bring our expertise to a wide variety of celebrations and special occasions.
            </p>
          </SectionHeader>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <EventTypesGrid>
              {eventTypes.map((eventType, index) => (
                <EventTypeCard key={index} variants={itemVariants}>
                  <div className="icon">{eventType.icon}</div>
                  <h3>{eventType.title}</h3>
                  <p>{eventType.description}</p>
                </EventTypeCard>
              ))}
            </EventTypesGrid>
          </motion.div>
        </Container>
      </EventTypesSection>

      <PricingSection>
        <Container>
          <SectionHeader
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Service Packages</h2>
            <p>
              Choose the package that best fits your needs and budget. All packages 
              can be customized to your specific requirements.
            </p>
          </SectionHeader>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <PricingGrid>
              {pricingPackages.map((pkg, index) => (
                <PricingCard 
                  key={index} 
                  variants={itemVariants}
                  className={pkg.featured ? 'featured' : ''}
                >
                  <div className="package-icon">{pkg.icon}</div>
                  <h3>{pkg.name}</h3>
                  <div className="price">
                    <span className="currency">Rs. </span>{pkg.price}
                  </div>
                  <div className="period">{pkg.period}</div>
                  <FeaturesList>
                    {pkg.features.map((feature, idx) => (
                      <li key={idx}>
                        <FaCheck />
                        {feature}
                      </li>
                    ))}
                  </FeaturesList>
                  <Link to="/contact" className="cta-button">
                    Get Quote <FaArrowRight style={{ marginLeft: '0.5rem' }} />
                  </Link>
                </PricingCard>
              ))}
            </PricingGrid>
          </motion.div>
        </Container>
      </PricingSection>
    </ServicesContainer>
  );
};

export default Services;
