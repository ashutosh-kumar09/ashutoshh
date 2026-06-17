/* =============================================
   ANNIVERSARY SURPRISE WEBSITE — script.js
   ============================================= */

/* ---- Section Navigation ---- */
function goTo(sectionId) {
  document.querySelectorAll('.section').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  const target = document.getElementById(sectionId);
  if (!target) return;
  target.style.display = 'flex';
  // Force reflow for animation restart
  void target.offsetWidth;
  target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Section-specific triggers
  if (sectionId === 'story')   triggerStoryCards();
  if (sectionId === 'letter')  startLetterTyping();
  if (sectionId === 'reasons') triggerReasonCards();
  if (sectionId === 'final')   { launchConfetti(); }
}

/* ---- Floating Hearts ---- */
const heartEmojis = ['❤️','🩷','💕','💞','💖','💗','🌸','✨'];

function createHeart() {
  const el = document.createElement('div');
  el.className = 'floating-heart';
  el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  const size = 0.9 + Math.random() * 1.2;
  el.style.fontSize = size + 'rem';
  el.style.left = Math.random() * 100 + 'vw';
  const dur = 8 + Math.random() * 10;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = '0s';
  document.getElementById('hearts-container').appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}

setInterval(createHeart, 600);
for (let i = 0; i < 8; i++) setTimeout(createHeart, i * 200);

/* ---- Sparkles ---- */
function createSparkle() {
  const el = document.createElement('div');
  el.className = 'sparkle';
  const colors = ['#ff6b9d','#c44dff','#ffdf00','#fff','#ff4d88'];
  el.style.background = colors[Math.floor(Math.random() * colors.length)];
  el.style.width = el.style.height = (3 + Math.random() * 5) + 'px';
  el.style.left = Math.random() * 100 + 'vw';
  el.style.top  = Math.random() * 100 + 'vh';
  const dur = 1.5 + Math.random() * 2;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = Math.random() * 2 + 's';
  document.getElementById('sparkles-container').appendChild(el);
  setTimeout(() => el.remove(), (dur + 2) * 1000);
}
setInterval(createSparkle, 400);

/* ---- Story Card Staggered Entrance ---- */
function triggerStoryCards() {
  document.querySelectorAll('.story-card').forEach((card, i) => {
    card.style.animationDelay = (i * 0.15) + 's';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    void card.offsetWidth;
    card.style.animation = `cardReveal 0.6s ease ${i * 0.15}s forwards`;
  });
}

/* ---- Reason Card Staggered Entrance ---- */
function triggerReasonCards() {
  document.querySelectorAll('.reason-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.88)';
    void card.offsetWidth;
    card.style.animation = `reasonReveal 0.5s ease ${i * 0.1}s forwards`;
  });
}

/* ---- Letter Typing Animation ---- */
const letterContent = [
  "Palak, aaj humara ek aur saal saath bitaane ka din hai, aur mera dil khushi se bhar gaya hai.",
  "\n\nTumse milne se pehle mujhe nahi pata tha ki pyaar itna gehri cheez hoti hai. Tumhari ek muskaan ne meri poori duniya badal di.",
  "\n\nHar ek woh pal yaad hai — chai peete hue teri baat sunna, tumhari hansi mein kho jaana, tumhare saath waqt ka behna.",
  "\n\nTum sirf meri girlfriend nahi ho — tum meri sabse best friend ho, meri strength ho, meri calm ho.",
  "\n\nAaj, is khaas din pe, main sirf yeh kehna chahta hoon: I love you, Palak. Aaj bhi, kal bhi, hamesha. ❤️"
];

let typingTimer = null;

