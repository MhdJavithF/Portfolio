/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
const scrollProgress = document.getElementById('scroll-progress');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (scrollProgress) scrollProgress.style.width = scrolled + '%';

  // back-to-top
  if (backToTopBtn) {
    backToTopBtn.classList.toggle('show', scrollTop > 300);
  }

  // sticky header shadow
  const header = document.querySelector('header');
  if (header) header.classList.toggle('scrolled', scrollTop > 10);

  // active nav highlight
  updateActiveNav();
}, { passive: true });

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   ACTIVE NAV HIGHLIGHT ON SCROLL
   ============================================================ */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul li');
  let currentId = '';

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= 120) currentId = section.id;
  });

  navLinks.forEach(li => {
    const a = li.querySelector('a');
    if (!a) return;
    const href = a.getAttribute('href');
    li.classList.toggle('nav-active', href === `#${currentId}`);
  });
}

/* ============================================================
   SCROLL-TRIGGERED ANIMATIONS
   ============================================================ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

/* ============================================================
   TYPING ANIMATION — hero headline
   ============================================================ */
const roles = ['Frontend Engineer', 'React Developer', 'Next.js Developer', 'UI Craftsman'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.querySelector('h4 span:nth-child(2)');

function typeRole() {
  if (!typingEl) return;
  const current = roles[roleIndex];

  if (isDeleting) {
    typingEl.textContent = current.slice(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      charIndex = 0;
      setTimeout(typeRole, 420);
      return;
    }
    setTimeout(typeRole, 48);
  } else {
    typingEl.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeRole, 2200);
      return;
    }
    setTimeout(typeRole, 78);
  }
}

// Start after a short delay so the page loads first
setTimeout(typeRole, 900);

/* ============================================================
   MARQUEE — pause on hover (handled in CSS; JS fallback)
   ============================================================ */
const track = document.querySelector('.track');
if (track) {
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function toggleMobileMenu() {
  document.getElementById('menu').classList.toggle('active');
}

/* ============================================================
   SEE MORE / SEE LESS INLINE TOGGLE
   ============================================================ */
function toggleSeeMore(link) {
  const p = link.closest('p');
  const truncated = p.querySelector('.truncated-text');
  const dots = p.querySelector('.see-more-dots');
  const isHidden = window.getComputedStyle(truncated).display === 'none';

  truncated.style.display = isHidden ? 'inline' : 'none';
  dots.style.display = isHidden ? 'none' : 'inline';
  link.textContent = isHidden ? 'See less' : 'See more';
}

/* ============================================================
   SMOOTH SCROLL — for all anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    // close mobile menu if open
    document.getElementById('menu')?.classList.remove('active');
  });
});

/* ============================================================
   SKILL TAG HOVER — ripple effect
   ============================================================ */
document.querySelectorAll('.skills .left-column li').forEach(li => {
  li.addEventListener('click', function () {
    this.style.transform = 'scale(0.92)';
    setTimeout(() => { this.style.transform = ''; }, 160);
  });
});