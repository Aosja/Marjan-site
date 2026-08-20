/* =============================================
   MARJAN BY SAFEENA — SCRIPT.JS
   ============================================= */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1900);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// ===== NAVBAR SCROLL =====
const headerWrapper = document.getElementById('header-wrapper');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    if (headerWrapper) headerWrapper.classList.add('scrolled');
  } else {
    if (headerWrapper) headerWrapper.classList.remove('scrolled');
  }
});

// ===== MOBILE DRAWER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobile-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const drawerClose = document.getElementById('drawer-close');

function openDrawer() {
  if (mobileDrawer) mobileDrawer.classList.add('active');
  if (drawerOverlay) drawerOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  if (mobileDrawer) mobileDrawer.classList.remove('active');
  if (drawerOverlay) drawerOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openDrawer);
if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

// Close drawer on link click
document.querySelectorAll('.drawer-link, .drawer-deal-btn').forEach(link => {
  link.addEventListener('click', () => {
    closeDrawer();
  });
});

// ===== DROPDOWN FILTER CLICK =====
document.querySelectorAll('.dropdown-item[data-filter-target]').forEach(item => {
  item.addEventListener('click', (e) => {
    const filterTarget = item.getAttribute('data-filter-target');
    const targetBtn = document.querySelector(`.filter-btn[data-filter="${filterTarget}"]`);
    if (targetBtn) {
      targetBtn.click();
    }
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== AOS — SCROLL ANIMATIONS =====
const aosElements = document.querySelectorAll('[data-aos]');
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

aosElements.forEach(el => aosObserver.observe(el));

// ===== PRODUCT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== QUICK VIEW MODAL =====
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

const products = {
  'qv-eye-palette': {
    img: 'assets/eyeshadow_palette.jpg',
    brand: 'Aura Cosmetics',
    name: 'Nude Glam Eyeshadow Palette',
    price: 'Rs. 1,800',
    old: 'Rs. 2,500',
    desc: 'A stunning 12-pan eyeshadow palette with warm nudes, shimmery golds, and deep mattes. Perfect for both day and night glam looks.',
    stars: '★★★★★',
    reviews: '128 reviews'
  },
  'qv-lipstick': {
    img: 'assets/lipstick_collection.jpg',
    brand: 'Charlotte Tilbury × MAC',
    name: 'Luxury Lipstick Collection',
    price: 'Rs. 2,200',
    old: 'Rs. 3,000',
    desc: 'Iconic lipstick shades from world-renowned brands. Long-lasting, pigmented, and moisturizing formula in a range of beautiful shades.',
    stars: '★★★★★',
    reviews: '94 reviews'
  },
  'qv-foundation': {
    img: 'assets/foundation_skincare.jpg',
    brand: 'Premium Skincare',
    name: 'Flawless Foundation + Serum',
    price: 'Rs. 2,500',
    old: 'Rs. 3,800',
    desc: 'A duo of full-coverage foundation + radiance serum for a natural, glowing finish. Available in multiple shades to match your skin tone.',
    stars: '★★★★☆',
    reviews: '67 reviews'
  },
  'qv-deal': {
    img: 'assets/deal_product.jpg',
    brand: 'Marjan by Safeena',
    name: 'Complete Makeup Deal',
    price: 'Rs. 3,000',
    old: 'Rs. 6,000',
    desc: 'Our most popular deal! Includes: 12-pan eyeshadow palette, 3 lipstick shades, full coverage foundation, mascara, blush, and 5-piece brush set.',
    stars: '★★★★★',
    reviews: '212 reviews'
  }
};

document.querySelectorAll('.quick-view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.id;
    const p = products[id];
    if (!p) return;

    modalContent.innerHTML = `
      <img src="${p.img}" alt="${p.name}" style="width:100%;border-radius:16px;margin-bottom:1.5rem;max-height:240px;object-fit:cover;" />
      <span style="font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:hsl(345,75%,62%);">${p.brand}</span>
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:600;margin:0.4rem 0;">${p.name}</h3>
      <div style="color:hsl(38,80%,58%);margin-bottom:0.5rem;">${p.stars} <span style="color:#888;font-size:0.8rem;">(${p.reviews})</span></div>
      <p style="font-size:0.9rem;color:#666;line-height:1.7;margin-bottom:1rem;">${p.desc}</p>
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
        <span style="font-size:1.4rem;font-weight:700;background:linear-gradient(135deg,hsl(345,75%,62%),hsl(38,80%,58%));-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${p.price}</span>
        <span style="font-size:0.85rem;color:#aaa;text-decoration:line-through;">${p.old}</span>
      </div>
      <a href="#contact" onclick="closeModal()" class="btn-primary" style="width:100%;text-align:center;display:block;">Order Now 💄</a>
    `;
    modalOverlay.classList.add('active');
  });
});

function closeModal() {
  modalOverlay.classList.remove('active');
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===== TOAST NOTIFICATION =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ===== ADD TO CART BUTTONS =====
document.querySelectorAll('.btn-add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast('💌 Redirecting to order form...');
    setTimeout(() => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }, 800);
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const product = document.getElementById('product').value;

  if (!name || !phone) {
    showToast('⚠️ Please fill in your name and phone number.');
    return;
  }

  // Build WhatsApp message
  const msg = encodeURIComponent(
    `Hi Safeena! 💕\n\nI'd like to place an order.\n\nName: ${name}\nPhone: ${phone}\nProduct: ${product || 'To be discussed'}\n\nLooking forward to hearing from you!`
  );
  const waUrl = `https://wa.me/923001234567?text=${msg}`;

  showToast('✅ Redirecting to WhatsApp...');
  setTimeout(() => {
    window.open(waUrl, '_blank');
    contactForm.reset();
  }, 1000);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 2000;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start).toLocaleString() + suffix;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      const targets = [4439, 420, 100];
      const suffixes = ['+', '+', '%'];
      nums.forEach((el, i) => {
        animateCounter(el, targets[i], suffixes[i]);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) counterObserver.observe(statsSection);

// ===== PARALLAX HERO BLOBS =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const blob1 = document.querySelector('.blob-1');
  const blob2 = document.querySelector('.blob-2');
  if (blob1) blob1.style.transform = `translateY(${scrollY * 0.2}px)`;
  if (blob2) blob2.style.transform = `translateY(${-scrollY * 0.15}px)`;
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinkEls.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'hsl(345, 75%, 62%)';
    }
  });
});

console.log('%c✨ Marjan by Safeena — Demo Website', 'font-size:16px;font-weight:bold;color:#d94f70;');
console.log('%cBuilt with 💕 for beauty lovers in Pakistan', 'font-size:12px;color:#c87941;');
