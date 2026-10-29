/*========================================================================
  KORLAKUN (KTS) - 3D INTERACTIVE ENGINE & MAIN JAVASCRIPT
========================================================================*/

document.addEventListener('DOMContentLoaded', () => {
      /*===== 1. MOBILE MENU TOGGLE =====*/
      const navMenu = document.getElementById('nav-menu');
      const navToggle = document.getElementById('nav-toggle');
      const navLinks = document.querySelectorAll('.nav__link');

      if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                  navMenu.classList.toggle('show');
                  const icon = navToggle.querySelector('i');
                  if (icon) {
                        icon.className = navMenu.classList.contains('show')
                              ? 'bx bx-x'
                              : 'bx bx-menu-alt-right';
                  }
            });
      }

      navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                  navMenu.classList.remove('show');
                  const icon = navToggle?.querySelector('i');
                  if (icon) icon.className = 'bx bx-menu-alt-right';
            });
      });

      /*===== 2. DARK / LIGHT THEME TOGGLE =====*/
      const themeToggle = document.getElementById('theme-toggle');
      const themeIcon = document.getElementById('theme-icon');
      const htmlEl = document.documentElement;

      const savedTheme = localStorage.getItem('kts-theme') || 'dark';
      htmlEl.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);

      function updateThemeIcon(theme) {
            if (!themeIcon) return;
            themeIcon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
      }

      if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                  const current = htmlEl.getAttribute('data-theme');
                  const next = current === 'dark' ? 'light' : 'dark';
                  htmlEl.setAttribute('data-theme', next);
                  localStorage.setItem('kts-theme', next);
                  updateThemeIcon(next);
            });
      }

      /*===== 3. TYPEWRITER TEXT EFFECT =====*/
      const typewriterEl = document.getElementById('typewriter');
      const roles = [
            'Frontend Developer',
            'Creative Web Designer',
            'ນັກພັດທະນາເວັບໄຊຮຸ່ນໃໝ່',
            'UI / UX Enthusiast',
            'Future Software Engineer'
      ];
      let roleIdx = 0;
      let charIdx = 0;
      let isDeleting = false;

      function runTypewriter() {
            if (!typewriterEl) return;
            const currentRole = roles[roleIdx];

            if (isDeleting) {
                  charIdx--;
                  typewriterEl.textContent = currentRole.substring(0, charIdx);
            } else {
                  charIdx++;
                  typewriterEl.textContent = currentRole.substring(0, charIdx);
            }

            let speed = isDeleting ? 45 : 90;

            if (!isDeleting && charIdx === currentRole.length) {
                  speed = 1900;
                  isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                  isDeleting = false;
                  roleIdx = (roleIdx + 1) % roles.length;
                  speed = 350;
            }

            setTimeout(runTypewriter, speed);
      }
      runTypewriter();

      /*===== 4. REAL-TIME 3D PERSPECTIVE TILT ENGINE =====*/
      const tiltCards = document.querySelectorAll('.tilt-card');

      tiltCards.forEach((card) => {
            const maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 12;

            card.addEventListener('mousemove', (e) => {
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;

                  const rotateX = ((y - centerY) / centerY) * -maxTilt;
                  const rotateY = ((x - centerX) / centerX) * maxTilt;

                  card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
      });

      /*===== 5. HERO 3D FLOATING BADGES PARALLAX + CURSOR GLOW =====*/
      const cursorGlow = document.getElementById('cursor-glow');
      const floatingBadges = document.querySelectorAll('.floating-badge');

      window.addEventListener('mousemove', (e) => {
            if (cursorGlow) {
                  cursorGlow.style.left = `${e.clientX}px`;
                  cursorGlow.style.top = `${e.clientY}px`;
            }

            const normX = (e.clientX / window.innerWidth - 0.5) * 2;
            const normY = (e.clientY / window.innerHeight - 0.5) * 2;

            floatingBadges.forEach((badge) => {
                  const depth = parseFloat(badge.getAttribute('data-depth')) || 30;
                  const moveX = normX * (depth * 0.45);
                  const moveY = normY * (depth * 0.45);
                  badge.style.transform = `translate3d(${moveX}px, ${moveY}px, ${depth}px)`;
            });
      });

      /*===== 6. ANIMATED SKILL PROGRESS BARS ON SCROLL =====*/
      const skillFills = document.querySelectorAll('.skill-progress-fill');
      const skillObserver = new IntersectionObserver(
            (entries) => {
                  entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                              const targetWidth = entry.target.getAttribute('data-width');
                              entry.target.style.width = targetWidth;
                        }
                  });
            },
            { threshold: 0.3 }
      );

      skillFills.forEach((bar) => skillObserver.observe(bar));

      /*===== 7. PORTFOLIO WORK FILTER =====*/
      const filterBtns = document.querySelectorAll('.filter-btn');
      const workCards = document.querySelectorAll('.work__card');

      filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                  filterBtns.forEach((b) => b.classList.remove('active'));
                  btn.classList.add('active');

                  const filterVal = btn.getAttribute('data-filter');

                  workCards.forEach((card) => {
                        const category = card.getAttribute('data-category');
                        if (filterVal === 'all' || filterVal === category) {
                              card.style.display = 'flex';
                              card.animate(
                                    [
                                          { opacity: 0, transform: 'scale(0.9) translateY(20px)' },
                                          { opacity: 1, transform: 'scale(1) translateY(0)' }
                                    ],
                                    { duration: 350, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
                              );
                        } else {
                              card.style.display = 'none';
                        }
                  });
            });
      });

      /*===== 8. SCROLL SPY, SCROLL PROGRESS & SCROLL UP =====*/
      const sections = document.querySelectorAll('section[id]');
      const scrollUpBtn = document.getElementById('scroll-up');
      const scrollProgress = document.getElementById('scroll-progress');

      window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            // Scroll Progress Bar
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            if (scrollProgress) {
                  scrollProgress.style.width = `${scrolled}%`;
            }

            // Scroll Up Button
            if (scrollUpBtn) {
                  if (scrollY >= 400) {
                        scrollUpBtn.classList.add('show-scroll');
                  } else {
                        scrollUpBtn.classList.remove('show-scroll');
                  }
            }

            // Active Link Spy
            sections.forEach((current) => {
                  const sectionHeight = current.offsetHeight;
                  const sectionTop = current.offsetTop - 120;
                  const sectionId = current.getAttribute('id');
                  const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

                  if (navLink) {
                        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                              navLink.classList.add('active-link');
                        } else {
                              navLink.classList.remove('active-link');
                        }
                  }
            });
      });

      /*===== 9. INTERACTIVE CONTACT FORM HANDLER =====*/
      const contactForm = document.getElementById('contact-form');
      const formStatus = document.getElementById('form-status');

      if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                  e.preventDefault();
                  const name = document.getElementById('user_name')?.value || 'ໝູ່ເພື່ອນ';
                  if (formStatus) {
                        formStatus.textContent = `ຂອບໃຈຫຼາຍໆ ${name}! ຂໍ້ຄວາມຂອງເຈົ້າຖືກບັນທຶກແລ້ວ ✨`;
                  }
                  contactForm.reset();
                  setTimeout(() => {
                        if (formStatus) formStatus.textContent = '';
                  }, 5000);
            });
      }

      /*===== 10. 3D CONSTELLATION PARTICLE NETWORK CANVAS =====*/
      const canvas = document.getElementById('bg-canvas');
      if (canvas) {
            const ctx = canvas.getContext('2d');
            let width = (canvas.width = window.innerWidth);
            let height = (canvas.height = window.innerHeight);

            const particles = [];
            const particleCount = Math.min(70, Math.floor((width * height) / 18000));
            const mouse = { x: width / 2, y: height / 2, radius: 150 };

            window.addEventListener('mousemove', (e) => {
                  mouse.x = e.clientX;
                  mouse.y = e.clientY;
            });

            window.addEventListener('resize', () => {
                  width = canvas.width = window.innerWidth;
                  height = canvas.height = window.innerHeight;
            });

            class Particle3D {
                  constructor() {
                        this.x = Math.random() * width;
                        this.y = Math.random() * height;
                        this.z = Math.random() * 2 + 0.5; // Depth factor
                        this.size = this.z * 1.4;
                        this.vx = (Math.random() - 0.5) * 0.55 * this.z;
                        this.vy = (Math.random() - 0.5) * 0.55 * this.z;
                  }

                  update() {
                        this.x += this.vx;
                        this.y += this.vy;

                        if (this.x < 0 || this.x > width) this.vx *= -1;
                        if (this.y < 0 || this.y > height) this.vy *= -1;

                        // Subtle 3D mouse interaction
                        const dx = mouse.x - this.x;
                        const dy = mouse.y - this.y;
                        const dist = Math.hypot(dx, dy);
                        if (dist < mouse.radius) {
                              const force = (mouse.radius - dist) / mouse.radius;
                              this.x -= (dx / dist) * force * 1.2;
                              this.y -= (dy / dist) * force * 1.2;
                        }
                  }

                  draw() {
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(56, 189, 248, 0.65)';
                        ctx.fill();
                  }
            }

            for (let i = 0; i < particleCount; i++) {
                  particles.push(new Particle3D());
            }

            function animateParticles() {
                  ctx.clearRect(0, 0, width, height);

                  for (let i = 0; i < particles.length; i++) {
                        particles[i].update();
                        particles[i].draw();

                        for (let j = i + 1; j < particles.length; j++) {
                              const dx = particles[i].x - particles[j].x;
                              const dy = particles[i].y - particles[j].y;
                              const dist = Math.hypot(dx, dy);

                              if (dist < 135) {
                                    const alpha = (1 - dist / 135) * 0.22;
                                    ctx.beginPath();
                                    ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                                    ctx.lineWidth = 0.8;
                                    ctx.moveTo(particles[i].x, particles[i].y);
                                    ctx.lineTo(particles[j].x, particles[j].y);
                                    ctx.stroke();
                              }
                        }
                  }
                  requestAnimationFrame(animateParticles);
            }

            animateParticles();
      }

      /*===== 11. SCROLL REVEAL 3D ENTRANCE ANIMATIONS =====*/
      if (typeof ScrollReveal !== 'undefined') {
            const sr = ScrollReveal({
                  distance: '50px',
                  duration: 1100,
                  delay: 150,
                  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  reset: false
            });

            sr.reveal('.reveal-left', { origin: 'left' });
            sr.reveal('.reveal-right', { origin: 'right', delay: 250 });
            sr.reveal('.section-header', { origin: 'top' });
            sr.reveal('.work__card', { origin: 'bottom', interval: 120 });
      }
});
