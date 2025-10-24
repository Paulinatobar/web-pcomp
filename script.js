// Este código se construyó en base a la información de: https://getbootstrap.com/docs/3.4/javascript/#js-overview

// Scroll para los enlaces de navegación
// Código adaptado de https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
document.querySelectorAll('nav a, .brand[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Resaltar sección activa en la navegación
// Código adaptado de https://www.w3schools.com/bootstrap/bootstrap_scrollspy.asp
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('header').offsetHeight;

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.style.opacity = '0.7';
        const href = link.getAttribute('href').slice(1);
        if (href === current) {
            link.style.opacity = '1';
        }
    });
});

// Mostrar información interactiva en autores
// Código adaptado de https://www.w3schools.com/jsref/event_onmouseenter.asp y https://stackoverflow.com/questions/28897900/on-mousenter-hover-show-and-hide-toggle-a-child-element 
document.querySelectorAll('.author-card').forEach(card => {
    const photo = card.querySelector('.author-photo');
    if (!photo) return;

    const showInfo = () => card.classList.add('show-info');
    const hideInfo = () => card.classList.remove('show-info');

    card.addEventListener('mouseenter', showInfo);
    card.addEventListener('mouseleave', hideInfo);

    photo.addEventListener('focus', showInfo);
    photo.addEventListener('blur', hideInfo);

    photo.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            hideInfo();
            photo.blur();
        }
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            showInfo();
        }
    });

    photo.addEventListener('touchstart', () => {
        card.classList.toggle('show-info');
    }, {
        passive: true
    });
});

// Funcionalidad para expandir/contraer las tarjetas de Critical Media
// Código adaptado de https://stackoverflow.com/questions/57815271/how-to-expand-only-one-accordion-tab-at-a-time 
document.querySelectorAll('.critical-card').forEach(card => {
    const media = card.querySelector('.critical-media');
    if (!media) return;

    media.addEventListener('click', (e) => {
        e.stopPropagation();

        document.querySelectorAll('.critical-card.expanded').forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('expanded');
            }
        });
        card.classList.toggle('expanded');
    });

    media.addEventListener('touchstart', () => {
        card.classList.toggle('expanded');
    }, {
        passive: true
    });
});

// Funcionalidad para la foto de Lev Manovich
document.querySelectorAll('.photo-card').forEach(card => {
    const showInfo = () => card.classList.add('show-info');
    const hideInfo = () => card.classList.remove('show-info');

    card.addEventListener('mouseenter', showInfo);
    card.addEventListener('mouseleave', hideInfo);
    card.addEventListener('focus', showInfo);
    card.addEventListener('blur', hideInfo);

    card.addEventListener('click', () => {
        card.classList.toggle('show-info');
    });
});

// Botones de principios de Lev Manovich
// Código adaptado de https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll y con ayuda de Max Yáñez
document.querySelectorAll('.principle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const principle = btn.dataset.principle;
        const descriptionContainer = document.querySelector('.principles-description');

        document.querySelectorAll('.principle-btn').forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

        document.querySelectorAll('.description-content').forEach(content => {
            content.classList.remove('active');
        });

        const targetContent = document.querySelector(`[data-content="${principle}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
            descriptionContainer.classList.add('has-content');
        }
    });
});

// Carrusel de la galería de "Proyecto"
// Código adaptado de https://getbootstrap.com/docs/3.4/javascript/#carousel 
(() => {
    const gallery = document.querySelector('.project-gallery');
    if (!gallery) return;

    const slider = gallery.querySelector('.slider');
    const slides = Array.from(gallery.querySelectorAll('.slide'));
    const dots = Array.from(gallery.querySelectorAll('.dot'));
    const prevBtn = gallery.querySelector('.prev');
    const nextBtn = gallery.querySelector('.next');

    if (!slider || slides.length === 0) return;

    let current = 0;

    const updateSlides = index => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        current = index;
    };

    const goTo = index => {
        const total = slides.length;
        updateSlides((index + total) % total);
    };

    updateSlides(0);

    nextBtn ?.addEventListener('click', () => goTo(current + 1));
    prevBtn ?.addEventListener('click', () => goTo(current - 1));

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goTo(i));
    });

    let startX = null;
    slider.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, {
        passive: true
    });

    slider.addEventListener('touchend', e => {
        if (startX == null) return;
        const delta = e.changedTouches[0].clientX - startX;
        if (Math.abs(delta) > 40) {
            goTo(delta > 0 ? current - 1 : current + 1);
        }
        startX = null;
    });
})();
