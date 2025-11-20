# Figma to HTML - Reusable Component System

![Figma Design](figma.png)

This project converts Figma designs into a reusable, component-based HTML system. Each section from the Figma design is built as an independent, reusable component that can be used multiple times with different content.

## 📋 Project Overview

The main goal of this project is to transform static Figma designs into a flexible, maintainable HTML structure where:
- Each section is a reusable component
- Content is managed through JSON files
- Components can be used multiple times with different data
- Easy to add, remove, or rearrange sections

## 🏗️ Project Structure

```
figma-to-html/
├── index.html                 # Main HTML file that loads all components
├── index.js                  # Component loader script
├── figma/                    # Figma design files/references
├── html-includes/            # Component files
│   ├── banner.html
│   ├── hero.html
│   ├── section-1.html
│   ├── section-2.html
│   ├── section-4.html
│   ├── section-faq.html
│   ├── section-offer.html
│   └── ... (other components)
└── html-includes/
    └── page-content/
        └── index.json        # All dynamic content for components
```

## 🎯 Key Features

### 1. **Component-Based Architecture**
Each section is a self-contained HTML file with its own:
- HTML structure
- CSS styles
- JavaScript logic
- Data requirements

### 2. **JSON-Driven Content**
All content (text, images, settings) is stored in `index.json`:
```json
{
  "hero": {
    "headline-part1": "I Almost Gave Up On My Dog... Until ",
    "headline-part2": " This Transformed Her Behavior In Just 7 Days",
    "image": "images/lead dog 1.png",
    "description": "Your content here..."
  }
}
```

### 3. **Reusable Components**
The same component can be used multiple times with different data:
```javascript
// In index.html - pageConfig
{
  "name": "section-4",      // Component file name
  "dataKey": "section-4"    // JSON data key to use
},
{
  "name": "section-4",      // Same component reused!
  "dataKey": "section-8"    // But with different data
}
```

### 4. **DataKey System**
- Each component instance gets a `dataKey` attribute
- The component's JavaScript reads this key to fetch the correct data from JSON
- Allows one component template to render multiple variations

### 5. **Scoped Element Selection**
Components use scoped queries to avoid ID conflicts:
```javascript
// Instead of: document.getElementById() ❌
// We use: sectionDiv.querySelector() ✅
```
This ensures each component instance finds its own elements, even when used multiple times.

## 🚀 How It Works

1. **Component Loading**: `index.js` reads `pageConfig` from `index.html`
2. **Dynamic Fetching**: Each component HTML file is fetched and injected into the page
3. **Data Binding**: Component JavaScript reads its `dataKey` and fetches corresponding data from `index.json`
4. **Rendering**: Component populates its HTML elements with the JSON data

## 📝 Adding a New Section

1. **Create Component File**: Add `html-includes/your-section.html`
2. **Add JSON Data**: Add corresponding data in `html-includes/page-content/index.json`
3. **Register Component**: Add entry to `pageConfig` in `index.html`:
```javascript
{
  "name": "your-section",
  "containerId": "your-section-container",
  "containerClass": "",
  "dataKey": "your-section"
}
```

## 🎨 Styling Guidelines

- **Fonts**: 
  - Titles/Headlines: `Poppins` (bold)
  - Body Text: `Figtree` (regular)
- **Colors**:
  - Primary Purple: `#5C1E6B`
  - Primary Pink: `#E32875`
  - Text: `#0A0A0A`
- **Spacing**: 
  - Section padding: `17px 20px` (desktop), `17px 15px` (mobile)
  - Line height: `30px` for body text
- **Responsive**: All components include mobile breakpoints at `768px`

## 📦 Components Included

- `banner.html` - Top banner with link
- `hero.html` - Hero section with headline, author, image, description
- `section-1.html` - Intro section with image and content
- `section-2.html` - Image and content section
- `section-3.html` - List with icons section
- `section-4.html` - Reusable section with headline, image, content
- `section-cards.html` - Multi-card grid section
- `section-transformation.html` - Transformation timeline section
- `section-product.html` - Product introduction section
- `section-testimonials.html` - Testimonials grid
- `section-how-it-works.html` - Step-by-step guide
- `section-offer.html` - Promotional offer section
- `section-guarantee.html` - Money-back guarantee section
- `section-image.html` - Simple image display section
- `section-faq.html` - FAQ accordion section
- `section-final-offer.html` - Final call-to-action section
- `section-closing.html` - Closing conversion section
- `footer.html` - Site footer

## 🔧 Development

### Running Locally
1. Open `index.html` in a browser, or
2. Use a local server (e.g., `python -m http.server` or `npx serve`)

### Making Changes
- **Content**: Edit `html-includes/page-content/index.json`
- **Styling**: Edit individual component HTML files
- **Structure**: Edit component HTML files or create new ones

## 💡 Benefits

✅ **Reusability**: Use components multiple times with different content  
✅ **Maintainability**: Update one component file to change all instances  
✅ **Flexibility**: Easy to add, remove, or rearrange sections  
✅ **Content Management**: Non-developers can update content via JSON  
✅ **Scalability**: Add new sections without modifying existing code  

## 📄 License

This project is for converting Figma designs to reusable HTML components.
