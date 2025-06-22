// This file is now cleaner, but functionally the same for your links.
// The new visitor counter is handled automatically by the external script.

document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links-container');
    
    // Populate main links
    config.links.forEach((link) => {
        const a = document.createElement('a');
        a.href = link.url;
        a.innerHTML = `${link.icon} <span>${link.text}</span>`;
        a.className = 'link-btn';
        a.setAttribute('data-type', link.text.toLowerCase());

        if (link.type === 'email') {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                navigator.clipboard.writeText(config.contact.email).then(() => {
                    const originalText = a.querySelector('span').textContent;
                    a.querySelector('span').textContent = 'Copied!';
                    setTimeout(() => {
                        a.querySelector('span').textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy email: ', err);
                    window.location.href = link.url;
                });
            });
        } else {
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
        }

        if (link.url === '#') {
            a.classList.add('disabled');
            a.removeAttribute('href');
        }
        
        linksContainer.appendChild(a);
    });

    // Populate social media links dynamically and add tooltips
    Object.keys(config.social).forEach(key => {
        const socialLink = document.getElementById(`${key}-link`);
        if (socialLink) {
            const url = config.social[key];
            socialLink.href = url;
            const tooltipText = key.charAt(0).toUpperCase() + key.slice(1);
            socialLink.setAttribute('data-tooltip', tooltipText);
        }
    });

    // Dark mode toggle
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark');
    }

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        localStorage.setItem('darkMode', body.classList.contains('dark'));
    });
});
