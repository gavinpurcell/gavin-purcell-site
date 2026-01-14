# Gavin Purcell - Personal Brand Website

A modern, dynamic personal brand website showcasing AI media expertise, the AI For Humans podcast/newsletter, and consulting services.

## Design Aesthetic

**Neo-Brutalist Editorial** - This site features:
- Bold, distinctive typography (DM Serif Display + Outfit)
- Warm color palette (burnt orange, amber, cream) avoiding typical AI clichés
- Hard shadows and structured borders for visual impact
- Smooth animations using Framer Motion
- Fully responsive mobile-first design

## Features

### 🎨 Interactive AI Style Transfer
- Upload photo functionality
- Multiple artistic style options (Picasso, Van Gogh, Warhol, Monet)
- Ready for NanoBanana Pro API integration
- Located in the hero section for maximum engagement

### 🎙️ AI For Humans Showcase
- Dedicated section for podcast and newsletter
- Email subscription form
- Platform links and social proof
- Testimonials section

### 💼 Consulting Services
- Four distinct service offerings
- Clear value propositions
- Call-to-action sections
- Professional credibility markers

### 📱 Fully Responsive
- Mobile-first design approach
- Optimized for all screen sizes
- Touch-friendly interactions

## Getting Started

### Development
```bash
npm install        # Install dependencies
npm run dev        # Start development server at http://localhost:5173
```

### Production Build
```bash
npm run build      # Build for production
npm run preview    # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx/css     # Fixed navigation header
│   ├── Hero.jsx/css           # Hero section with AI style transfer
│   ├── About.jsx/css          # About/credentials section
│   ├── AIForHumans.jsx/css    # Podcast/newsletter showcase
│   ├── Consulting.jsx/css     # Services and consulting info
│   └── Footer.jsx/css         # Footer with contact info
├── App.jsx                    # Main app component
├── App.css                    # App-level styles
├── index.css                  # Global styles & design system
└── main.jsx                   # App entry point
```

## Customization Guide

### Adding NanoBanana Pro API Integration

In `src/components/Hero.jsx`, update the `handleStyleTransfer` function:

```javascript
const handleStyleTransfer = async () => {
  if (!selectedImage) return;

  setIsProcessing(true);

  try {
    const response = await fetch('YOUR_NANOBANANA_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: selectedImage,
        style: selectedStyle
      })
    });

    const data = await response.json();
    setProcessedImage(data.processedImage);
  } catch (error) {
    console.error('Style transfer failed:', error);
  } finally {
    setIsProcessing(false);
  }
};
```

### Updating Content

#### Personal Information
Edit in respective component files:
- **About section**: `src/components/About.jsx`
- **Services**: `src/components/Consulting.jsx`
- **Footer links**: `src/components/Footer.jsx`

#### Colors & Branding
Edit CSS variables in `src/index.css`:
```css
:root {
  --color-primary: #E65C2A;      /* Main brand color */
  --color-accent: #F4A261;       /* Secondary accent */
  --color-bg: #FAF7F3;           /* Background color */
  /* ... more variables ... */
}
```

#### Typography
Update fonts in `index.html` and CSS variables in `src/index.css`.

### Newsletter Integration

In `src/components/AIForHumans.jsx`, connect the subscribe form to your email service provider (e.g., Mailchimp, ConvertKit, Substack).

### Analytics

Add your analytics tracking code to `index.html` before the closing `</body>` tag:
```html
<!-- Google Analytics, Plausible, etc. -->
```

## Deployment

### Recommended Hosting
- **Vercel**: `vercel deploy` (easiest)
- **Netlify**: Drag & drop the `dist` folder
- **GitHub Pages**: Use `gh-pages` package

### Environment Variables
Create a `.env` file for API keys:
```
VITE_NANOBANANA_API_KEY=your_key_here
VITE_EMAIL_SERVICE_KEY=your_key_here
```

Access in code with: `import.meta.env.VITE_NANOBANANA_API_KEY`

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Framer Motion** - Animations
- **CSS Variables** - Theming system
- **Google Fonts** - DM Serif Display & Outfit

## Performance

- Optimized animations using Framer Motion
- Lazy loading for images
- CSS Grid for responsive layouts
- Minimal dependencies for fast load times

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) with ES6+ support.

## Next Steps

1. **Add real content** - Update placeholders with your actual bio, services, and links
2. **Integrate APIs** - Connect NanoBanana Pro and email service
3. **Add social links** - Update footer with your real social media URLs
4. **SEO optimization** - Add meta tags, Open Graph images, sitemap
5. **Set up domain** - Point gavinpurcell.com to your hosting
6. **Analytics** - Add tracking to measure engagement

## Need Help?

The site is built with standard React patterns and well-commented code. Each component is self-contained for easy updates.

---

Built with passion for AI & media innovation
