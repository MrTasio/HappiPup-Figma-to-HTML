// Simple component loader
async function loadComponent(componentName, containerId) {
    try {
        const response = await fetch(`html-includes/${componentName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${componentName}`);
        }
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            // Parse HTML and handle scripts properly
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Handle style tags separately - move them to head
            const styleTags = doc.querySelectorAll('style');
            styleTags.forEach(styleTag => {
                const newStyle = document.createElement('style');
                newStyle.textContent = styleTag.textContent;
                document.head.appendChild(newStyle);
            });
            
            // Get all elements from the parsed document (excluding style tags)
            const fragment = document.createDocumentFragment();
            Array.from(doc.body.childNodes).forEach(node => {
                // Skip style tags as they're already added to head
                if (node.nodeName !== 'STYLE') {
                    fragment.appendChild(node.cloneNode(true));
                }
            });
            
            // Append to container
            container.appendChild(fragment);
            
            // Execute any script tags
            const scripts = container.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                } else {
                    newScript.textContent = oldScript.textContent;
                }
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        }
    } catch (error) {
        console.error(`Error loading component ${componentName}:`, error);
        console.error('Note: If opening file:// directly, use a local server instead:');
        console.error('  python3 -m http.server 8000');
        console.error('  Then open: http://localhost:8000/index.html');
    }
}

// Create component containers and load components
async function initializePage() {
    const root = document.getElementById('components-root');
    
    if (!root) {
        console.error('Components root container not found');
        return;
    }

    // Create containers for each component
    pageConfig.components.forEach(component => {
        const container = document.createElement('div');
        container.id = component.containerId;
        container.className = `component-container ${component.containerClass || ''}`;
        // Set dataKey attribute for component scripts to use
        container.setAttribute('data-key', component.dataKey || component.name);
        root.appendChild(container);
    });

    // Load all components
    for (const component of pageConfig.components) {
        await loadComponent(component.name, component.containerId);
    }
}

// Initialize page when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // pageConfig is defined in index.html
    if (typeof pageConfig === 'undefined') {
        console.error('pageConfig is not defined. Please define it in index.html');
        return;
    }
    await initializePage();
});

