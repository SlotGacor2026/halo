/* =====================================
   FANZZ777 - interaction.js
   UI Interaction & Animation Engine
   PGSoft / Pragmatic Inspired
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  initButtonEffect();
  initGameCardEffect();
  initLazyImage();
  initGoldThemePulse();
});

/* =========================
   BUTTON PRESS EFFECT
========================= */
function initButtonEffect() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    btn.classList.add("btn-press");
    navigator.vibrate?.(20);

    setTimeout(() => {
      btn.classList.remove("btn-press");
    }, 150);
  });
}

/* =========================
   GAME CARD INTERACTION
========================= */
function initGameCardEffect() {
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".game-card");
    if (!card) return;

    card.classList.add("card-active");
    setTimeout(() => {
      card.classList.remove("card-active");
    }, 300);
  });
}

/* =========================
   SPIN EFFECT (CALLED MANUAL)
========================= */
function spinEffect(el) {
  el.classList.add("spin-glow");
  setTimeout(() => {
    el.classList.remove("spin-glow");
  }, 700);
}

/* =========================
   BIG WIN EFFECT
========================= */
function bigWinEffect() {
  const win = document.createElement("div");
  win.className = "big-win";
  win.innerText = "BIG WIN!";
  document.body.appendChild(win);

  setTimeout(() => {
    win.remove();
  }, 2000);
}

/* =========================
   LAZY LOAD IMAGES
========================= */
function initLazyImage() {
  const images = document.querySelectorAll("img[data-src]");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("img-loaded");
        obs.unobserve(img);
      }
    });
  }, { threshold: 0.2 });

  images.forEach(img => observer.observe(img));
}

/* =========================
   GOLD THEME PULSE (PGSoft)
========================= */
function initGoldThemePulse() {
  setInterval(() => {
    document.querySelectorAll(".gold-glow").forEach(el => {
      el.classList.toggle("gold-pulse");
    });
  }, 1800);
}

/* =========================
   NOTIFICATION TOAST
========================= */
function showToast(msg = "OK") {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = msg;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 50);
  setTimeout(() => {
    toast.classList.remove("show");
    toast.remove();
  }, 2500);
                            }
