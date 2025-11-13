import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHeart, FaUsers, FaAward, FaLightbulb, FaHandshake, FaGem } from 'react-icons/fa';
import axios from 'axios';

const AboutContainer = styled.div`
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

const StorySection = styled.section`
  padding: 5rem 0;
  background: white;
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StoryContent = styled(motion.div)`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: var(--dark-gray);
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: var(--medium-gray);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
  
  .highlight {
    color: var(--primary-red);
    font-weight: 600;
  }
`;

const StoryImage = styled(motion.div)`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(220, 38, 38, 0.1), rgba(217, 119, 6, 0.1));
  }
`;

const ValuesSection = styled.section`
  padding: 5rem 0;
  background: var(--light-gray);
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

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ValueCard = styled(motion.div)`
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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
  }
`;

const TeamSection = styled.section`
  padding: 5rem 0;
  background: white;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TeamCard = styled(motion.div)`
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }
  
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-red), var(--secondary-gold));
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: white;
    font-weight: bold;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--dark-gray);
  }
  
  .role {
    color: var(--primary-red);
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  p {
    color: var(--medium-gray);
    line-height: 1.6;
  }
`;

const ProcessSection = styled.section`
  padding: 5rem 0;
  background: var(--dark-gray);
  color: white;
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ProcessStep = styled(motion.div)`
  text-align: center;
  padding: 2rem 1rem;
  
  .step-number {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--primary-red);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 auto 1.5rem;
  }
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: white;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`;

const About = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get('/api/company-info');
        setCompanyInfo(response.data);
      } catch (error) {
        console.error('Error fetching company info:', error);
        // Fallback data
        setCompanyInfo({
          name: "DuoDream Events",
          tagline: "Making Your Dreams Come True",
          description: "Professional event planning and backdrop design services in Sri Lanka.",
          team: [
            {
              name: "Sarah Fernando",
              role: "Creative Director",
              bio: "With over 8 years of experience in event design, Sarah brings creativity and attention to detail to every project."
            },
            {
              name: "Michael Silva",
              role: "Event Coordinator",
              bio: "Michael ensures seamless execution of every event, managing logistics and vendor relationships with precision."
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
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

  const values = [
    {
      icon: <FaHeart />,
      title: "Passion",
      description: "We pour our heart into every event, treating each celebration as if it were our own special day."
    },
    {
      icon: <FaUsers />,
      title: "Collaboration",
      description: "Working closely with our clients to understand their vision and bring it to life perfectly."
    },
    {
      icon: <FaAward />,
      title: "Excellence",
      description: "Committed to delivering the highest quality service and exceeding expectations every time."
    },
    {
      icon: <FaLightbulb />,
      title: "Creativity",
      description: "Innovative designs and unique solutions that make your event truly one-of-a-kind."
    },
    {
      icon: <FaHandshake />,
      title: "Trust",
      description: "Building long-lasting relationships through reliability, transparency, and professional integrity."
    },
    {
      icon: <FaGem />,
      title: "Quality",
      description: "Using only the finest materials and techniques to ensure every detail meets our high standards."
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Consultation",
      description: "We listen to your vision, understand your needs, and discuss your budget and timeline."
    },
    {
      number: "02",
      title: "Planning",
      description: "Our team creates detailed plans, designs, and timelines tailored to your specific event."
    },
    {
      number: "03",
      title: "Preparation",
      description: "We coordinate with vendors, prepare materials, and handle all logistics before your event."
    },
    {
      number: "04",
      title: "Execution",
      description: "On the big day, we bring everything together to create the perfect celebration you envisioned."
    }
  ];

  if (loading) {
    return (
      <AboutContainer>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </AboutContainer>
    );
  }

  return (
    <AboutContainer>
      <HeroSection>
        <Container>
          <HeroContent
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>About DuoDream Events</h1>
            <p>
              {companyInfo?.description || "We are passionate event planners dedicated to creating unforgettable experiences through innovative design, meticulous planning, and exceptional service."}
            </p>
          </HeroContent>
        </Container>
      </HeroSection>

      <StorySection>
        <Container>
          <StoryGrid>
            <StoryContent
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Our Story</h2>
              <p>
                <span className="highlight">DuoDream Events</span> was born from a simple belief: 
                every celebration deserves to be extraordinary. Founded by a team of creative 
                professionals with a passion for bringing dreams to life, we started our journey 
                with a mission to transform ordinary events into magical experiences.
              </p>
              <p>
                What began as a small venture has grown into one of Sri Lanka's most trusted 
                event planning companies. We've had the privilege of being part of countless 
                love stories, milestone celebrations, and corporate successes, each one unique 
                and special in its own way.
              </p>
              <p>
                Our expertise spans from intimate gatherings to grand celebrations, always 
                maintaining our commitment to quality, creativity, and personalized service. 
                We believe that behind every great event is a team that truly cares.
              </p>
            </StoryContent>
            <StoryImage
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img src="/images/about-story.jpg" alt="DuoDream Events Story" />
            </StoryImage>
          </StoryGrid>
        </Container>
      </StorySection>

      <ValuesSection>
        <Container>
          <SectionHeader
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Our Values</h2>
            <p>
              The principles that guide everything we do and the foundation of our 
              commitment to creating exceptional events.
            </p>
          </SectionHeader>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ValuesGrid>
              {values.map((value, index) => (
                <ValueCard key={index} variants={itemVariants}>
                  <div className="icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </ValueCard>
              ))}
            </ValuesGrid>
          </motion.div>
        </Container>
      </ValuesSection>

      <TeamSection>
        <Container>
          <SectionHeader
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Meet Our Team</h2>
            <p>
              The creative minds and passionate professionals behind every successful 
              DuoDream event.
            </p>
          </SectionHeader>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <TeamGrid>
              {companyInfo?.team?.map((member, index) => (
                <TeamCard key={index} variants={itemVariants}>
                  <div className="avatar">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3>{member.name}</h3>
                  <div className="role">{member.role}</div>
                  <p>{member.bio}</p>
                </TeamCard>
              ))}
            </TeamGrid>
          </motion.div>
        </Container>
      </TeamSection>

      <ProcessSection>
        <Container>
          <SectionHeader
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 style={{ color: 'white' }}>Our Process</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              From initial consultation to final execution, here's how we bring your 
              dream event to life.
            </p>
          </SectionHeader>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ProcessGrid>
              {processSteps.map((step, index) => (
                <ProcessStep key={index} variants={itemVariants}>
                  <div className="step-number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </ProcessStep>
              ))}
            </ProcessGrid>
          </motion.div>
        </Container>
      </ProcessSection>
    </AboutContainer>
  );
};

export default About;
