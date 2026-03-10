document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const navCards = document.querySelectorAll('.nav-card');
    const panels = document.querySelectorAll('.panel');
    const closeButtons = document.querySelectorAll('.panel-close');
    const backToTop = document.getElementById('back-to-top');

    // --- Theme ---
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        themeIcon.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // --- Nav Cards → Toggle Panels ---
    navCards.forEach(card => {
        card.addEventListener('click', () => {
            const target = card.dataset.section;
            const panel = document.getElementById(target);
            const isOpen = panel.classList.contains('open');

            // Close all panels and deactivate cards
            panels.forEach(p => p.classList.remove('open'));
            navCards.forEach(c => c.classList.remove('active'));

            if (!isOpen) {
                panel.classList.add('open');
                card.classList.add('active');
                // Smooth scroll to panel
                setTimeout(() => {
                    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    });

    // --- Close Buttons ---
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = btn.closest('.panel');
            panel.classList.remove('open');
            navCards.forEach(c => {
                if (c.dataset.section === panel.id) {
                    c.classList.remove('active');
                }
            });
        });
    });

    // --- Back to Top ---
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
