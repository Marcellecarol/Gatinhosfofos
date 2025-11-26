document.addEventListener('DOMContentLoaded', () => {
    console.log('Kitten Haven: Modo Mundo dos Gatinhos Ativado! 🐱✨');

    // --- 1. Rastro de Patinhas (Cursor Trail) ---
    let lastPawTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastPawTime > 100) { // Limita a criação para não travar
            createPaw(e.clientX, e.clientY);
            lastPawTime = now;
        }
    });

    function createPaw(x, y) {
        const paw = document.createElement('div');
        paw.classList.add('paw-print');
        paw.style.left = `${x}px`;
        paw.style.top = `${y}px`;
        // Rotação aleatória para parecer pisadas naturais
        const rotation = Math.random() * 30 - 15;
        paw.style.transform = `rotate(${rotation}deg)`;

        document.body.appendChild(paw);

        // Remove do DOM após a animação
        setTimeout(() => {
            paw.remove();
        }, 1000);
    }

    // --- 2. Elementos Flutuantes (Fundo Mágico) ---
    const floatingIcons = ['🧶', '🐟', '🐭', '☁️', '💖'];

    function createFloatingElement() {
        const el = document.createElement('div');
        el.classList.add('floating-element');
        el.textContent = floatingIcons[Math.floor(Math.random() * floatingIcons.length)];

        // Posição aleatória horizontal
        el.style.left = `${Math.random() * 100}vw`;
        // Tamanho aleatório
        const size = Math.random() * 20 + 20; // 20px a 40px
        el.style.fontSize = `${size}px`;
        // Duração da animação aleatória
        const duration = Math.random() * 10 + 10; // 10s a 20s
        el.style.animationDuration = `${duration}s`;

        document.body.appendChild(el);

        // Remove quando sair da tela (tempo da animação)
        setTimeout(() => {
            el.remove();
        }, duration * 1000);
    }

    // Cria um elemento a cada 2 segundos
    setInterval(createFloatingElement, 2000);
    // Cria alguns iniciais
    for (let i = 0; i < 5; i++) createFloatingElement();


    // --- 3. Efeito 3D Tilt nos Cards e Lógica do Modal ---
    const cards = document.querySelectorAll('.cat-card');

    cards.forEach(card => {
        // Tilt Effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });

        // --- Modal Logic ---
        const openModal = () => {
            const modal = document.getElementById('catModal');
            const modalImg = document.getElementById('modal-img');
            const modalName = document.getElementById('modal-name');
            const modalAge = document.getElementById('modal-age-val');
            const modalDesc = document.getElementById('modal-desc');

            // Popula dados
            modalImg.src = card.dataset.img;
            modalName.textContent = card.dataset.name;
            modalAge.textContent = card.dataset.age;
            modalDesc.textContent = card.dataset.desc;

            modal.style.display = 'block';
        };

        // Clique no botão "Conhecer"
        const btn = card.querySelector('.details-btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal();
            });
        }

        // Clique no card todo também abre
        card.addEventListener('click', openModal);
    });

    // Fechar Modal
    const modal = document.getElementById('catModal');
    const closeBtn = document.querySelector('.close-modal');
    const adoptBtn = document.getElementById('adopt-btn');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    if (adoptBtn) {
        adoptBtn.addEventListener('click', () => {
            alert('Obrigado pelo interesse! Entraremos em contato para a adoção. 😻');
            modal.style.display = 'none';
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