function startLetterTyping() {
  const container = document.getElementById('letter-text');
  const nextBtn = document.getElementById('letter-next-btn');
  container.innerHTML = '<span class="cursor-blink"></span>';
  nextBtn.style.display = 'none';

  if (typingTimer) clearTimeout(typingTimer);

  const fullText = letterContent.join('');
  let index = 0;
  let displayed = '';

  function typeNext() {
    if (index < fullText.length) {
      const char = fullText[index];
      if (char === '\n') displayed += '<br/><br/>';
      else displayed += char;
      index++;
      container.innerHTML = displayed + '<span class="cursor-blink"></span>';
      typingTimer = setTimeout(typeNext, char === '.' || char === ',' ? 80 : 28);
    } else {
      container.innerHTML = displayed;
      nextBtn.style.display = 'inline-flex';
    }
  }

  typingTimer = setTimeout(typeNext, 600);
}

/* ---- Wish Card Flip ---- */
function revealWish(card) {
  card.classList.toggle('flipped');
}

/* ---- Blow Candle ---- */
function blowCandle() {
  const scene = document.getElementById('cake-scene');
  const hint = document.getElementById('cake-hint');
  const nextBtn = document.getElementById('cake-next-btn');

  if (scene.classList.contains('blown')) return;
  scene.classList.add('blown');

  // Kill flame
  const flame = document.getElementById('candle-flame');
  flame.style.animation = 'none';
  flame.style.opacity = '0';
  flame.querySelector('.flame-inner').style.display = 'none';

  hint.textContent = '🎉 Wish Made! Happy Anniversary! 🎉';
  hint.style.color = '#ff6b9d';

  launchConfetti();
  setTimeout(() => { nextBtn.style.display = 'inline-flex'; }, 1200);
}

/* ---- Open Gift Box ---- */
function openGift() {
  const wrapper = document.getElementById('gift-wrapper');
  const box = document.getElementById('gift-box');
  const nextBtn = document.getElementById('gift-next-btn');

  if (wrapper.classList.contains('opened')) return;
  wrapper.classList.add('opened');
  box.classList.add('opened');

  launchConfetti(80);
  setTimeout(() => { nextBtn.style.display = 'inline-flex'; }, 1000);
}

/* ---- Confetti ---- */
let confettiAnimId = null;

function launchConfetti(count = 140) {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#ff6b9d','#c44dff','#ffdf00','#ff4d88','#fff','#9b36d6','#ffb3d1'];

  const pieces = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    r: 5 + Math.random() * 8,
    d: 1.5 + Math.random() * 2.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10 - 5,
    tiltAngle: 0,
    tiltSpeed: 0.05 + Math.random() * 0.08,
    shape: Math.random() > 0.5 ? 'rect' : 'circle',
    angle: 0,
    spin: (Math.random() - 0.5) * 0.15
  }));

  let frame = 0;
  if (confettiAnimId) cancelAnimationFrame(confettiAnimId);

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    pieces.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      p.y += p.d;
      p.tiltAngle += p.tiltSpeed;
      p.angle += p.spin;
      p.x += Math.sin(frame * 0.015 + p.tilt) * 1.2;

      if (p.shape === 'rect') {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.5);
        ctx.restore();
      } else {
        ctx.arc(p.x, p.y, p.r / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });

    if (frame < 340) {
      confettiAnimId = requestAnimationFrame(drawConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  drawConfetti();
}

/* ---- Music Toggle ---- */
const musicBtn = document.getElementById('music-btn');
const bgMusic  = document.getElementById('bg-music');
let musicOn = false;

musicBtn.addEventListener('click', () => {
  if (!musicOn) {
    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => {});
    musicBtn.textContent = '🎶';
    musicBtn.classList.add('playing');
    musicOn = true;
  } else {
    bgMusic.pause();
    musicBtn.textContent = '🎵';
    musicBtn.classList.remove('playing');
    musicOn = false;
  }
});

/* ---- Resize confetti canvas ---- */
window.addEventListener('resize', () => {
  const canvas = document.getElementById('confetti-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  // Show welcome section
  const welcome = document.getElementById('welcome');
  welcome.style.display = 'flex';
  welcome.classList.add('active');
});