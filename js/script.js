// Load links dynamically from config
document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links-container');
    
    // Populate links
    config.links.forEach((link, index) => {
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        a.className = 'link-btn';
        a.setAttribute('data-type', link.text.toLowerCase());
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        linksContainer.appendChild(a);
    });

    // Set social media links
    document.getElementById('github-link').href = config.social.github;
    document.getElementById('linkedin-link').href = config.social.linkedin;
    document.getElementById('facebook-link').href = config.social.facebook;
    document.getElementById('twitter-link').href = config.social.twitter;
    document.getElementById('instagram-link').href = config.social.instagram;

    // Dark mode toggle
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark');
    }

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        localStorage.setItem('darkMode', body.classList.contains('dark'));
    });
});