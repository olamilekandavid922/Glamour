// Mobile menu
const nav = document.getElementById('nav');
document.getElementById('menuToggle').addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// "Book Now" on a service pre-selects it in the booking form
document.querySelectorAll('[data-service]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('service').value = btn.dataset.service;
    showForm();
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});

// Gallery lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => { lbImg.src = img.src; lbImg.alt = img.alt; lb.hidden = false; });
});
lb.addEventListener('click', e => { if (e.target !== lbImg) lb.hidden = true; });
document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });

// Booking form
const form = document.getElementById('bookingForm');
const success = document.getElementById('success');
const err = document.getElementById('formError');
const dateInput = document.getElementById('date');
dateInput.min = new Date().toISOString().split('T')[0]; // no past dates

function showForm() { form.hidden = false; success.hidden = true; }

form.addEventListener('submit', e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  if (!v('name') || !v('email') || !v('phone') || !v('service') || !v('date') || !v('time')) {
    err.textContent = 'Please fill in all fields.'; return;
  }
  if (!/^\S+@\S+\.\S+$/.test(v('email'))) { err.textContent = 'Please enter a valid email address.'; return; }
  err.textContent = '';
  document.getElementById('successMsg').textContent =
    `Thanks ${v('name')}! Your ${v('service')} is booked for ${v('date')} at ${v('time')}. We'll contact you on ${v('phone')} to confirm.`;
  form.hidden = true;
  success.hidden = false;
  form.reset();
});
document.getElementById('newBooking').addEventListener('click', showForm);

// Contact form
const cForm = document.getElementById('contactForm');
const cErr = document.getElementById('contactError');
cForm.addEventListener('submit', e => {
  e.preventDefault();
  const n = document.getElementById('cname').value.trim();
  const em = document.getElementById('cemail').value.trim();
  const m = document.getElementById('cmsg').value.trim();
  if (!n || !em || !m) { cErr.style.color = '#c0392b'; cErr.textContent = 'Please fill in all fields.'; return; }
  if (!/^\S+@\S+\.\S+$/.test(em)) { cErr.style.color = '#c0392b'; cErr.textContent = 'Enter a valid email.'; return; }
  cErr.style.color = '#2e8b57';
  cErr.textContent = `Thank you ${n}, your message has been sent!`;
  cForm.reset();
});
// Navbar shadow + shrink on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});