document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 0. TAB NAVIGATION LOGIC
    // ---------------------------------------------------------
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
        });
    });

    // ---------------------------------------------------------
    // 1. LINK RENDERING (CATEGORY-WISE, PRIORITY ORDERED)
    // ---------------------------------------------------------
    const linksContainer = document.getElementById('links-container');

    const categoryOrder = [
        "AI & Machine Learning",
        "Security & Network Tools",
        "Web Applications",
        "Utility Tools"
    ];

    const createLinkElement = (link) => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'link-btn skeleton-text loading';
        a.setAttribute('data-type', link.text.toLowerCase());

        let microIcon = 'chevron_right';
        const lowerText = link.text.toLowerCase();

        if (lowerText.includes('portfolio')) microIcon = 'terminal';
        else if (lowerText.includes('manager') || lowerText.includes('pypass')) microIcon = 'key';
        else if (lowerText.includes('weather')) microIcon = 'cloud';
        else if (lowerText.includes('calculator')) microIcon = 'calculate';
        else if (lowerText.includes('speed') || lowerText.includes('netpulse')) microIcon = 'speed';
        else if (lowerText.includes('blog')) microIcon = 'article';
        else if (lowerText.includes('crop') || lowerText.includes('drishtilens')) microIcon = 'psychology';
        else if (lowerText.includes('flashdl')) microIcon = 'download';

        a.innerHTML = `
            ${link.icon}
            <span class="link-text">${link.text}</span>
            <span class="micro-interaction material-symbols-outlined">${microIcon}</span>
        `;

        if (link.type === 'email') {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                navigator.clipboard.writeText(config.contact.email).then(() => {
                    const textSpan = a.querySelector('.link-text');
                    const originalText = textSpan.textContent;
                    textSpan.textContent = 'Copied!';
                    setTimeout(() => textSpan.textContent = originalText, 2000);
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

        return a;
    };

    if (linksContainer) {
        categoryOrder.forEach(category => {
            const categoryLinks = config.links.filter(l => l.category === category);
            if (categoryLinks.length === 0) return;

            const heading = document.createElement('h2');
            heading.className = 'category-title skeleton-text loading';
            heading.textContent = category;
            linksContainer.appendChild(heading);

            if (category === "Utility Tools") {
                // Collapsible "small projects" group to avoid diluting serious work
                const wrapper = document.createElement('div');
                wrapper.className = 'utility-collapsible';

                const hiddenGroup = document.createElement('div');
                hiddenGroup.className = 'category-group utility-hidden-group';
                categoryLinks.forEach(link => hiddenGroup.appendChild(createLinkElement(link)));

                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'utility-toggle-btn skeleton-text loading';
                toggleBtn.innerHTML = `
                    <span class="material-symbols-outlined">expand_more</span>
                    <span class="toggle-text">+ ${categoryLinks.length} more small projects</span>
                `;

                toggleBtn.addEventListener('click', () => {
                    const isOpen = hiddenGroup.classList.contains('open');
                    if (isOpen) {
                        hiddenGroup.style.maxHeight = null;
                        hiddenGroup.classList.remove('open');
                    } else {
                        hiddenGroup.classList.add('open');
                        hiddenGroup.style.maxHeight = hiddenGroup.scrollHeight + 'px';
                    }
                    toggleBtn.classList.toggle('active', !isOpen);
                    toggleBtn.querySelector('.toggle-text').textContent = !isOpen
                        ? 'Show less'
                        : `+ ${categoryLinks.length} more small projects`;
                });

                wrapper.appendChild(toggleBtn);
                wrapper.appendChild(hiddenGroup);
                linksContainer.appendChild(wrapper);
            } else {
                const group = document.createElement('div');
                group.className = 'category-group';
                categoryLinks.forEach(link => group.appendChild(createLinkElement(link)));
                linksContainer.appendChild(group);
            }
        });
    }

    Object.keys(config.social).forEach(key => {
        const socialLink = document.getElementById(`${key}-link`);
        if (socialLink) {
            socialLink.href = config.social[key];
            socialLink.setAttribute('data-tooltip', key.charAt(0).toUpperCase() + key.slice(1));
        }
    });

    // ---------------------------------------------------------
    // 2. PORTFOLIO BUTTON IN HEADER
    // ---------------------------------------------------------
    const portfolioHeaderBtn = document.getElementById('portfolio-header-btn');
    if (portfolioHeaderBtn) {
        portfolioHeaderBtn.href = 'https://nilay-naha-portfolio.vercel.app/';
    }

    // ---------------------------------------------------------
    // 3. QR CODE MODAL
    // ---------------------------------------------------------
    const qrShareBtn = document.getElementById('qr-share-btn');
    const qrModalOverlay = document.getElementById('qr-modal-overlay');
    const closeQrModal = document.getElementById('close-qr-modal');
    const copyUrlBtn = document.getElementById('copy-url-btn');
    const qrDisplay = document.getElementById('qr-code-display');
    let qrGenerated = false;

    const pageUrl = 'https://aminilay.github.io/LinkCascade/';

    if (qrShareBtn) {
        qrShareBtn.addEventListener('click', () => {
            qrModalOverlay.classList.add('active');
            if (!qrGenerated) {
                new QRCode(qrDisplay, {
                    text: pageUrl,
                    width: 200,
                    height: 200,
                    colorDark: document.body.classList.contains('dark')
                        ? '#ffffff'
                        : '#000000',
                    colorLight: document.body.classList.contains('dark')
                        ? '#000000'
                        : '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                });
                qrGenerated = true;
            }
        });
    }

    if (closeQrModal) {
        closeQrModal.addEventListener('click', () => {
            qrModalOverlay.classList.remove('active');
        });
    }

    qrModalOverlay?.addEventListener('click', (e) => {
        if (e.target === qrModalOverlay) {
            qrModalOverlay.classList.remove('active');
        }
    });

    if (copyUrlBtn) {
        copyUrlBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(pageUrl).then(() => {
                copyUrlBtn.innerHTML = `
                    <span class="material-symbols-outlined">check</span>
                    Copied!
                `;
                setTimeout(() => {
                    copyUrlBtn.innerHTML = `
                        <span class="material-symbols-outlined">content_copy</span>
                        Copy Link
                    `;
                }, 2000);
            });
        });
    }

    // ---------------------------------------------------------
    // 4. RADAR CHART (THEME AWARE)
    // ---------------------------------------------------------
    let skillsChart;
    const body = document.body;
    const isDarkInit = localStorage.getItem('darkMode') === 'true';
    if (isDarkInit) body.classList.add('dark');

    const updateThemeVisuals = (isDark) => {
        const primaryColor = isDark ? '#FFFFFF' : '#000000';
        const bgColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

        const ctx = document.getElementById('skills-radar');
        if (!ctx) return;
        if (skillsChart) skillsChart.destroy();

        skillsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Java', 'Python', 'Kotlin', 'OpenCV', 'Selenium', 'Machine Learning'],
                datasets: [{
                    label: 'Proficiency',
                    data: [90, 85, 80, 85, 80, 90],
                    backgroundColor: bgColor,
                    borderColor: primaryColor,
                    pointBackgroundColor: primaryColor,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: primaryColor
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { color: isDark ? '#333' : '#E5E5E5' },
                        grid: { color: isDark ? '#333' : '#E5E5E5' },
                        pointLabels: { color: primaryColor, font: { family: 'Inter', size: 12, weight: '600' } },
                        ticks: { display: false, min: 0, max: 100 }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    };

    updateThemeVisuals(isDarkInit);

    const toggleBtn2 = document.querySelector('.dark-mode-toggle');
    if (toggleBtn2) {
        toggleBtn2.addEventListener('click', () => {
            body.classList.toggle('dark');
            const isDarkNow = body.classList.contains('dark');
            localStorage.setItem('darkMode', isDarkNow);
            updateThemeVisuals(isDarkNow);
        });
    }

    // ---------------------------------------------------------
    // 5. SKELETON LOADING
    // ---------------------------------------------------------
    const skeletons = document.querySelectorAll('.skeleton-text, .skeleton');
    skeletons.forEach(el => el.classList.add('loading'));
    setTimeout(() => skeletons.forEach(el => el.classList.remove('loading', 'skeleton')), 800);

    // ---------------------------------------------------------
    // 6. PARTICLE NETWORK BACKGROUND
    // ---------------------------------------------------------
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctxCanvas = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw(isDark) {
                ctxCanvas.fillStyle = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)';
                ctxCanvas.beginPath();
                ctxCanvas.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctxCanvas.fill();
            }
        }

        for (let i = 0; i < 60; i++) particles.push(new Particle());

        function animateParticles() {
            ctxCanvas.clearRect(0, 0, canvas.width, canvas.height);
            const isDark = document.body.classList.contains('dark');

            particles.forEach(p => { p.update(); p.draw(isDark); });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctxCanvas.beginPath();
                        ctxCanvas.strokeStyle = isDark
                            ? `rgba(255,255,255,${0.15 - dist / 800})`
                            : `rgba(0,0,0,${0.1 - dist / 1200})`;
                        ctxCanvas.lineWidth = 1;
                        ctxCanvas.moveTo(particles[i].x, particles[i].y);
                        ctxCanvas.lineTo(particles[j].x, particles[j].y);
                        ctxCanvas.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // ---------------------------------------------------------
    // 7. HIDDEN DEVELOPER TERMINAL (ALT + T)
    // ---------------------------------------------------------
    const terminal = document.getElementById('terminal-mode');
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    if (terminal && termInput) {
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key.toLowerCase() === 't') {
                e.preventDefault();
                terminal.classList.toggle('active');
                if (terminal.classList.contains('active')) {
                    setTimeout(() => {
                        termInput.value = '';
                        termInput.focus();
                    }, 50);
                }
            }
            if (e.key === 'Escape' && terminal.classList.contains('active')) {
                terminal.classList.remove('active');
                document.activeElement.blur();
            }
        });

        const printToTerminal = (text) => {
            const div = document.createElement('div');
            div.innerHTML = text;
            termOutput.appendChild(div);
            termOutput.scrollTop = termOutput.scrollHeight;
        };

        termInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const val = termInput.value.trim().toLowerCase();
                printToTerminal(`<span class="prompt">admin@nilay:~$</span> ${val}`);
                termInput.value = '';

                switch (val) {
                    case 'help': printToTerminal('Available commands: about, skills, projects, clear, exit'); break;
                    case 'about': printToTerminal('Nilay Naha - Software Developer specializing in AI/ML & Full-Stack.'); break;
                    case 'skills': printToTerminal('Java, Python, Kotlin, OpenCV, Selenium, Next.js, TensorFlow.'); break;
                    case 'projects': printToTerminal('DrishtiLens, Face Recognition System, NetPulse v2.0, FlashDL.'); break;
                    case 'clear': termOutput.innerHTML = '<div>Type \'help\' to see a list of available commands.</div>'; break;
                    case 'exit': terminal.classList.remove('active'); break;
                    case '': break;
                    default: printToTerminal(`Command not found: ${val}. Type 'help'.`);
                }
            }
        });
    }
});