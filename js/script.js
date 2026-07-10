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
    // 1. LINK RENDERING & EVENT LISTENERS
    // ---------------------------------------------------------
    const linksContainer = document.getElementById('links-container');
    
    config.links.forEach((link) => {
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
        if (linksContainer) linksContainer.appendChild(a);
    });

    Object.keys(config.social).forEach(key => {
        const socialLink = document.getElementById(`${key}-link`);
        if (socialLink) {
            socialLink.href = config.social[key];
            socialLink.setAttribute('data-tooltip', key.charAt(0).toUpperCase() + key.slice(1));
        }
    });

    // ---------------------------------------------------------
    // 2. RADAR CHART (THEME AWARE)
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

    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark');
            const isDarkNow = body.classList.contains('dark');
            localStorage.setItem('darkMode', isDarkNow);
            updateThemeVisuals(isDarkNow);
        });
    }

    // ---------------------------------------------------------
    // 3. SKELETON LOADING & DASHBOARD
    // ---------------------------------------------------------
    const skeletons = document.querySelectorAll('.skeleton-text, .skeleton');
    skeletons.forEach(el => el.classList.add('loading'));
    setTimeout(() => skeletons.forEach(el => el.classList.remove('loading', 'skeleton')), 800);

    window.addEventListener('load', () => {
        const loadTimeElement = document.getElementById('load-time');
        if (loadTimeElement) loadTimeElement.innerText = `${Math.round(performance.now())} ms`;
    });

    let seconds = 0;
    const sessionElement = document.getElementById('session-time');
    if (sessionElement) {
        setInterval(() => {
            seconds++;
            const m = Math.floor(seconds / 60).toString().padStart(2, '0');
            const s = (seconds % 60).toString().padStart(2, '0');
            sessionElement.innerText = `${m}:${s}`;
        }, 1000);
    }

    // ---------------------------------------------------------
    // 4. PARTICLE NETWORK BACKGROUND
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
                this.x += this.vx; this.y += this.vy;
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
                        ctxCanvas.strokeStyle = isDark ? `rgba(255,255,255,${0.15 - dist/800})` : `rgba(0,0,0,${0.1 - dist/1200})`;
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
    // 5. HIDDEN DEVELOPER TERMINAL (ALT + T)
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

                switch(val) {
                    case 'help': printToTerminal('Available commands: about, skills, projects, clear, exit'); break;
                    case 'about': printToTerminal('Nilay Naha - Software Developer specializing in AI/ML & Full-Stack.'); break;
                    case 'skills': printToTerminal('Java, Python, Kotlin, OpenCV, Selenium, Next.js, TensorFlow.'); break;
                    case 'projects': printToTerminal('NetPulse v2.0, Face Recognition System, FlashDL, DrishtiLens.'); break;
                    case 'clear': termOutput.innerHTML = '<div>Type \'help\' to see a list of available commands.</div>'; break;
                    case 'exit': terminal.classList.remove('active'); break;
                    case '': break;
                    default: printToTerminal(`Command not found: ${val}. Type 'help'.`);
                }
            }
        });
    }
});