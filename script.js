const typedWords = [
  'AI and Machine Learning',
  'Research and Academic Presentation',
  'Software Development',
  'Student Mentoring',
  'Computer Vision Projects'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.getElementById('typedText');

function typeEffect() {
  if (!typedText) return;
  const currentWord = typedWords[wordIndex];
  typedText.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 70);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 35);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % typedWords.length;
    }
    setTimeout(typeEffect, 900);
  }
}
typeEffect();

const counters = document.querySelectorAll('.counter');
const runCounter = () => {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const update = () => {
      const value = +counter.innerText;
      const increment = Math.max(1, Math.ceil(target / 40));
      if (value < target) {
        counter.innerText = Math.min(target, value + increment);
        setTimeout(update, 35);
      }
    };
    update();
  });
};
let counterStarted = false;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      if (!counterStarted && entry.target.classList.contains('stats-row')) {
        runCounter();
        counterStarted = true;
      }
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal-up, .stats-row').forEach(el => observer.observe(el));

const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projectItems.forEach(item => {
      if (filter === 'all' || item.dataset.category.includes(filter)) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
  });
});

const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }

  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const themeToggle = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-mode');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
window.addEventListener('mousemove', (e) => {
  if (!cursorDot || !cursorRing) return;
  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;
  cursorRing.style.left = `${e.clientX}px`;
  cursorRing.style.top = `${e.clientY}px`;
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursorRing) cursorRing.style.transform = 'translate(-50%, -50%) scale(1.35)';
  });
  el.addEventListener('mouseleave', () => {
    if (cursorRing) cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});
