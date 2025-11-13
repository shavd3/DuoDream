import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaFilter } from 'react-icons/fa';
import axios from 'axios';

const GalleryContainer = styled.div`
  margin-top: 80px;
`;

const HeroSection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--primary-red) 0%, var(--secondary-gold) 100%);
  color: white;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1400px;
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

const FilterSection = styled.section`
  padding: 3rem 0 2rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
`;

const FilterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  h2 {
    font-size: 1.5rem;
    color: var(--dark-gray);
    margin: 0;
  }
  
  .icon {
    color: var(--primary-red);
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.active ? 'var(--primary-red)' : '#e2e8f0'};
  background: ${props => props.active ? 'var(--primary-red)' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--medium-gray)'};
  border-radius: 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    border-color: var(--primary-red);
    color: ${props => props.active ? 'white' : 'var(--primary-red)'};
  }
  
  .count {
    margin-left: 0.5rem;
    opacity: 0.7;
  }
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 3rem 0;
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  height: 250px;
  background: #f1f5f9;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
  
  &:hover .overlay {
    opacity: 1;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(220, 38, 38, 0.8),
    rgba(217, 119, 6, 0.8)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  text-align: center;
  padding: 2rem;
  
  h3 {
    font-size: 1.25rem;
    color: white;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  }
  
  .category {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    backdrop-filter: blur(10px);
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--medium-gray);
  font-size: 1rem;
  text-align: center;
  padding: 2rem;
  
  .content {
    text-align: center;
    
    .icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      opacity: 0.5;
    }
    
    p {
      margin: 0;
      opacity: 0.7;
    }
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
`;

const ModalInfo = styled.div`
  padding: 2rem;
  text-align: center;
  
  h3 {
    font-size: 1.5rem;
    color: var(--dark-gray);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--medium-gray);
    margin-bottom: 1rem;
  }
  
  .category-tag {
    display: inline-block;
    background: var(--primary-red);
    color: white;
    padding: 0.25rem 1rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'prev' ? 'left: 1rem;' : 'right: 1rem;'}
  width: 50px;
  height: 50px;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--medium-gray);
  
  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.3;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--dark-gray);
  }
  
  p {
    font-size: 1.1rem;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const categories = [
    { id: 'all', name: 'All Events', count: 0 },
    { id: 'wedding', name: 'Weddings', count: 0 },
    { id: 'birthday', name: 'Birthdays', count: 0 },
    { id: 'corporate', name: 'Corporate', count: 0 },
    { id: 'anniversary', name: 'Anniversaries', count: 0 },
    { id: 'graduation', name: 'Graduations', count: 0 },
    { id: 'baby-shower', name: 'Baby Showers', count: 0 }
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('/api/gallery');
        setImages(response.data);
        setFilteredImages(response.data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        // Fallback sample data
        const sampleImages = [
          {
            id: 1,
            title: "Elegant Wedding Backdrop",
            category: "wedding",
            image: "/images/gallery/wedding1.jpg",
            description: "Beautiful floral backdrop design for intimate wedding ceremony"
          },
          {
            id: 2,
            title: "Birthday Party Setup",
            category: "birthday", 
            image: "/images/gallery/birthday1.jpg",
            description: "Colorful and vibrant birthday party backdrop with custom decorations"
          },
          {
            id: 3,
            title: "Corporate Event Stage",
            category: "corporate",
            image: "/images/gallery/corporate1.jpg",
            description: "Professional corporate event staging with modern lighting"
          },
          {
            id: 4,
            title: "Anniversary Celebration",
            category: "anniversary",
            image: "/images/gallery/anniversary1.jpg",
            description: "Romantic anniversary setup with golden accents"
          },
          {
            id: 5,
            title: "Graduation Party",
            category: "graduation",
            image: "/images/gallery/graduation1.jpg",
            description: "Celebratory graduation party backdrop with custom signage"
          },
          {
            id: 6,
            title: "Baby Shower Decor",
            category: "baby-shower",
            image: "/images/gallery/babyshower1.jpg",
            description: "Soft pastel baby shower backdrop with balloon arrangements"
          }
        ];
        setImages(sampleImages);
        setFilteredImages(sampleImages);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory, images]);

  const getCategoryCounts = () => {
    const counts = categories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? images.length : images.filter(img => img.category === cat.id).length
    }));
    return counts;
  };

  const openModal = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedIndex(-1);
  };

  const navigateImage = (direction) => {
    const currentImages = filteredImages;
    let newIndex = selectedIndex + direction;
    
    if (newIndex < 0) newIndex = currentImages.length - 1;
    if (newIndex >= currentImages.length) newIndex = 0;
    
    setSelectedIndex(newIndex);
    setSelectedImage(currentImages[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateImage(-1);
    if (e.key === 'ArrowRight') navigateImage(1);
  };

  useEffect(() => {
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage, selectedIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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
      <GalleryContainer>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      <HeroSection>
        <Container>
          <HeroContent
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Our Gallery</h1>
            <p>
              Explore our portfolio of stunning events, creative backdrops, and memorable 
              celebrations. Each image tells a story of dreams brought to life.
            </p>
          </HeroContent>
        </Container>
      </HeroSection>

      <FilterSection>
        <FilterContainer>
          <FilterHeader>
            <FilterTitle>
              <FaFilter className="icon" />
              <h2>Filter by Event Type</h2>
            </FilterTitle>
            <FilterButtons>
              {getCategoryCounts().map(category => (
                <FilterButton
                  key={category.id}
                  active={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                  <span className="count">({category.count})</span>
                </FilterButton>
              ))}
            </FilterButtons>
          </FilterHeader>
        </FilterContainer>
      </FilterSection>

      <Container>
        {filteredImages.length === 0 ? (
          <EmptyState>
            <div className="icon">📸</div>
            <h3>No Images Found</h3>
            <p>
              We're constantly updating our gallery with new events. 
              Check back soon for more beautiful celebrations!
            </p>
          </EmptyState>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory}
          >
            <GalleryGrid>
              {filteredImages.map((image, index) => (
                <GalleryItem
                  key={image.id}
                  variants={itemVariants}
                  onClick={() => openModal(image, index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {image.image ? (
                    <img 
                      src={image.image} 
                      alt={image.title}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <PlaceholderImage style={{ display: image.image ? 'none' : 'flex' }}>
                    <div className="content">
                      <div className="icon">📸</div>
                      <p>{image.title}</p>
                    </div>
                  </PlaceholderImage>
                  <ImageOverlay className="overlay">
                    <div className="category">
                      {categories.find(cat => cat.id === image.category)?.name || image.category}
                    </div>
                    <h3>{image.title}</h3>
                    <p>{image.description}</p>
                  </ImageOverlay>
                </GalleryItem>
              ))}
            </GalleryGrid>
          </motion.div>
        )}
      </Container>

      <AnimatePresence>
        {selectedImage && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>
                <FaTimes />
              </CloseButton>
              
              {filteredImages.length > 1 && (
                <>
                  <NavigationButton
                    direction="prev"
                    onClick={() => navigateImage(-1)}
                    disabled={filteredImages.length <= 1}
                  >
                    <FaChevronLeft />
                  </NavigationButton>
                  
                  <NavigationButton
                    direction="next"
                    onClick={() => navigateImage(1)}
                    disabled={filteredImages.length <= 1}
                  >
                    <FaChevronRight />
                  </NavigationButton>
                </>
              )}
              
              {selectedImage.image ? (
                <ModalImage 
                  src={selectedImage.image} 
                  alt={selectedImage.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div style={{ width: '400px', height: '300px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PlaceholderImage>
                    <div className="content">
                      <div className="icon">📸</div>
                      <p>Image not available</p>
                    </div>
                  </PlaceholderImage>
                </div>
              )}
              
              <ModalInfo>
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
                <div className="category-tag">
                  {categories.find(cat => cat.id === selectedImage.category)?.name || selectedImage.category}
                </div>
              </ModalInfo>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
};

export default Gallery;
