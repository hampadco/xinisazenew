# XINO Design Group - Exhibition Stand Design Website

A beautiful, modern, and interactive single-page website for an exhibition stand design and architecture company.

## Features

- Modern and responsive design
- Interactive animations
- Portfolio gallery with filtering
- Modal windows for portfolio items
- Mobile-friendly navigation
- Smooth scrolling
- Section animations on scroll
- Contact form with validation
- Loading screen animation

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS, no frameworks)
- Font Awesome for icons
- Google Fonts

## File Structure

- `index.html` - Main HTML structure
- `style.css` - All styles for the website
- `script.js` - JavaScript functions for animations and interactivity
- `/0/` - Folder containing all images for the website

## How to Run

Simply open the `index.html` file in a web browser. No server or build process is required.

## Customization

### Colors

The website uses CSS variables for easy color customization. You can change the colors by editing the `:root` variables in the `style.css` file:

```css
:root {
    --primary-color: #0d253f;
    --secondary-color: #01b8aa;
    --accent-color: #fd7e14;
    --text-color: #333;
    --light-text: #fff;
    --bg-color: #fff;
    --dark-bg: #0d253f;
    --gray-bg: #f5f5f5;
    /* ... other variables */
}
```

### Content

To change the content of the website, edit the text within the HTML elements in the `index.html` file.

### Images

To replace images, simply replace the image files in the `/0/` directory with your own images, making sure to maintain the same file names or update the file paths in the HTML.

### Portfolio Items

To add more portfolio items, copy an existing portfolio item structure from the HTML and modify it:

```html
<div class="portfolio-item" data-category="large">
    <img src="0/your-image.png" alt="Exhibition Stand">
    <div class="portfolio-overlay">
        <h3>Your Title Here</h3>
        <p>Your description here</p>
    </div>
</div>
```

## Browser Compatibility

The website is compatible with all modern browsers:

- Chrome
- Firefox
- Safari
- Edge
- Opera

## Credits

- Fonts: Google Fonts (Poppins)
- Icons: Font Awesome
- Images: XINO Design Group 