# DuoDream Events Website

A beautiful, modern website for DuoDream Events - a professional event planning company specializing in backdrop design, event coordination, and photography services in Sri Lanka.

![DuoDream Events Logo](./Images/dd1.jpg)

## 🌟 Features

- **Modern Responsive Design** - Beautiful UI that works on all devices
- **Professional Portfolio** - Showcase of event planning and backdrop design work
- **Service Showcase** - Detailed information about backdrop design, event planning, and photography
- **Interactive Gallery** - Filterable image gallery with modal views
- **Contact System** - Professional contact form with validation
- **Fast Performance** - Optimized React frontend with smooth animations
- **SEO Optimized** - Proper meta tags and structured data

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - Modern JavaScript library
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client for API calls
- **React Icons** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Nodemailer** - Email functionality
- **Body Parser** - Request parsing middleware

## 📁 Project Structure

```
DuoDream/
├── client/                 # React frontend
│   ├── public/            # Static files
│   │   ├── images/        # Logo and brand images
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── ScrollToTop.js
│   │   ├── pages/         # Page components
│   │   │   ├── Home.js
│   │   │   ├── About.js
│   │   │   ├── Services.js
│   │   │   ├── Gallery.js
│   │   │   └── Contact.js
│   │   ├── styles/
│   │   │   └── global.css # Global styles
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── server.js          # Express server
│   └── package.json
├── Images/                # Original brand assets
└── package.json           # Root package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd DuoDream
   
   # Or extract the provided files to a directory
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies (for running both frontend and backend)
   npm install
   
   # Install server dependencies
   npm run install-server
   
   # Install client dependencies  
   npm run install-client
   ```

3. **Start the development servers**
   ```bash
   # Start both frontend and backend concurrently
   npm run dev
   ```

   This will start:
   - **Backend server** on http://localhost:5000
   - **Frontend server** on http://localhost:3000

4. **Open your browser**
   Navigate to http://localhost:3000 to view the website

### Alternative: Start servers separately

If you prefer to run servers separately:

```bash
# Terminal 1 - Start backend
npm run server

# Terminal 2 - Start frontend  
npm run client
```

## 🎨 Customization

### Brand Colors
The website uses DuoDream's brand colors defined in `client/src/styles/global.css`:

```css
:root {
  --primary-red: #dc2626;     /* Main brand red */
  --primary-black: #000000;   /* Brand black */
  --secondary-gold: #d97706;  /* Accent gold */
  --white: #ffffff;
  --light-gray: #f8fafc;
  --medium-gray: #64748b;
  --dark-gray: #1e293b;
}
```

### Content Updates
- **Company Information**: Update in `server/server.js` in the `/api/company-info` endpoint
- **Services**: Modify the services data in `server/server.js`
- **Gallery Images**: Add images to `client/public/images/gallery/` and update the gallery data
- **Contact Information**: Update contact details in the footer and contact page

### Adding New Images
1. Add images to `client/public/images/`
2. Reference them in components using `/images/filename.jpg`
3. For gallery images, update the gallery data in the backend API

## 📧 Contact Form Setup

The contact form is ready to work but requires email configuration:

1. **For Development**: Currently logs form submissions to console
2. **For Production**: 
   - Update the nodemailer configuration in `server/server.js`
   - Add your SMTP credentials
   - Set up environment variables for email settings

Example production setup:
```javascript
// In server/server.js, update the contact endpoint
const transporter = nodemailer.createTransporter({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## 🌐 Deployment

### Frontend Deployment
1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

### Backend Deployment
1. Deploy the `server` folder to a Node.js hosting service (Heroku, Railway, etc.)
2. Update the frontend API calls to point to your production backend URL

### Full-Stack Deployment
- Use services like Heroku, Railway, or DigitalOcean for complete deployment
- Set up environment variables for production settings

## 📱 Features Overview

### Home Page
- Hero section with call-to-action buttons
- Services preview with animated cards
- Statistics section
- Customer testimonials
- Call-to-action section

### About Page  
- Company story and mission
- Team member profiles
- Core values presentation
- Process overview

### Services Page
- Detailed service descriptions
- Pricing packages
- Event type specializations
- Feature comparisons

### Gallery Page
- Filterable image gallery
- Modal image viewer
- Category-based filtering
- Responsive grid layout

### Contact Page
- Contact form with validation
- Company contact information
- Social media links
- Map placeholder

## 🎯 Business Information

**DuoDream Events** specializes in:
- **Backdrop Design & Setup** - Custom designs for any occasion
- **Event Planning** - Complete coordination from concept to execution  
- **Photography** - Professional event photography services

**Contact Information:**
- Address: 100/1 Uyana Road, Uyana Moratuwa
- Phone: +94 706 204 205 | +94 771 755 673
- Email: duodreamevents@gmail.com

## 🤝 Support

For technical support or customization requests:
1. Check the project structure and comments in the code
2. Review this README for common tasks
3. All components are well-documented with clear structure

## 📄 License

This project is created for DuoDream Events. All rights reserved.

---

**Built with ❤️ for creating beautiful memories**
