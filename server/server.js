const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (images)
app.use('/images', express.static(path.join(__dirname, '../Images')));

// Sample data for gallery
const galleryImages = [
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

// API Routes
app.get('/api/gallery', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'all') {
    const filteredImages = galleryImages.filter(img => img.category === category);
    return res.json(filteredImages);
  }
  res.json(galleryImages);
});

app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      title: "Backdrop Design & Setup",
      description: "Custom backdrop designs for any occasion. From elegant wedding backdrops to vibrant party setups, we create stunning visual experiences.",
      icon: "🎨",
      features: [
        "Custom Design Concepts",
        "Professional Installation",
        "High-Quality Materials",
        "On-site Setup & Breakdown"
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
        "Budget Management"
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
        "Quick Turnaround"
      ],
      gallery: ["photo1.jpg", "photo2.jpg", "photo3.jpg"]
    }
  ];
  res.json(services);
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message, eventType, eventDate } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    // For now, just log the contact form data
    // In production, you would set up nodemailer with real SMTP credentials
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      message,
      eventType,
      eventDate
    });

    // Simulate email sending
    const emailData = {
      from: email,
      to: 'duodreamevents@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Event Type: ${eventType || 'Not specified'}
        Event Date: ${eventDate || 'Not specified'}
        
        Message:
        ${message}
      `
    };

    // Here you would actually send the email using nodemailer
    // For development, we'll just return success
    res.json({ 
      message: 'Thank you for your message! We will get back to you soon.',
      success: true 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// Company info endpoint
app.get('/api/company-info', (req, res) => {
  res.json({
    name: "DuoDream Events",
    tagline: "Making Your Dreams Come True",
    description: "Professional event planning and backdrop design services in Sri Lanka. We specialize in creating unforgettable experiences for weddings, birthdays, corporate events, and all special occasions.",
    contact: {
      address: "100/1 Uyana Road, Uyana Moratuwa",
      phone: ["+94 706 204 205", "+94 771 755 673"],
      email: "duodreamevents@gmail.com",
      socialMedia: {
        whatsapp: "https://wa.me/94706204205",
        facebook: "https://facebook.com/duodreamevents",
        instagram: "https://instagram.com/duodreamevents"
      }
    },
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
});

// Start server
app.listen(PORT, () => {
  console.log(`DuoDream Events server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
