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

### 📝 Headless WordPress Blog
- Integrated blog powered by WordPress REST API
- SEO-optimized blog posts with dynamic meta tags
- Responsive blog listing and individual post pages
- Pagination and featured images support
- Matches site's neo-brutalist design aesthetic

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

### WordPress Blog Setup

The site includes a headless WordPress blog integration. To connect your WordPress backend:

1. **Set up WordPress** (choose one):
   - **WordPress.com** - Free tier, instant setup, REST API enabled
   - **Local by Flywheel** - Free local WordPress for development
   - **Hosting provider** - Install WordPress on your hosting (Kinsta, WP Engine, etc.)

2. **Update the API endpoint**:
   Edit `.env` file:
   ```
   VITE_WP_API_URL=https://yourblog.com/wp-json/wp/v2
   ```

3. **Enable REST API** (usually enabled by default):
   - Ensure WordPress REST API is accessible at `/wp-json/wp/v2`
   - Test by visiting `https://yourblog.com/wp-json/wp/v2/posts`

4. **CORS Configuration** (if needed):
   If your WordPress is on a different domain, add to `wp-config.php`:
   ```php
   header('Access-Control-Allow-Origin: *');
   ```

The blog is currently using a demo WordPress API. Once you set up your WordPress instance, update the `.env` file with your URL and restart the dev server.

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

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing for blog pages
- **Framer Motion** - Animations
- **React Helmet Async** - SEO meta tags management
- **WordPress REST API** - Headless CMS for blog content
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

1. **Set up WordPress** - Choose a WordPress hosting option and update the API URL in `.env`
2. **Add real content** - Update placeholders with your actual bio, services, and links
3. **Integrate APIs** - Connect NanoBanana Pro and email service
4. **Write blog posts** - Start publishing content on your WordPress backend
5. **Add social links** - Update footer with your real social media URLs
6. **SEO optimization** - Add meta tags, Open Graph images, sitemap
7. **Set up domain** - Point gavinpurcell.com to your hosting
8. **Analytics** - Add tracking to measure engagement

## Need Help?

The site is built with standard React patterns and well-commented code. Each component is self-contained for easy updates.

---

Built with passion for AI & media innovation
