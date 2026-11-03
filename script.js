const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  }));
}

// Contact form: validate required fields, email, phone, guest count and message.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const dateField = document.getElementById('travelDate');
  if (dateField) dateField.min = new Date().toISOString().slice(0, 10);
  const fields = [...contactForm.querySelectorAll('input, select, textarea')];
  const showFieldState = field => {
    const wrapper = field.closest('.field');
    const valid = field.checkValidity();
    wrapper?.classList.toggle('invalid', !valid);
    field.setAttribute('aria-invalid', String(!valid));
    return valid;
  };
  fields.forEach(field => {
    field.addEventListener('input', () => showFieldState(field));
    field.addEventListener('change', () => showFieldState(field));
  });
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const results = fields.map(showFieldState);
    const firstInvalid = fields.find(field => !field.checkValidity());
    if (results.some(valid => !valid)) {
      document.getElementById('formSuccess').textContent = '';
      firstInvalid?.focus();
      return;
    }
    document.getElementById('formSuccess').textContent = 'Thank you! Your enquiry is valid. This demo form does not send or store your details.';
    contactForm.reset();
    fields.forEach(field => {
      field.closest('.field')?.classList.remove('invalid');
      field.removeAttribute('aria-invalid');
    });
    if (dateField) dateField.min = new Date().toISOString().slice(0, 10);
  });
}

// Briefly animate photo cards when tapped on touch screens.
const movingImages = document.querySelectorAll('.feature-photo-card img, .destination img, .service-grid img, .gallery-grid img, .section-image img, .experience-photo img');
const motionTimers = new WeakMap();
movingImages.forEach(image => {
  image.addEventListener('pointerdown', () => {
    const card = image.closest('.feature-photo-card, .destination, .service-grid article, .gallery-grid article, .section-image, .experience-photo');
    if (!card) return;
    card.classList.add('image-touch-active');
    clearTimeout(motionTimers.get(card));
    motionTimers.set(card, setTimeout(() => card.classList.remove('image-touch-active'), 520));
  }, { passive: true });
});
